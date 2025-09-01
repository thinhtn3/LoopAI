import { Router } from "express";
import { searchKeywordController } from "../controllers/search.controller.js";

const searchRoutes = Router();

searchRoutes.get("/", searchKeywordController);

export default searchRoutes;