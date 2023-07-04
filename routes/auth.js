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
    const token = null;
    const {password, ...data} = response._doc;
    res.send({data, token});
}));


module.exports = router;
