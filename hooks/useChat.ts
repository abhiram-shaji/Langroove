// /hooks/useChat.ts

import { useEffect, useState } from "react";
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

export const useChat = (recipientId: string) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [avatars, setAvatars] = useState<{ [key: string]: string }>({});
  const currentUser = auth.currentUser; // Get current user

  useEffect(() => {
    if (!currentUser || !recipientId) return;

    const chatId = [currentUser.uid, recipientId].sort().join("_");
    const chatRef = collection(db, "chats", chatId, "messages");
    const q = query(chatRef, orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
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

      // Collect unique senderIds from the messages
      const senderIds = Array.from(
        new Set(fetchedMessages.map((msg) => msg.senderId))
      );

      // Determine which senderIds need their avatars fetched
      const senderIdsToFetch = senderIds.filter((id) => !avatars[id]);

      // If there are new senderIds, fetch their avatars
      if (senderIdsToFetch.length > 0) {
        const newAvatars = { ...avatars };

        await Promise.all(
          senderIdsToFetch.map(async (senderId) => {
            try {
              const userDoc = await getDoc(doc(db, "users", senderId));
              if (userDoc.exists()) {
                const userData = userDoc.data();
                newAvatars[senderId] =
                  userData?.avatar || "https://robohash.org/default-avatar.png";
              } else {
                console.log("No such user document!", senderId);
                newAvatars[senderId] =
                  "https://robohash.org/default-avatar.png"; // Default avatar
              }
            } catch (error) {
              console.log("Error fetching sender avatar:", error);
              newAvatars[senderId] = "https://robohash.org/default-avatar.png"; // Default avatar on error
            }
          })
        );

        setAvatars(newAvatars);
      }
    });

    return unsubscribe;
  }, [currentUser, recipientId, avatars]);

  const sendMessage = async () => {
    if (!message.trim() || !currentUser) return;

    try {
      const chatId = [currentUser.uid, recipientId].sort().join("_"); // Create a consistent chat ID
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
  };

  return { message, setMessage, messages, sendMessage, avatars };
};
