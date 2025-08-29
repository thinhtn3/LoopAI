import { Router } from "express";
import { chatController } from "../controllers/chat.controller.js";

const chatRoutes = Router();

//POST request to /api/chat endpoint
chatRoutes.post("/", chatController);

export default chatRoutes;
