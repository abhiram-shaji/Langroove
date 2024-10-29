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
  const [userLanguage, setUserLanguage] = useState<string | null>(null);
  const [recipientLanguage, setRecipientLanguage] = useState<string | null>(null);
  const currentUser = auth.currentUser;
  const recipientId = chatId.split("_").find(id => id !== currentUser?.uid);

  if (!chatId || !recipientId || !currentUser) {
    console.warn("Invalid chat setup: missing chatId, recipientId, or user not authenticated");
    return { message, setMessage, messages, sendMessage: () => {}, avatars, setChatLanguage: () => {} };
  }

  const ensureChatExists = useCallback(async () => {
    const chatDocRef = firestoreDoc(db, "chats", chatId);
    const chatDoc = await getDoc(chatDocRef);

    if (!chatDoc.exists()) {
      await setDoc(chatDocRef, {
        participants: [currentUser.uid, recipientId],
        isGroupChat: false,
        createdAt: Timestamp.now(),
        languages: {
          [currentUser.uid]: null,
          [recipientId]: null,
        },
      });
    } else {
      const data = chatDoc.data();
      setUserLanguage(data.languages?.[currentUser.uid] || null);
      setRecipientLanguage(data.languages?.[recipientId] || null);
    }
  }, [chatId, currentUser, recipientId]);

  useEffect(() => {
    ensureChatExists();
  }, [ensureChatExists]);

  const setChatLanguage = useCallback(async (selectedLanguage: string) => {
    const chatDocRef = firestoreDoc(db, "chats", chatId);
    try {
      await setDoc(
        chatDocRef,
        { [`languages.${currentUser?.uid}`]: selectedLanguage },
        { merge: true }
      );
      setUserLanguage(selectedLanguage);
    } catch (error) {
      console.error("Error updating chat language:", error);
    }
  }, [chatId, currentUser]);

  const fetchAvatar = useCallback(async (senderId: string) => {
    const cachedAvatar = await AsyncStorage.getItem(`avatar_${senderId}`);
    if (cachedAvatar) return cachedAvatar;

    try {
      const userDoc = await getDoc(firestoreDoc(db, "users", senderId));
      const avatarUrl = userDoc.exists() ? userDoc.data().avatar || "https://robohash.org/default-avatar.png" : "https://robohash.org/default-avatar.png";
      await AsyncStorage.setItem(`avatar_${senderId}`, avatarUrl);
      return avatarUrl;
    } catch (error) {
      console.error("Error fetching avatar for:", senderId, error);
      return "https://robohash.org/default-avatar.png";
    }
  }, []);

  const updateAvatars = useCallback(async (senderIds: string[]) => {
    const idsToFetch = senderIds.filter((id) => !avatars[id]);
    const fetchedAvatars = await Promise.all(idsToFetch.map(fetchAvatar));

    setAvatars((prevAvatars) =>
      idsToFetch.reduce((acc, id, index) => {
        acc[id] = fetchedAvatars[index];
        return acc;
      }, { ...prevAvatars })
    );
  }, [avatars, fetchAvatar]);

  const fetchMessagesFromFirestore = useCallback(() => {
    const chatDocRef = firestoreDoc(db, "chats", chatId);
    const messagesRef = collection(chatDocRef, "messages");
    const q = query(messagesRef, orderBy("createdAt"));
  
    return onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((messageDoc) => {
        const data = messageDoc.data();
        if (!data.readBy?.includes(currentUser.uid)) {
          setDoc(
            firestoreDoc(db, `chats/${chatId}/messages`, messageDoc.id),
            { readBy: [...(data.readBy || []), currentUser.uid] },
            { merge: true }
          );
        }
  
        return {
          id: messageDoc.id,
          text: data.text,
          senderId: data.sender,
          senderType: data.sender === currentUser.uid ? "me" : "other" as "me" | "other",
        };
      });
  
      setMessages(fetchedMessages as Message[]);
      AsyncStorage.setItem(`messages_${chatId}`, JSON.stringify(fetchedMessages));
      updateAvatars(Array.from(new Set(fetchedMessages.map((msg) => msg.senderId))));
    });
  }, [chatId, currentUser, updateAvatars]);
  

  useEffect(() => {
    const fetchMessagesFromCache = async () => {
      const cachedMessages = await AsyncStorage.getItem(`messages_${chatId}`);
      if (cachedMessages) setMessages(JSON.parse(cachedMessages));
    };

    fetchMessagesFromCache();
    const unsubscribe = fetchMessagesFromFirestore();

    return () => unsubscribe && unsubscribe();
  }, [chatId, fetchMessagesFromFirestore]);

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
          messageId: messagesRef.id,
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
    ensureChatExists,
  };
};
