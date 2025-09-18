import { Router } from "express";
import { authController, signinController, meController, logoutController, signupController } from "../controllers/auth.controller.js";

const authRoutes = Router();


authRoutes.post("/", authController);
authRoutes.post("/signin", signinController)
authRoutes.post("/signup", signupController)
authRoutes.get("/me", meController)
authRoutes.post("/logout", logoutController)

export default authRoutes;