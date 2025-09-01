import "dotenv/config";
import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import chatRoutes from "./routes/chat.route.js";
import searchRoutes from "./routes/search.route.js";

const app = express();
app.use(cors());
app.use(express.json())


//Routes
app.use("/api/chat", chatRoutes);
app.use("/search", searchRoutes);

app.use(errorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
