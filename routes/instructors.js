const express = require("express");
const router = express.Router();
const {
  Instructor
} = require("../models/Instructor");
const asyncHandler = require("express-async-handler");
const {
  validateStoreInstructor,
  validateUpdateInstructor,
} = require("../validations/InstructorValidation");

/**
 * @desc: Get all instructors
 * @route: GET /api/instructors
 * @access: Public
 * @param: req, res
 * @return: instructors
 * @method: GET
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const instructors = await Instructor.find();
    res.status(200).json(instructors);
  })
);

/**
 * @desc: Get an instructor by id
 * @route: GET /api/instructors/:id
 * @access: Public
 * @param: req, res
 * @return: instructor
 * @method: GET
 */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) {
      res.status(404).send("The instructor with the given ID was not found.");
      return;
    }
    res.status(200).json(instructor);
  })
);

/**
 * @desc: Create a new instructor
 * @route: POST /api/instructors
 * @access: Public
 * @param: req, res
 * @return: instructor
 * @method: POST
 * @body: name, description
 */
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      error
    } = validateStoreInstructor(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    const newInstructor = new Instructor({
      firstName: req.body?.firstName,
      lastName: req.body?.lastName,
      role: req.body?.role,
      email: req.body?.email,
      image: req.body?.image,
    });
    const response = await newInstructor.save();
    res.status(201).send(response);
  })
);

/**
 * @desc: Update an instructor
 * @route: PUT /api/instructors/:id
 * @access: Public
 * @param: req, res
 * @return: instructor
 * @method: PUT
 * @body: name, description
 */
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const {
      error
    } = validateUpdateInstructor(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    const instructor = await Instructor.findByIdAndUpdate(
      req.params.id, {
      $set: {
        firstName: req.body?.firstName,
        lastName: req.body?.lastName,
        role: req.body?.role,
        email: req.body?.email,
        image: req.body?.image,
      },
    }, {
      new: true
    }
    );
    if (!instructor) {
      res.status(404).send("The instructor with the given ID was not found.");
      return;
    }
    res.send(instructor);
  })
);

/**
 * @desc: Delete an instructor
 * @route: DELETE /api/instructors/:id
 * @access: Public
 * @param: req, res
 * @return: instructor
 * @method: DELETE
 */
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const instructor = await Instructor.findByIdAndDelete(req.params.id);
    if (!instructor) {
      res.status(404).send("The instructor with the given ID was not found.");
      return;
    }
    res.send(instructor);
  })
);

module.exports = router;