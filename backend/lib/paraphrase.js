import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const paraphrase = async (slug) => {
  const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
  Paraphrase the following Leetcode problem slug into a question for a technical interview: ${slug}.
  Return strictly valid JSON with the following fields:
  - title
  - description
  - difficulty
  - examples (array with input, output, explanation)
  - constraints
  - tags
  
  Keep descriptions concise, fairly vague and to the point.
  IMPORTANT: The output must be ONLY valid JSON.
  Do not include markdown fences, code blocks, or extra text.
  Provide 1-2 test cases under "examples".
  `;

  
  const result = await model.generateContent(prompt);

  // Grab text
  let text = result.response.candidates[0].content.parts[0].text;

  // Remove ```json and ``` if they appear
  text = text.replace(/```json\n?/g, "").replace(/```/g, "").trim();

  // Try parsing as JSON
  let json;
  try {
    json = JSON.parse(text);
  } catch (err) {
    console.error("Invalid JSON:", text);
    throw err;
  }

  return json;
};
