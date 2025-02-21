import { Router } from "express";
import { v1Router } from "./v1/index.js";

// Config router
export const apiRouter = Router();

// Route middleware
apiRouter.use("/v1", v1Router);
