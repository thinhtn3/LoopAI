import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

// Initialize client with your API key
const key = process.env.GEMINI_API_KEY;
if (!key) {
  throw new Error("GEMINI_API_KEY is not set");
}

const ai = new GoogleGenAI({ apiKey: key });

async function generateContent(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  // Output the generated text
  console.log(response.candidates, "Response from Gemini")
  return response.text;
}

export { generateContent };