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


module.exports = { register };
