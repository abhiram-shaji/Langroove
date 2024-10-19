// /hooks/useChat.ts

import { useEffect, useState, useCallback } from "react";
import { db, auth } from "../firebase"; // Adjust the import paths as necessary
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";

type Message = {
  id: string;
  text: string;
  senderId: string;
  senderType: "me" | "other";
};

type AvatarsMap = { [key: string]: string };

export const useChat = (recipientId: string) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [avatars, setAvatars] = useState<AvatarsMap>({});
  const currentUser = auth.currentUser;

  const fetchAvatar = useCallback(async (senderId: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", senderId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData?.avatar || "https://robohash.org/default-avatar.png";
      }
    } catch (error) {
      console.error("Error fetching avatar for:", senderId, error);
    }
    return "https://robohash.org/default-avatar.png"; // Default avatar on error or no user
  }, []);

  const updateAvatars = useCallback(
    async (senderIds: string[]) => {
      const newAvatars = { ...avatars };
      const idsToFetch = senderIds.filter((id) => !avatars[id]);

      if (idsToFetch.length > 0) {
        const fetchedAvatars = await Promise.all(
          idsToFetch.map((senderId) => fetchAvatar(senderId))
        );

        idsToFetch.forEach((senderId, index) => {
          newAvatars[senderId] = fetchedAvatars[index];
        });

        setAvatars(newAvatars);
      }
    },
    [avatars, fetchAvatar]
  );

  useEffect(() => {
    if (!currentUser || !recipientId) return;

    const chatId = [currentUser.uid, recipientId].sort().join("_");
    const chatRef = collection(db, "chats", chatId, "messages");
    const q = query(chatRef, orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          text: data.text,
          senderId: data.sender,
          senderType: data.sender === currentUser.uid ? "me" : "other",
        } as Message;
      });

      setMessages(fetchedMessages);

      // Fetch avatars for new senderIds
      const senderIds = Array.from(
        new Set(fetchedMessages.map((msg) => msg.senderId))
      );
      updateAvatars(senderIds);
    });

    return unsubscribe;
  }, [currentUser, recipientId, updateAvatars]);

  const sendMessage = useCallback(async () => {
    if (!message.trim() || !currentUser) return;

    try {
      const chatId = [currentUser.uid, recipientId].sort().join("_");
      const chatRef = collection(db, "chats", chatId, "messages");

      await addDoc(chatRef, {
        text: message,
        sender: currentUser.uid,
        recipient: recipientId,
        createdAt: new Date(),
      });

      setMessage(""); // Clear the input field after sending the message
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  }, [message, currentUser, recipientId]);

  return { message, setMessage, messages, sendMessage, avatars };
};
