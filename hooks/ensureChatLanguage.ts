import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Ensures that a chat document exists with the correct language structure
 * and retrieves the current language settings for each participant.
 * @param chatId - The ID of the chat.
 * @param currentUserId - The ID of the current user.
 * @param recipientId - The ID of the chat recipient.
 * @returns An object containing the language settings for the current user and recipient.
 */
export const ensureChatLanguage = async (
  chatId: string,
  currentUserId: string,
  recipientId: string
) => {
  const chatDocRef = doc(db, "chats", chatId);
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
  }

  const data = chatDoc.data();
  return {
    userLanguage: data?.languages?.[currentUserId] || null,
    recipientLanguage: data?.languages?.[recipientId] || null,
  };
};
