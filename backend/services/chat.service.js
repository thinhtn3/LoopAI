import chainWithMemory from "../lib/chain.js";
import prisma from "../config/database.js";

//Store user message and model response in database and call chainWithMemory to get response from LLM
export const geminiChat = async (sessionId, userMessage, userCode, question) => {
  if (!userMessage || !userMessage.trim()) {
    throw new Error("User message is required");
  }
  if (!sessionId) {
    throw new Error("Missing sessionId");
  }

  //Store user message in database
  await prisma.message.create({
    data: {
      sessionId,
      role: "user",
      content: JSON.stringify({ input: userMessage, code: userCode, question }),
    },
  });
  
  const response = await chainWithMemory.invoke(
    { input: userMessage, code: userCode, question },
    { configurable: { sessionId } }
  );


  //Store model response in database
  await prisma.message.create({
    data: {
      sessionId,
      role: "model",
      content: JSON.stringify({ response }),
    },
  });


  return response; // already a string due to StringOutputParser
};

//TODO: Add .stream() functionality for better user experience
