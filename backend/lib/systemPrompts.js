import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";

const systemPrompt = ChatPromptTemplate.fromMessages([
  ["system", "You are an AI assistant that can help with coding questions."],
  new MessagesPlaceholder("history"),
  ["human", "{input}"],
]);

export { systemPrompt };
