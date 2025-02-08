import axios from "axios";
import Constants from "expo-constants";

interface OpenAIResponse {
  choices: { message: { content: string } }[];
}

const apiKey = Constants.expoConfig?.extra?.openaiApiKey;

if (!apiKey) {
  throw new Error("OpenAI API key is missing in app.json.");
}

export const translateText = async (
  text: string,
  targetLanguage: string,
  sourceLanguage: string = "auto"
): Promise<string> => {
  try {
    const requestData = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Translate to ${targetLanguage} while keeping the original words in parentheses for hints.`,
        },
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 0.3,
    };

    console.log("🔵 API Request Data:", JSON.stringify(requestData, null, 2));

    const response = await axios.post<OpenAIResponse>(
      "https://api.openai.com/v1/chat/completions",
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    console.log("✅ OpenAI Response:", response.data);

    // 🔥 Extract the translated text correctly
    const translatedText = response.data?.choices?.[0]?.message?.content?.trim();

    if (!translatedText) {
      throw new Error("Translation response is empty.");
    }

    return translatedText;
  } catch (error: any) {
    console.error("❌ Error translating text:", error.response?.status, error.response?.data);
    throw new Error("Translation failed");
  }
};
