import cloudinary from "cloudinary";
import dotenv from "dotenv";

// Configure .env
dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Export cloudinary instance
export const cloudinaryInstance = cloudinary;
