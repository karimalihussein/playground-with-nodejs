const asyncHandler = require("express-async-handler");
const { User } = require('../models/User');
const bcrypt = require('bcryptjs');
const { validateRegister, validateLogin } = require('../validations/UserValidation');


const register = asyncHandler(async (req, res) => {
    const { error } = validateRegister(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ message: 'User already registered.' });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
    });
    const response = await user.save();
    const token = user.generateAuthToken();
    const {password, ...data} = response._doc;
    res.status(200).json({data, token});
});

const login = asyncHandler(async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: 'Invalid email Address' });
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid password, please try again later' });
    const token = user.generateAuthToken();
    const {password, ...data} = user._doc;
    res.status(200).json({data, token});
});

module.exports = { register, login };