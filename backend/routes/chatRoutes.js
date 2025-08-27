import { Router } from "express";
import { chatController } from "../controllers/chatController.js";

const chatRoutes = Router();

chatRoutes.post("/", chatController);

export default chatRoutes;
