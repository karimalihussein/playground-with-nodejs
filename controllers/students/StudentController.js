const Student = require("../../models/Academic/Student");
const AysncHandler = require("express-async-handler");
const generateToken = require("../../utils/GenerateToken");
const bcrypt = require("bcryptjs");
const Helpers = require("../../utils/Helpers");

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



module.exports = {
  register,
  login
};