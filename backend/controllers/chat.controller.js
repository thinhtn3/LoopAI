import { HTTP_STATUS_CODES } from "../constants/index.js";

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
    //Find Session ID or create a new session if none exist
    let session = await getSession(userId);
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

  //returns InMemoryChatMessageHistory object
  const history = await getHistory(sessionId); 

  //convert InMemoryChatMessageHistory object to array of objects {role: "user" | "model", content: string}
  const chatHistory = history.messages.map((message) => ({
    role: message instanceof HumanMessage ? "user" : "model",
    content: message.content,
  }));

  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ history: chatHistory });
};

export { chatController, getSessionController, getHistoryController };
