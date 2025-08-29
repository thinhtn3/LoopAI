import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";

const store = new Map();

//Get the history of messages for a given sessionId
export function getHistory(sessionId) {
  if (!sessionId) throw new Error("Missing sessionId for memory.");
  //If the sessionId is not in the store, create a new InMemoryChatMessageHistory
  if (!store.has(sessionId)) {
    store.set(sessionId, new InMemoryChatMessageHistory());
  }
  
  //Return the InMemoryChatMessageHistory for the given sessionId, if it exists, return the existing one
  return store.get(sessionId);
}
