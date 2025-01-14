import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      miniLength: 3,
      maxLength: 30,
    },

    password: {
      type: String,
      required: true,
      miniLength: 6,
    },
    mobile: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpires: {
      type: String,
      default: null,
    },
    profilePic: {
      type: String,
      default:
        "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
    },
  },
  { timestamps: true }
);

// Encrypt password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);
});

// Validate password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  // Short lived token
  return jwt.sign(
    {
      _id: this._id,
      role: "user",
    },
    process.env.JWT_SECRET
  );
};

export const User = model("User", userSchema);
