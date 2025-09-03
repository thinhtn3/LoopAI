import chainWithMemory from "../lib/chain.js";

export const geminiChat = async (sessionId, userMessage, userCode, question) => {
  if (!userMessage || !userMessage.trim()) {
    throw new Error("User message is required");
  }
  if (!sessionId) {
    throw new Error("Missing sessionId");
  }

  const response = await chainWithMemory.invoke(
    { input: userMessage, code: userCode, question },
    { configurable: { sessionId } }
  );

  return response; // already a string due to StringOutputParser
};

//TODO: Add .stream() functionality for better user experience
