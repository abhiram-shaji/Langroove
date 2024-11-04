// translationService.ts
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
    // If the chat does not exist, create it with language fields
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

/**
 * Sets the chat language for a specific user within a chat.
 * @param chatId - The ID of the chat.
 * @param userId - The ID of the user whose language is being set.
 * @param selectedLanguage - The selected language to set.
 * @returns The updated language for the user.
 */
export const setChatLanguage = async (
  chatId: string,
  userId: string,
  selectedLanguage: string
) => {
  const chatDocRef = doc(db, "chats", chatId);

  try {
    // Update the language for the specified user within the languages field
    await setDoc(
      chatDocRef,
      { languages: { [userId]: selectedLanguage } },
      { merge: true }
    );
    return selectedLanguage;
  } catch (error) {
    console.error("Error updating chat language:", error);
    throw error;
  }
};
