const express = require("express");
const Joi = require("joi");
const router = express.Router();
const {
  validateStore,
  validateUpdate,
} = require("../validations/CourseValidation");
const asyncHandler = require("express-async-handler");
const { Course } = require("../models/Course");
const {
  verifyTokenAndAdmin
} = require("../middlewares/VerifyToken");

/**
 * @desc: Get all courses
 * @route: GET /api/courses
 * @access: Public
 * @param: req, res
 * @return: courses
 * @method: GET
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const courses = await Course.find().populate(
      "instructor",
      "firstName lastName image"
    );
    res.status(200).json(courses);
  })
);

/**
 * @desc: Get a course by id
 * @route: GET /api/courses/:id
 * @access: Public
 * @param: req, res
 * @return: course
 * @method: GET
 */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id).populate(
      "instructor",
      "firstName lastName image"
    );
    if (!course) {
      res.status(404).send("The course with the given ID was not found.");
      return;
    }
    res.status(200).json(course);
  })
);

/**
 * @desc: Create a course
 * @route: POST /api/courses
 * @access: Private
 * @param: req, res
 * @return: course
 * @method: POST
 */
router.post(
  "/",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = validateStore(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    const course = new Course({
      name: req.body?.name,
      description: req.body?.description,
      price: req.body?.price,
      duration: req.body?.duration,
      instructor: req.body?.instructor,
      rating: req.body?.rating,
      category: req.body?.category,
      type: req.body?.type,
      image: req.body?.image,
    });

    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  })
);

/**
 * @desc: Update a course
 * @route: PUT /api/courses/:id
 * @access: Private
 * @param: req, res
 * @return: course
 * @method: PUT
 */
router.put(
  "/:id",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = validateUpdate(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      $.set({
        name: req.body?.name,
        description: req.body?.description,
        price: req.body?.price,
        duration: req.body?.duration,
        instructor: req.body?.instructor,
        rating: req.body?.rating,
        category: req.body?.category,
        type: req.body?.type,
        image: req.body?.image,
      })
    );
  })
);

/**
 * @desc: Delete a course
 * @route: DELETE /api/courses/:id
 * @access: Private
 * @param: req, res
 * @return: course
 * @method: DELETE
 */
router.delete(
  "/:id",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const course = await Course.findByIdAndRemove(req.params.id);
    if (!course) {
      res.status(404).send("The course with the given ID was not found.");
      return;
    }
    res.status(200).json({ message: "Course deleted successfully" });
  })
);

module.exports = router;
