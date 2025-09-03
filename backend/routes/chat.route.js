import { Router } from "express";
import { chatController } from "../controllers/chat.controller.js";
import { paraphraseController } from "../controllers/paraphrase.controller.js";

const chatRoutes = Router();

//POST request to /api/chat endpoint
chatRoutes.post("/", chatController);
chatRoutes.get("/paraphrase", paraphraseController);

export default chatRoutes;
