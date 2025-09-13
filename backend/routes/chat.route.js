import { Router } from "express";
import { chatController, getSessionController, getHistoryController } from "../controllers/chat.controller.js";
import { paraphraseController } from "../controllers/paraphrase.controller.js";

const chatRoutes = Router();

//api/chat endpoints

//POST request to chat to LLM, get response from LLM, store user and model messages in database
chatRoutes.post("/", chatController);

//GET request to paraphrase Leetcode problem slug into a question
chatRoutes.get("/paraphrase", paraphraseController);

//GET request to get sessionId from database
chatRoutes.get("/session", getSessionController);

//GET request to get history of messages from database
chatRoutes.get("/history", getHistoryController);

export default chatRoutes;
