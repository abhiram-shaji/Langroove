// translationService.ts
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

export const ensureChatLanguage = async (chatId: string, currentUserId: string, recipientId: string) => {
  const chatDocRef = doc(db, "chats", chatId);  // Changed firestoreDoc to doc
  const chatDoc = await getDoc(chatDocRef);

  if (!chatDoc.exists()) {
    await setDoc(chatDocRef, {
      participants: [currentUserId, recipientId],
      isGroupChat: false,
      createdAt: Timestamp.now(),
      languages: {
        [currentUserId]: null,
        [recipientId]: null,
      },
    });
    return { userLanguage: null, recipientLanguage: null };
  } else {
    const data = chatDoc.data();
    return {
      userLanguage: data.languages?.[currentUserId] || null,
      recipientLanguage: data.languages?.[recipientId] || null,
    };
  }
};

export const setChatLanguage = async (chatId: string, userId: string, selectedLanguage: string) => {
  const chatDocRef = doc(db, "chats", chatId);  // Changed firestoreDoc to doc
  try {
    await setDoc(
      chatDocRef,
      { [`languages.${userId}`]: selectedLanguage },
      { merge: true }
    );
    return selectedLanguage;
  } catch (error) {
    console.error("Error updating chat language:", error);
    throw error;
  }
};
