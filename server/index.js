import express from "express";
import { connectDB } from "../server/config/db.js";
import dotenv from "dotenv";

// Configure app
const app = express();

// Configure .env
dotenv.config();

// Configure port
const port = process.env.PORT;

// Connect database
  connectDB();

// Configure server
app.listen(port, () => {


  console.log(`Server running on ${port}`);
});
