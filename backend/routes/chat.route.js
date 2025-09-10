import { Router } from "express";
import { chatController, getSessionController } from "../controllers/chat.controller.js";
import { paraphraseController } from "../controllers/paraphrase.controller.js";
import { getHistoryController } from "../controllers/chat.controller.js";

const chatRoutes = Router();

//POST request to /api/chat endpoint
chatRoutes.post("/", chatController);
chatRoutes.get("/paraphrase", paraphraseController);
chatRoutes.get("/session", getSessionController);
chatRoutes.get("/history", getHistoryController);

export default chatRoutes;
