const Admin = require("../../models/Staff/Admin");
const AysncHandler = require("express-async-handler");
const generateToken = require("../../utils/GenerateToken");
const bcrypt = require("bcryptjs");
const Helpers = require("../../utils/Helpers");

/**
 * @description: Register admin
 * @route: POST /api/admins/register
 * @access: Private
 */
const registerAdmin = AysncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (await Admin.findOne({ email })) {
    res.json({ message: "User already exists!" });
  }
  const user = await Admin.create({ 
    name, 
    email, 
    password: await Helpers.hashPassword(password), 
  });
  res.status(201).json({
    message: "Admin Registered successfully",
    status: "success",
    data: user,
  });
});

/**
 * @description: Login admin
 * @route: POST /api/admins/login
 * @access: Public
 */
const loginAdmin = AysncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await Admin.findOne({ email });
  if (!user) {
    res.json({ message: "User does not exist!" });
  }
  if(!await Helpers.comparePassword(password, user.password)) { return res.json({ message: "Invalid email or password!" }) };
    req.userAuth = user;
    res.status(200).json({
      message: "Login successful!",
      status: "success",
      token: generateToken(user._id),
    });
});

module.exports = { registerAdmin, loginAdmin };
