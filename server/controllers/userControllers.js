import { User } from "../models/userModel.js";
import {cloudinaryInstance} from '../config/cloudinary.js'


// User signup
export const userSignup = async (req, res) => {
  try {
    // Destructing data from request.body
    const { name, email, mobile, password, confirmPassword } = req.body;

    // Check each field not empty
    if (!name || !email || !mobile || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Check password and confirm password
    if(password !== confirmPassword){
      return res.status(400).json({message: 'Password and Confirm Password not match!'})
    }

    // Check user already exists
    const existUser = await User.fineOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    // Check mobile number already exist
    const existMobileNumber = await User.findOne({mobile})

    // Handle mobile number already exist
    if(existMobileNumber){
      return res.status(400).json({message: 'Mobile number already exist!'})
    }

    // Handle profile picture not found
    if(!req.file || !req.file.path){
      return res.status(400).json({message: 'Profile picture required!'})
    }

    // Upload profile picture to cloudinary
    const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path)

    // Create new user object
    const newUser = new User({ name, email, mobile, profilePic: uploadResult.url, password});


    // Save data to database
    newUser.save();

    // Exclude password
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    res
      .status(200)
      .json({
        message: "User created successfully",
        data: userWithoutPassword,
      });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};
