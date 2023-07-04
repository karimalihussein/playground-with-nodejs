const asyncHandler = require("express-async-handler");
const { User } = require('../models/User');
const bcrypt = require('bcryptjs');
const { validateUpdate, validateStore } = require('../validations/UserValidation');

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");
    res.json(users);
});

const updateUser = asyncHandler(async (req, res) => {
    const { error } = validateUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
    }
    const user = await User.findByIdAndUpdate(
        req.params.id, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
            },
        }, {
            new: true
        }
    ).select("-password");
    if (!user) return res.status(404).json({
        message: "User not found"
    });
    res.status(200).json({ message: 'User updated successfully', user });
});


const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
});


const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User has been deleted" });
});




module.exports = { updateUser, getUsers, getUserById, deleteUser };