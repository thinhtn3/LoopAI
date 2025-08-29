import { chatResponse } from "../services/gemini.js";
import { HTTP_STATUS_CODES } from "../constants/index.js";
import prisma from "../config/database.js";
import { v4 as uuidv4 } from "uuid";


const chatController = async (req, res) => {
  const { userMessage, sessionId } = req.body;

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

    //Create a new message from user
    await prisma.message.create({
      data: {
        sessionId: session.id,
        role: "user",
        content: {
          text: userMessage,
        },
      },

    });
    const history = await prisma.message.findMany({
      where: { sessionId: session.id },
      orderBy: { createdAt: "desc" },
      take: 40, //Get last 40 messages
      select: { role: true, content: true,},
    });


    //Pass prompt to gemini.js service to generate response and return to client
    const aiResponse = await chatResponse(userMessage, history);

    //Create a new message from AI
    await prisma.message.create({
      data: {
        sessionId: session.id,
        role: "model",
        content: { text: aiResponse.text },
      },
    });



    return res.status(HTTP_STATUS_CODES.SUCCESS).json({
      response: aiResponse.text,
      chatHistory: history,
      sessionId: session.id,
    });
    
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};

export { chatController };
