import jwt from "jsonwebtoken";
import { catchErrorHandler } from "../utils/catchErrorHandler.js";

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Get token.
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized user! No token provided." }); // Handle token not found.
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY); // Decode token.

    if (!decodedToken) {
      return res.status(401).json({ message: "User not authorized!" }); // Handle invalid token.
    }
    req.user = decodedToken; // Set user.
    next();
  } catch (error) {
    catchErrorHandler(res, error); // Handle catch error.
  }
};
