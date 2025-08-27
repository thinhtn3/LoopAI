import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { instructions } from "../constants/systemInstructions.js";

// Initialize client with your API key
const key = process.env.GEMINI_API_KEY;
if (!key) {
  throw new Error("GEMINI_API_KEY is not set");
}

const ai = new GoogleGenAI({ apiKey: key });

async function generateContent(prompt, codeContext, messages) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      { role: "user", parts: [{ text: prompt }] },
      { role: "user", parts: [{ text: codeContext }] },
      { role: "user", parts: [{ text: instructions }] },
    //   { role: "user", parts: [{ text: messages }] },
    ],
  });

  // Output the generated text
  return response.text;
}

export { generateContent };
