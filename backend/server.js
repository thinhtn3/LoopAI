import "dotenv/config";
import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

//Test Route

//Routes
app.use("/api/chat", chatRoutes);

app.use(errorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
