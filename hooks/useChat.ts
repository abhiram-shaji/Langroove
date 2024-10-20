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
  setDoc,
  Timestamp,
} from "firebase/firestore";

type Message = {
  id: string;
  text: string;
  senderId: string;
  senderType: "me" | "other";
};

type AvatarsMap = { [key: string]: string };

export const useChat = (chatId: string) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [avatars, setAvatars] = useState<AvatarsMap>({});
  const currentUser = auth.currentUser;

  // Check for missing chatId early
  if (!chatId) {
    console.error("Invalid or missing chatId");
    return { message, setMessage, messages, sendMessage: () => {}, avatars };
  }

  if (!currentUser) {
    console.warn("User not authenticated");
    return { message, setMessage, messages, sendMessage: () => {}, avatars };
  }

  // Helper function to check if the chat document exists and create it if not
  const ensureChatExists = useCallback(async () => {
    const chatDocRef = doc(db, "chats", chatId);
    const chatDoc = await getDoc(chatDocRef);

    if (!chatDoc.exists()) {
      // Create the chat document if it doesn't exist
      await setDoc(chatDocRef, {
        participants: [currentUser.uid], // Add current user as a participant
        createdAt: Timestamp.now(),
      });
    }
  }, [chatId, currentUser]);

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
    if (!currentUser || !chatId) return;

    const fetchMessages = async () => {
      await ensureChatExists();  // Ensure chat exists before fetching messages

      const chatDocRef = doc(db, "chats", chatId);  // Reference to the chat document
      const messagesRef = collection(chatDocRef, "messages");  // Reference to the messages subcollection

      const q = query(messagesRef, orderBy("createdAt"));

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
    };

    fetchMessages();
  }, [currentUser, chatId, ensureChatExists, updateAvatars]);

  const sendMessage = useCallback(async () => {
    if (!message.trim() || !currentUser) return;

    try {
      await ensureChatExists();  // Ensure chat exists before sending the message

      const chatDocRef = doc(db, "chats", chatId);  // Reference to the chat document
      const messagesRef = collection(chatDocRef, "messages");  // Reference to the messages subcollection

      await addDoc(messagesRef, {
        text: message,
        sender: currentUser.uid,
        createdAt: Timestamp.now(),
      });

      setMessage(""); // Clear the input field after sending the message
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  }, [message, currentUser, chatId, ensureChatExists]);

  return { message, setMessage, messages, sendMessage, avatars };
};
