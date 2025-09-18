import { Router } from "express";
import { authController, signinController, meController, logoutController } from "../controllers/auth.controller.js";

const authRoutes = Router();


authRoutes.post("/", authController);
authRoutes.post("/signin", signinController)
authRoutes.get("/me", meController)
authRoutes.post("/logout", logoutController)

export default authRoutes;