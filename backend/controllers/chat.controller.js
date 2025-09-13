import { HTTP_STATUS_CODES } from "../constants/index.js";

import { geminiChat } from "../services/chat.service.js";
import { getSession, createSession } from "../services/sessions.service.js";
import { getHistory } from "../services/memory.service.js";
import { HumanMessage } from "@langchain/core/messages";

/** Extract, validate, and call geminiChat service **/
const chatController = async (req, res) => {
  const { userMessage, userId, userCode, question, problemSlug } = req.body;

  if (!userMessage) {
    return res.status(400).json({ message: "User message is required" });
  }
  try {
    //Find Session ID or create a new session if none exist
    let session = await getSession(userId, problemSlug);
    if (!session) {
      session = await createSession(userId, problemSlug);
    }

    const aiResponse = await geminiChat(
      session.id,
      userMessage,
      userCode,
      question
    );

    return res.status(HTTP_STATUS_CODES.SUCCESS).json({
      response: aiResponse,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};

/** Call getSession service to GET sessionId from database **/
const getSessionController = async (req, res) => {
  const { userId, problemSlug } = req.query;
  const session = await getSession(userId, problemSlug);
  return res
    .status(HTTP_STATUS_CODES.SUCCESS)
    .json({ sessionId: session.id, userId: userId, problemSlug: problemSlug });
};

/** Call getHistory service to GET history of messages from database **/
const getHistoryController = async (req, res) => {
  const { sessionId } = req.query;

  const history = await getHistory(sessionId); //returns InMemoryChatMessageHistory object

  //convert InMemoryChatMessageHistory object to array of objects {role: "user" | "model", content: string}
  const chatHistory = history.messages.map((message) => ({
    role: message instanceof HumanMessage ? "user" : "model",
    content: message.content,
  }));

  //return chatHistory to be rendered in the chatbox
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ history: chatHistory });
};

export { chatController, getSessionController, getHistoryController };
