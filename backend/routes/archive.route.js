import { Router } from "express";
import { archiveController, deleteSessionController } from "../controllers/archive.controller.js";

const archiveRoutes = Router();

archiveRoutes.post("/", archiveController);
//create route to delete current session ID
archiveRoutes.delete("/", deleteSessionController);

export default archiveRoutes;