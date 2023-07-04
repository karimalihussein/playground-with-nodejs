const express = require("express");
const Joi = require("joi");
const router = express.Router();
const {
    validateStore,
    validateUpdate,
} = require("../validations/UserValidation");
const {
    User
} = require("../models/User");
const asyncHandler = require("express-async-handler");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require("../middlewares/VerifyToken");

/**
 * @desc:  Update a existing user
 * @route: PUT /api/users/:id
 * @access: Private
 */
router.put(
    "/:id",
    verifyTokenAndAuthorization,
    asyncHandler(async (req, res) => {
        if (req.user._id !== req.params.id)
            return res
                .status(401)
                .json({
                    message: `you are not allowed, you only can update your profile`,
                });

        const {
            error
        } = validateUpdate(req.body);
        if (error)
            return res.status(400).json({
                message: error.details[0].message
            });

        console.log(req.headers);

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
        res.send(user);
    })
);

/**
 * @desc:  get all users
 * @route: GET /api/users
 * @access: Private / Admin
 */
router.get('/', verifyTokenAndAdmin, asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");
    res.send(users);
}));

/**
 * @desc:  get a user by id
 * @route: GET /api/users/:id
 * @access: Private / Admin / User (only his profile)
 */
router.get('/:id', verifyTokenAndAuthorization, asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.send(user);
}));

/**
 * @desc:  delete a user by id
 * @route: DELETE /api/users/:id
 * @access: Private / Admin
 */
router.delete('/:id', verifyTokenAndAdmin, asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User has been deleted" });
}));




module.exports = router;