//** Services to get and delete history from Message table **/

import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import prisma from "../config/database.js";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

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

  // Differentiate between user and model messages (Human Message and AIMessage are classes) <- NOT USED NOTE
  // console.log("History:", history.messages[0] instanceof HumanMessage);
  // console.log("History:", history.messages[1] instanceof AIMessage);

  //Return the InMemoryChatMessageHistory for the given sessionId, if it exists, return the existing one
  return history;
}

//Delete all messages from Message table for a given sessionId
export async function deleteCurrentHistory(sessionId) {
  const deletedHistory = await prisma.message.deleteMany({
    where: { sessionId },
  });
  return deletedHistory;
}
