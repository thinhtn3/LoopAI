import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const paraphrase = async (slug) => {
  const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
  Paraphrase the following LeetCode problem slug into a new technical interview question: ${slug}.
  Keep the question concise and to the point.
  Return ONLY valid JSON with these fields:
  - title
  - description
  - difficulty
  - examples (array of objects). Each example must contain:
    {
      "input": { "paramName": value, ... },
      "output": expectedValue,
      "explanation": "short explanation"
    }
  - constraints
  - tags
  
  Rules:
  - "input" MUST be a JSON object with parameter names as keys (not a string).
  - "output" MUST be a raw JSON value (string, number, array, or object) — not wrapped in quotes unless it's a string.
  - Provide 1–2 examples.
  - Do not include markdown fences or extra text.
  `;

  const result = await model.generateContent(prompt);

  // Grab text
  let text = result.response.candidates[0].content.parts[0].text;

  // Strip fences and extra junk
  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  // Keep only the JSON object
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end !== -1) {
    text = text.substring(start, end + 1);
  }

  let json;
  try {
    json = JSON.parse(text);
  } catch (err) {
    console.error("Invalid JSON:", text);
    throw err;
  }

  return json;
};
