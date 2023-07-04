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

module.exports = router;