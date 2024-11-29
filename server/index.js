import express from "express";
import { connectDB } from "../server/config/db.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const port = process.env.PORT;

app.listen(port, () => {
  connectDB();

  console.log(`Server running on ${port}`);
});
