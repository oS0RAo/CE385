import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

import mcpRouter from "./mcpRouter";
import chatRouter from "./chatRouter";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
  message: { success: false, error: "Too many requests, please try again later." } 
});

app.use("/mcp", mcpRouter);

app.use("/chat", chatLimiter, chatRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));