import { HTTP_STATUS_CODES } from "../constants/index.js";
import prisma from "../config/database.js";
import { v4 as uuidv4 } from "uuid";
import { geminiChat } from "../services/chat.service.js";

const chatController = async (req, res) => {
  const { userMessage, sessionId, userCode } = req.body;

  if (!userMessage) {
    return res.status(400).json({ message: "User message is required" });
  }

  try {
    //Find Session ID
    let session;

    //Create a new session if it doesn't exist and set it to the current session
    if (!sessionId) {
      const currentSession = await prisma.session.create({
        data: {
          id: uuidv4(),
          title: "New Session",
          model: "gemini-2.5-flash",
        },
      });
      session = currentSession;
    } else {
      session = await prisma.session.findUnique({
        where: { id: sessionId },
      });
    }
    console.log("Session ID:", session);
    const aiResponse = await geminiChat(session.id, userMessage, userCode);


    console.log("AI Response:", aiResponse);
    return res.status(HTTP_STATUS_CODES.SUCCESS).json({
      response: aiResponse,
      sessionId: session.id,
    });
    
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};

export { chatController };
