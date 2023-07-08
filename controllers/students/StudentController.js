const Student = require("../../models/Academic/Student");
const AysncHandler = require("express-async-handler");
const generateToken = require("../../utils/GenerateToken");
const bcrypt = require("bcryptjs");
const Helpers = require("../../utils/Helpers");
const StudentMiddleware = require("../../middlewares/StudentMiddleware");

const register = AysncHandler(async (req, res) => {
  const { name, email, password, age, phone } = req.body;
  const StudentExists = await Student.findOne({ email });
  if (StudentExists) { return res.json({ message: "Student is already exists!" }); };
  const student = await Student.create({ name, email, password: await Helpers.hashPassword(password), age, phone });
  res.status(201).json({
    message: "Student Registered successfully",
    status: "success",
    data: student,
  });
});

const login = AysncHandler(async (req, res) => {
  const { email, password } = req.body;
  const student = await Student.findOne({ email });
  if (!student) { return res.json({ message: "Student does not exist!" }); };
  if (!await Helpers.comparePassword(password, student.password)) { return res.json({ message: "Invalid email or password!"})};
  req.userAuth = student;
  res.status(200).json({
    message: "Student has been Logged successful!",
    status: "success",
    token: generateToken(student._id),
  });
});

const getYourOwnProfile = AysncHandler(async (req, res) => {
  const student = await Student.findById(req.userAuth._id).select('-password -createdAt -updatedAt -__v');
  if (!student) { return res.json({ message: "Student does not exist!" });};
  res.status(200).json({
    message: "Your profile fetched successfully!",
    status: "success",
    data: student,
  });
});

const index = AysncHandler(async (req, res) => {
  const students = await Student.find({}).select('-password -createdAt -updatedAt -__v');
  res.status(200).json({
    message: "Students fetched successfully!",
    status: "success",
    data: students,
  });
});

const show = AysncHandler(async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id).select('-password -createdAt -updatedAt -__v');
  if (!student) { return res.json({ message: "Student does not exist!" });};
  res.status(200).json({
    message: "Student profile fetched successfully!",
    status: "success",
    data: student,
  });
});


module.exports = {
  register,
  login,
  getYourOwnProfile,
  index,
  show
};