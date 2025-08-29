import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { systemPrompt } from "./systemPrompts.js";
import { getHistory } from "../services/memory.service.js";
import llm from "./llm.js";

const model = llm;

//Format chain with system prompt, send to llm, and convert LLM message to string
const baseChain = systemPrompt.pipe(model);

//Each call will automatically inject history of messages and save new turn to history
export const chainWithMemory = new RunnableWithMessageHistory({
    runnable: baseChain,
    getMessageHistory: (sessionId) => getHistory(sessionId),
    inputMessagesKey: "input",
    historyMessagesKey: "history",
});

export default chainWithMemory;