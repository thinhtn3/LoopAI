import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

// Initialize client with your API key
const key = process.env.GEMINI_API_KEY;
if (!key) {
  throw new Error("GEMINI_API_KEY is not set");
}

const ai = new GoogleGenAI({ apiKey: key });

/**
 *
 * @param {string} prompt
 * @param {object[]} chatHistory
 * @returns {object}
 */
async function chatResponse(prompt, chatHistory) {
  const contents = [];

  chatHistory.forEach((message) => {
    const role = message.role;
    const parts = [];
    if (message.content.text) {
      parts.push({ text: message.content.text });
    }
    contents.push({ role: role, parts: parts });
  });

  contents.push({ role: "user", parts: [{ text: prompt }] });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
  });

  // Output the generated text

  return {
    text: response.text,
  };
}

export { chatResponse };
