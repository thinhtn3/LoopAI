import { Router } from "express";
import { searchKeywordController } from "../controllers/search.controller.js";

const searchRoutes = Router();

//GET to /search endpoint
searchRoutes.get("/", searchKeywordController);

export default searchRoutes;