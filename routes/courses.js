const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../middlewares/VerifyToken");
const CourseController = require("../controllers/CourseController");


router.route('/').get(CourseController.getAllCourses).post(verifyTokenAndAdmin, CourseController.createCourse);
router.route('/:id').get(CourseController.getCourseById).put(verifyTokenAndAdmin, CourseController.updateCourse).delete(verifyTokenAndAdmin, CourseController.deleteCourse);


module.exports = router;
