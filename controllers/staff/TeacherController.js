const Teacher = require("../../models/Staff/Teacher");
const AysncHandler = require("express-async-handler");
const generateToken = require("../../utils/GenerateToken");
const bcrypt = require("bcryptjs");
const Helpers = require("../../utils/Helpers");

const register = AysncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const TeacherExists = await Teacher.findOne({ email });
  if (TeacherExists) { return res.json({ message: "Teacher is already exists!" }); };
  const teacher = await Teacher.create({
    name,
    email,
    password: await Helpers.hashPassword(password),
  });
  res.status(201).json({
    message: "Teacher Registered successfully",
    status: "success",
    data: teacher,
  });
});

const login = AysncHandler(async (req, res) => {
  const { email, password } = req.body;
  const teacher = await Teacher.findOne({ email });
  if (!teacher) { return res.json({ message: "Teacher does not exist!" }); };
  if (!await Helpers.comparePassword(password, teacher.password)) { return res.json({ message: "Invalid email or password!" }) };
  req.userAuth = teacher;
  res.status(200).json({
    message: "Teacher has been Logged successful!",
    status: "success",
    token: generateToken(teacher._id),
  });
});

const index = AysncHandler(async (req, res) => {
  const teachers = await Teacher.find({});
  res.status(200).json({
    message: "Teachers fetched successfully!",
    status: "success",
    data: teachers,
  });
});


module.exports = { register, login, index };
