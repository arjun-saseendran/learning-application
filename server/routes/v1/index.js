import { Router } from "express";
import { userRouter } from "./userRoutes.js";

// Config router
export const v1Router = Router();

v1Router.use("/user", userRouter);
