import { Schema, model } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      miniLength: 3,
      maxLength: 30,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      miniLength: 20,
      maxLength: 300,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaLGtEd0MJro4X9wDmT2vrvLT-HjKkyyWVmg&s",
    },
    mentor: {
      type: Schema.Types.ObjectId,
      ref: "Mentor",
    },
  },
  {
    timestamps: true,
  }
);

export const Course = model("Course", courseSchema);
