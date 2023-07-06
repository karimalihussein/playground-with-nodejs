const Admin = require("../../models/Staff/Admin");
const AysncHandler = require("express-async-handler");


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
  const user = await Admin.create({ name, email, password });
  res.status(201).json({
    message: "Admin created successfully!",
    status: "success",
    data: user,
  });
});

/**
 * @description: Login admin
 * @route: POST /api/admins/login
 * @access: Public
 */
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      res.json({ message: "User does not exist!" });
    }
    if (user && (await user.comparePassword(password))) {
      res.status(200).json({
        message: "Login successful!",
        status: "success",
        data: user,
      });
    } else {
      res.json({ message: "Invalid email or password!" });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { registerAdmin, loginAdmin };
