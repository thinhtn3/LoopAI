import "dotenv/config";
import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import chatRoutes from "./routes/chat.route.js";
import searchRoutes from "./routes/search.route.js";
import authRoutes from "./routes/auth.route.js";
import archiveRoutes from "./routes/archive.route.js";
import cookieParser from "cookie-parser";

const app = express();
//allow cors from 5173
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json())
app.use(cookieParser())


//Routes
app.use("/api/chat", chatRoutes);
app.use("/search", searchRoutes);
app.use("/auth", authRoutes);
app.use("/archive", archiveRoutes);

app.use(errorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
