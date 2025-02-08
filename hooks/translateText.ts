import axios from "axios";

/**
 * Interface for the expected response structure from LibreTranslate.
 */
interface TranslationResponse {
  translatedText: string;
}

/**
 * Language codes mapping
 */
const languageCodes: { [key: string]: string } = {
  English: "en",
  Spanish: "es",
  French: "fr",
  "Mandarin Chinese": "zh",
  German: "de",
  Italian: "it",
  Japanese: "ja",
  Korean: "ko",
  Portuguese: "pt",
  Russian: "ru",
};

/**
 * Translates a given text to the specified target language using LibreTranslate API.
 * @param text - The text to translate.
 * @param targetLanguage - The language name or code for the target language (e.g., 'es' for Spanish).
 * @param sourceLanguage - The language code for the source language (default is 'auto').
 * @returns The translated text.
 */
export const translateText = async (
  text: string,
  targetLanguage: string,
  sourceLanguage: string = "auto"
): Promise<string> => {
  const targetLangCode = languageCodes[targetLanguage] || targetLanguage;
  const requestData = {
    q: text,
    source: sourceLanguage,
    target: targetLangCode,
    api_key: "6b35d883-0347-4e33-8e04-a7097c5f0e6a",
    format: "text",
  };

  try {
    console.log("Sending request to LibreTranslate:", requestData);

    const response = await axios.post<TranslationResponse>(
      "https://libretranslate.com/translate",
      requestData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("Received response from LibreTranslate:", response.data);

    return response.data.translatedText;
  } catch (error) {
    console.error("Error translating text:", error);
    throw new Error("Translation failed");
  }
};
