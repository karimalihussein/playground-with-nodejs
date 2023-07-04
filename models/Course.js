const mongoose = require("mongoose");
const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      max: 1000000,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
      required: true,
    },
    image: {
      type: String,
      default: "default.jpg",
    },
    type: {
      type: String,
      required: true,
      enum: ["free", "paid"],
    },
    category: {
        type: String,
        required: true,
        enum: ["web", "mobile", "network", "operating system", "database", "data science", "programming language", "other"],
    },
    duration: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      maxlength: 5,
      max: 5,
    }
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", CourseSchema);
module.exports = { Course };
