const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

/**
 * @desc:   Register a new user
 * @route:  POST /api/auth/register
 * @access: Public
 * @return: {Object} user
 */
router.post('/register', AuthController.register);

/**
 * @desc:   Login a user
 * @route:  POST /api/auth/login
 * @access: Public
 * @method: POST
 */
router.post('/login', AuthController.login);


module.exports = router;
