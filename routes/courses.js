const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../middlewares/VerifyToken");
const CourseController = require("../controllers/CourseController");

/**
 * @desc: Get all courses
 * @route: GET /api/courses
 * @access: Public
 * @param: req, res
 * @return: courses
 * @method: GET
 */
router.get('/', CourseController.getAllCourses);

/**
 * @desc: Get a course by id
 * @route: GET /api/courses/:id
 * @access: Public
 * @param: req, res
 * @return: course
 * @method: GET
 */
router.get('/:id', CourseController.getCourseById);

/**
 * @desc: Create a course
 * @route: POST /api/courses
 * @access: Private
 * @param: req, res
 * @return: course
 * @method: POST
 */
router.post('/', verifyTokenAndAdmin, CourseController.createCourse);
 

/**
 * @desc: Update a course
 * @route: PUT /api/courses/:id
 * @access: Private
 * @param: req, res
 * @return: course
 * @method: PUT
 */
router.put('/:id', verifyTokenAndAdmin, CourseController.updateCourse);
 

/**
 * @desc: Delete a course
 * @route: DELETE /api/courses/:id
 * @access: Private
 * @param: req, res
 * @return: course
 * @method: DELETE
 */
router.delete('/:id', verifyTokenAndAdmin, CourseController.deleteCourse);

module.exports = router;
