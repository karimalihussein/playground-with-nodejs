const mongoose = require("mongoose");
const InstructorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  image: {
    type: String,
    default: "default.jpg",
  },
},{
  timestamps: true,
});


const Instructor = mongoose.model("Instructor", InstructorSchema);
module.exports = { Instructor };
