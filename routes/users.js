const express = require("express");
const router = express.Router();

const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/VerifyToken");

const UserControllers = require("../controllers/UserController");

/**
 * @desc:  Update a existing user
 * @route: PUT /api/users/:id
 * @access: Private
 */
router.put('/:id', verifyTokenAndAuthorization, UserControllers.updateUser); 

/**
 * @desc:  get all users
 * @route: GET /api/users
 * @access: Private / Admin
 */
router.get('/', verifyTokenAndAdmin, UserControllers.getUsers);

/**
 * @desc:  get a user by id
 * @route: GET /api/users/:id
 * @access: Private / Admin / User (only his profile)
 */
router.get('/:id', verifyTokenAndAuthorization, UserControllers.getUserById);

/**
 * @desc:  delete a user by id
 * @route: DELETE /api/users/:id
 * @access: Private / Admin
 */
router.delete('/:id', verifyTokenAndAdmin, UserControllers.deleteUser);


module.exports = router;