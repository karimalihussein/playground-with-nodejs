const express = require('express');
const Joi = require('joi');
const router = express.Router();
const {
    validateRegister,
    validateLogin,
} = require('../validations/UserValidation');
const { User } = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


/**
 * @desc:   Register a new user
 * @route:  POST /api/auth/register
 * @access: Public
 * @return: {Object} user
 */
router.post('/register', asyncHandler(async (req, res) => {
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
    const token = jwt.sign({ id: user._id, username: user.username, isAdmin: user.isAdmin }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    const {password, ...data} = response._doc;
    res.send({data, token});
}));

/**
 * @desc:   Login a user
 * @route:  POST /api/auth/login
 * @access: Public
 * @method: POST
 */
router.post('/login', asyncHandler(async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: 'Invalid email Address' });
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid password, please try again later' });
    const token = jwt.sign({ id: user._id, username: user.username, isAdmin: user.isAdmin }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    const {password, ...data} = user._doc;
    res.send({data, token});
}));


module.exports = router;
