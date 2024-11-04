// translationService.ts
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import axios from "axios";
import { db } from "../firebase";

/**
 * Interface for the expected response structure from LibreTranslate.
 */
interface TranslationResponse {
  translatedText: string;
}

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

/**
 * Translates a given text to the specified target language using LibreTranslate API.
 * @param text - The text to translate.
 * @param targetLanguage - The language code for the target language (e.g., 'es' for Spanish).
 * @param sourceLanguage - The language code for the source language (default is 'auto').
 * @returns The translated text.
 */
export const translateText = async (
  text: string,
  targetLanguage: string,
  sourceLanguage: string = "auto"
): Promise<string> => {
  try {
    const response = await axios.post<TranslationResponse>(
      "https://libretranslate.de/translate",
      {
        q: text,
        source: sourceLanguage,
        target: targetLanguage,
        format: "text",
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data.translatedText;
  } catch (error) {
    console.error("Error translating text:", error);
    throw new Error("Translation failed");
  }
};
