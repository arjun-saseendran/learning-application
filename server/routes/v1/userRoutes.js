import { Router } from "express";
import { upload } from "../../middlewares/multer.js";
import {
  checkUser,
  updateUserProfile,
  userLogin,
  userProfile,
  userSignup,
} from "../../controllers/userControllers.js";
import { authUser } from "../../middlewares/authUser.js";

// Config router
export const userRouter = Router();

// Register user
userRouter.post("/signup", upload.single("profilePicture"), userSignup);

// Login user
userRouter.post("/login", userLogin);

// Get user profile
userRouter.get("/profile", authUser, userProfile);

userRouter.put(
  "/update-profile",
  authUser,
  upload.single("profilePicture"),
  updateUserProfile,
); // Update user profile.

// Check user
userRouter.get("/check-user", authUser, checkUser);
