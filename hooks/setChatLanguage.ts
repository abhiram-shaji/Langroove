import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

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
