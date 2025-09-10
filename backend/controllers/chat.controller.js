import { HTTP_STATUS_CODES } from "../constants/index.js";

import { v4 as uuidv4 } from "uuid";
import { geminiChat } from "../services/chat.service.js";
import { getSession, createSession } from "../services/sessions.service.js";
import { getHistory } from "../services/memory.service.js";
import { HumanMessage } from "@langchain/core/messages";

const chatController = async (req, res) => {
  const { userMessage, userId, userCode, question } = req.body;


  if (!userMessage) {
    return res.status(400).json({ message: "User message is required" });
  }

  try {
    //Find Session ID
    let session = await getSession(userId);

    //Create a new session if it doesn't exist and set it to the current session
    if (!session) {
      session = await createSession(userId);
    }

    const aiResponse = await geminiChat(session.id, userMessage, userCode, question);


    return res.status(HTTP_STATUS_CODES.SUCCESS).json({
      response: aiResponse,
      sessionId: session.id,
    });
    
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};

const getSessionController = async (req, res) => {
  const { userId } = req.query;
  const session = await getSession(userId);
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ sessionId: session.id, userId: userId });
};

const getHistoryController = async (req, res) => {
  const { sessionId } = req.query;
  const history = await getHistory(sessionId);
  const chatHistory = history.messages.map((message) => ({
    role: message instanceof HumanMessage ? "user" : "model",
    content: message.content,
  }));
  console.log("Chat History:", chatHistory);
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ history: chatHistory });
};

export { chatController, getSessionController, getHistoryController };
