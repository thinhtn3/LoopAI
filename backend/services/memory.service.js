import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import prisma from "../config/database.js";

//Get the history of messages for a given sessionId
export async function getHistory(sessionId) {
  if (!sessionId) throw new Error("Missing sessionId for memory.");

  const messages = await prisma.message.findMany({
    where: { sessionId },
    orderBy: { createdAt: "asc" }, // keep them in order
  });

  const history = new InMemoryChatMessageHistory();

  messages.forEach((message) => {
    let parsed;
    try {
      parsed = typeof message.content === "string"
        ? JSON.parse(message.content)
        : message.content;
    } catch {
      parsed = { response: String(message.content) };
    }
  
    if (message.role === "user") {
      history.addUserMessage(parsed.input ?? String(message.content));
    } else {
      history.addAIMessage(parsed.response ?? String(message.content));
    }
  });

  // Differentiate between user and model messages (Human Message and AIMessage are classes)
  // console.log("History:", history.messages[0] instanceof HumanMessage);
  // console.log("History:", history.messages[1] instanceof AIMessage);
  

  //Return the InMemoryChatMessageHistory for the given sessionId, if it exists, return the existing one
  return history;
}

export async function deleteCurrentHistory(sessionId) {
  const deletedHistory = await prisma.message.deleteMany({
    where: { sessionId },
  });
  return deletedHistory;
}
