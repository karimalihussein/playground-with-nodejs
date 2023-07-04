const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../middlewares/VerifyToken");
const  InstructorController = require("../controllers/InstructorController");

/**
 * @desc: Get all instructors
 * @route: GET /api/instructors
 * @access: Public
 * @param: req, res
 * @return: instructors
 * @method: GET
 */
router.get('/', InstructorController.getAllInstructors);

/**
 * @desc: Get an instructor by id
 * @route: GET /api/instructors/:id
 * @access: Public
 * @param: req, res
 * @return: instructor
 * @method: GET
 */
router.get('/:id', InstructorController.getInstructorById);
  

/**
 * @desc: Create a new instructor
 * @route: POST /api/instructors
 * @access: Private
 * @param: req, res
 * @return: instructor
 * @method: POST
 * @body: name, description
 */
router.post('/', verifyTokenAndAdmin, InstructorController.storeInstructor);

/**
 * @desc: Update an instructor
 * @route: PUT /api/instructors/:id
 * @access: Private
 * @param: req, res
 * @return: instructor
 * @method: PUT
 * @body: name, description
 */
router.put('/:id', verifyTokenAndAdmin, InstructorController.updateInstructor);

/**
 * @desc: Delete an instructor
 * @route: DELETE /api/instructors/:id
 * @access: Private
 * @param: req, res
 * @return: instructor
 * @method: DELETE
 */
router.delete('/:id', verifyTokenAndAdmin, InstructorController.deleteInstructor);

module.exports = router;