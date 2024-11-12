// useChat.ts
import { useEffect, useState, useCallback } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc as firestoreDoc,
  Timestamp,
  setDoc,
} from "firebase/firestore";
import { ensureChatLanguage, setChatLanguage as updateChatLanguage } from "../hooks/translationService";

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
  const [userLanguage, setUserLanguage] = useState<string | null>(null);
  const [recipientLanguage, setRecipientLanguage] = useState<string | null>(null);
  const currentUser = auth.currentUser;
  const recipientId = chatId.split("_").find(id => id !== currentUser?.uid);

  if (!chatId || !recipientId || !currentUser) {
    console.warn("Invalid chat setup: missing chatId, recipientId, or user not authenticated");
    return { message, setMessage, messages, sendMessage: () => {}, avatars, setChatLanguage: () => {} };
  }

  // Initialize chat languages
  useEffect(() => {
    const initializeChatLanguages = async () => {
      const { userLanguage, recipientLanguage } = await ensureChatLanguage(chatId, currentUser.uid, recipientId);
      setUserLanguage(userLanguage);
      setRecipientLanguage(recipientLanguage);
    };
    initializeChatLanguages();
  }, [chatId, currentUser, recipientId]);

  // Set chat language
  const setChatLanguage = useCallback(async (selectedLanguage: string) => {
    try {
      const updatedLanguage = await updateChatLanguage(chatId, currentUser.uid, selectedLanguage);
      setUserLanguage(updatedLanguage);
    } catch (error) {
      console.error("Error setting chat language:", error);
    }
  }, [chatId, currentUser]);

  // Fetch messages from Firestore in real-time
  useEffect(() => {
    const chatDocRef = firestoreDoc(db, "chats", chatId);
    const messagesRef = collection(chatDocRef, "messages");
    const messagesQuery = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const loadedMessages: Message[] = snapshot.docs.map(doc => ({
        id: doc.id,
        text: doc.data().text,
        senderId: doc.data().sender,
        senderType: doc.data().sender === currentUser?.uid ? "me" : "other",
      }));
      setMessages(loadedMessages);
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, [chatId, currentUser]);

  const sendMessage = useCallback(async () => {
    if (!message.trim()) return;

    const chatDocRef = firestoreDoc(db, "chats", chatId);
    const messagesRef = collection(chatDocRef, "messages");
    try {
      await addDoc(messagesRef, {
        text: message,
        sender: currentUser.uid,
        createdAt: Timestamp.now(),
        readBy: [currentUser.uid],
      });
      await setDoc(chatDocRef, {
        lastMessage: {
          text: message,
          createdAt: Timestamp.now(),
        },
      }, { merge: true });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, [message, currentUser, chatId]);

  return {
    message,
    setMessage,
    messages,
    sendMessage,
    avatars,
    userLanguage,
    recipientLanguage,
    setChatLanguage,
  };
};
