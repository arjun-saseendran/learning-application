import { User } from "../models/userModel.js";
import { cloudinaryInstance } from "../config/cloudinary.js";
import { catchErrorHandler } from "../utils/catchErrorHandler.js";
import {generateToken} from '../utils/tokenHandler.js'

// User signup
export const userSignup = async (req, res) => {
  try {
    // Destructing data from request.body
    const { username, email, mobile, password, confirmPassword } = req.body;

    // Check each field not empty
    if (!username || !email || !mobile || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Check password and confirm password
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and Confirm Password not match!" });
    }

    // Check user already exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    // Check mobile number already exist
    const existMobileNumber = await User.findOne({ mobile });

    // Handle mobile number already exist
    if (existMobileNumber) {
      return res.status(400).json({ message: "Mobile number already exist!" });
    }

    // Handle profile picture not found
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Profile picture required!" });
    }

    // Upload profile picture to cloudinary
    const uploadResult = await cloudinaryInstance.uploader.upload(
      req.file.path,
    );

    // Create new user object
    const newUser = new User({
      username,
      email,
      mobile,
      profilePic: uploadResult.url,
      password,
    });

    // Save data to database
    newUser.save();

    // Exclude password
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    res.status(200).json({
      message: "User created successfully",
      data: userWithoutPassword,
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

// Login user
export const userLogin = async (req, res) => {
  try {
    // Get data from req.body
    const { email, password } = req.body;

    // Validate fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are requird!" });
    }

    // Validate user
    const user = await User.findOne({ email });

    // Handle not user exist
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Validate password
    const validPassword = await user.isPasswordCorrect(password);

    // Handle password not valid
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // Generate token
    const token = generateToken(user, "user", res);
    
    res.cookie('token', token); // Set token to cookies.

    // Exclude password
    const { password: _, ...userWithoutPassword } = user.toObject();

    // Send response to frontend
    res
      .status(200)
      .json({ message: "Login successful!", date: userWithoutPassword });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// User profile
export const userProfile = async (req, res) => {
  try {
    // Get user id
    const userId = req.user.id;
    
    if (!userId) return res.status(401).json({ message: 'User not found!' }); // Handle user not found.

    // Fine user profile
    const profile = await User.findById(userId).select("-password");

    // Send response to frontend
    res
      .status(200)
      .json({ message: "User profile fetched succfully!", data: profile });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    // Get data from reqest body
    const { username, email, mobile } = req.body;

    // Validate field
    if (!username || !email || !mobile) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    // Get user id
    const userId = req.user.id;
    // Set image null
    let profilePictureUrl = null;
    // Save profile picture to cloudinary
    if (req.file) {
      const uploadResult = await cloudinaryInstance.uploader.upload(
        req.file.path,
      );
      profilePictureUrl = uploadResult.url;
    }

    // Update user data
    const updatedUserData = await User.findByIdAndUpdate(
      userId,
      {
        username,
        email,
        mobile,
        profilePicture: profilePictureUrl || undefined,
      },
      { new: true },
    );
    // Send response to frontend
    res
      .status(200)
      .json({
        message: "Profile details updated successfully!",
        data: updatedUserData,
      });
  } catch (error) {
    catchErrorHandler(res, error);
  }
};

export const checkUser = async(req, res) => {
  try{
  res.status(200).json({ message: 'Authorized user' }); 
    
  }catch(error){
    catchErrorHandler(res, error);
  }
  
}
