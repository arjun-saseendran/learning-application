import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "../server/config/db.js";
import { apiRouter } from "./routes/index.js";

// Configure app
const app = express();

// Configure .env
dotenv.config();

// Configure port
const port = process.env.PORT;

// Connect database
connectDB();

// Common middlewares
app.use(express.json());
app.use(cookieParser());

// Api v1 routes
app.use("/api", apiRouter);

// Configure server
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
