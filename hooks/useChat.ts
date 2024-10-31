// useChat.ts
import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc as firestoreDoc,
  getDoc,
  setDoc, // Add setDoc here
  Timestamp,
} from "firebase/firestore";
import { ensureChatLanguage, setChatLanguage as updateChatLanguage } from "./translationService";



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

  const initializeChatLanguages = useCallback(async () => {
    const { userLanguage, recipientLanguage } = await ensureChatLanguage(chatId, currentUser.uid, recipientId);
    setUserLanguage(userLanguage);
    setRecipientLanguage(recipientLanguage);
  }, [chatId, currentUser, recipientId]);

  useEffect(() => {
    initializeChatLanguages();
  }, [initializeChatLanguages]);

  const setChatLanguage = useCallback(async (selectedLanguage: string) => {
    try {
      const updatedLanguage = await updateChatLanguage(chatId, currentUser.uid, selectedLanguage);
      setUserLanguage(updatedLanguage);
    } catch (error) {
      console.error("Error setting chat language:", error);
    }
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

  // Remaining hook logic, such as `fetchAvatar`, `updateAvatars`, `fetchMessagesFromFirestore`

  return {
    message,
    setMessage,
    messages,
    sendMessage, // Make sure `sendMessage` is included here
    avatars,
    userLanguage,
    recipientLanguage,
    setChatLanguage,
    initializeChatLanguages,
  };
};
