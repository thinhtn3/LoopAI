import { generateContent } from "../services/gemini.js";
import { HTTP_STATUS_CODES } from "../constants/index.js";

const chatController = async (req, res) => {
  const { prompt } = req.body;
  console.log(prompt, "Prompt from API");
  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }
  try {
    const response = await generateContent(prompt);
    res.status(HTTP_STATUS_CODES.SUCCESS).json({ response });
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};

export { chatController };
