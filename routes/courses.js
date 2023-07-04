const express = require("express");
const Joi = require("joi");
const router = express.Router();
const {
  validateStore,
  validateUpdate,
} = require("../validations/CourseValidation");
const asyncHandler = require("express-async-handler");
const { Course } = require("../models/Course");

const courses = [
  {
    id: 1,
    name: "Javascript Course From Zero to Hero",
    description:
      "This course is for beginners who want to learn javascript from scratch",
    price: 100,
    duration: "2 months",
    instructor: "John Doe",
    rating: 4.5,
    category: "Programming",
  },
  {
    id: 2,
    name: "Python Course From Zero to Hero",
    description:
      "This course is for beginners who want to learn python from scratch",
    price: 140,
    duration: "3 months",
    instructor: "Maxmillian Schwarzmuller",
    rating: 4.8,
    category: "Programming",
  },
  {
    id: 3,
    name: "React Course From Zero to Hero",
    description:
      "This course is for beginners who want to learn react from scratch",
    price: 120,
    duration: "1 months",
    instructor: "John Doe",
  },
];

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
    const courses = await Course.find();
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
    const course = await Course.findById(req.params.id);
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
 * @access: Public
 * @param: req, res
 * @return: course
 * @method: POST
 */
router.post(
  "/",
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
 * @access: Public
 * @param: req, res
 * @return: course
 * @method: PUT
 */
router.put(
  "/:id",
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
 * @access: Public
 * @param: req, res
 * @return: course
 * @method: DELETE
 */
router.delete(
  "/:id",
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
