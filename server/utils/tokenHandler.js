import jwt from "jsonwebtoken";

// Generate token
export const generateToken = (user, role) => {
  try {
    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET);
    return token;
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};
