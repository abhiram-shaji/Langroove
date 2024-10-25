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
  const currentUser = auth.currentUser;

  const recipientId = chatId.split("_").find((id) => id !== currentUser?.uid);

  if (!chatId || !recipientId) {
    console.error("Invalid or missing chatId or recipientId");
    return { message, setMessage, messages, sendMessage: () => {}, avatars };
  }

  if (!currentUser) {
    console.warn("User not authenticated");
    return { message, setMessage, messages, sendMessage: () => {}, avatars };
  }

  const ensureChatExists = useCallback(async () => {
    const chatDocRef = firestoreDoc(db, "chats", chatId);
    const chatDoc = await getDoc(chatDocRef);

    if (!chatDoc.exists()) {
      await setDoc(chatDocRef, {
        participants: [currentUser.uid, recipientId],
        isGroupChat: false,
        createdAt: Timestamp.now(),
      });
    }
  }, [chatId, currentUser, recipientId]);

  const fetchAvatar = useCallback(async (senderId: string) => {
    const cachedAvatar = await AsyncStorage.getItem(`avatar_${senderId}`);
    if (cachedAvatar) return cachedAvatar;

    try {
      const userDoc = await getDoc(firestoreDoc(db, "users", senderId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const avatarUrl = userData?.avatar || "https://robohash.org/default-avatar.png";
        await AsyncStorage.setItem(`avatar_${senderId}`, avatarUrl); // Cache the avatar
        return avatarUrl;
      }
    } catch (error) {
      console.error("Error fetching avatar for:", senderId, error);
    }
    return "https://robohash.org/default-avatar.png";
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

    const fetchMessagesFromCache = async () => {
      const cachedMessages = await AsyncStorage.getItem(`messages_${chatId}`);
      if (cachedMessages) {
        setMessages(JSON.parse(cachedMessages)); // Load cached messages
      }
    };

    const fetchMessagesFromFirestore = async () => {
      await ensureChatExists();

      const chatDocRef = firestoreDoc(db, "chats", chatId);
      const messagesRef = collection(chatDocRef, "messages");
      const q = query(messagesRef, orderBy("createdAt"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs.map((messageDoc) => {
          const data = messageDoc.data();
          const readBy = data.readBy || [];

          if (!readBy.includes(currentUser.uid)) {
            const messageRef = firestoreDoc(db, `chats/${chatId}/messages`, messageDoc.id);
            setDoc(messageRef, { readBy: [...readBy, currentUser.uid] }, { merge: true });
          }

          return {
            id: messageDoc.id,
            text: data.text,
            senderId: data.sender,
            senderType: data.sender === currentUser.uid ? "me" : "other",
          } as Message;
        });

        setMessages(fetchedMessages);
        AsyncStorage.setItem(`messages_${chatId}`, JSON.stringify(fetchedMessages)); // Cache messages

        const senderIds = Array.from(new Set(fetchedMessages.map((msg) => msg.senderId)));
        updateAvatars(senderIds);
      });

      return unsubscribe;
    };

    fetchMessagesFromCache(); // First load from cache
    fetchMessagesFromFirestore(); // Then subscribe to Firestore updates

  }, [currentUser, chatId, ensureChatExists, updateAvatars]);

  const sendMessage = useCallback(async () => {
    if (!message.trim() || !currentUser) return;

    try {
      await ensureChatExists();

      const chatDocRef = firestoreDoc(db, "chats", chatId);
      const messagesRef = collection(chatDocRef, "messages");

      const newMessageRef = await addDoc(messagesRef, {
        text: message,
        sender: currentUser.uid,
        createdAt: Timestamp.now(),
        readBy: [currentUser.uid],
      });

      await setDoc(chatDocRef, {
        lastMessage: {
          messageId: newMessageRef.id,
          text: message,
          createdAt: Timestamp.now(),
        },
      }, { merge: true });

      setMessage("");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  }, [message, currentUser, chatId, ensureChatExists]);

  return { message, setMessage, messages, sendMessage, avatars };
};
