const express = require("express");
const Joi = require("joi");
const router = express.Router();
const { Instructor } = require("../models/Instructor");

/**
 * @desc: Get all instructors
 * @route: GET /api/instructors
 * @access: Public
 * @param: req, res
 * @return: instructors
 * @method: GET
 */
router.get("/", async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.status(200).json(instructors);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
});

/**
 * @desc: Get an instructor by id
 * @route: GET /api/instructors/:id
 * @access: Public
 * @param: req, res
 * @return: instructor
 * @method: GET
 */
router.get("/:id", async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    res.status(200).json(instructor);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
});

/**
 * @desc: Create a new instructor
 * @route: POST /api/instructors
 * @access: Public
 * @param: req, res
 * @return: instructor
 * @method: POST
 * @body: name, description
 */
router.post("/", async (req, res) => {
  const { error } = validateStoreInstructor(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  try {
    const newInstructor = new Instructor({
      firstName: req.body?.firstName,
      lastName: req.body?.lastName,
      role: req.body?.role,
      email: req.body?.email,
      image: req.body?.image,
    });
    const response = await newInstructor.save();
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
});

/**
 * @desc: Update an instructor
 * @route: PUT /api/instructors/:id
 * @access: Public
 * @param: req, res
 * @return: instructor
 * @method: PUT
 * @body: name, description
 */
router.put("/:id", async (req, res) => {
  const { error } = validateUpdateInstructor(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  try {
    const instructor = await Instructor.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: req.body?.firstName,
          lastName: req.body?.lastName,
          role: req.body?.role,
          email: req.body?.email,
          image: req.body?.image,
        },
      },
      { new: true }
    );
    if (!instructor) {
      res.status(404).send("The instructor with the given ID was not found.");
      return;
    }
    res.send(instructor);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
});

/**
 * @desc: Delete an instructor
 * @route: DELETE /api/instructors/:id
 * @access: Public
 * @param: req, res
 * @return: instructor
 * @method: DELETE
 */
router.delete("/:id", async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndDelete(req.params.id);
    if (!instructor) {
      res.status(404).send("The instructor with the given ID was not found.");
      return;
    }
    res.send(instructor);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
 
});

function validateStoreInstructor(instructor) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    role: Joi.string().min(3).required(),
    email: Joi.string().min(3).required(),
    image: Joi.string().min(3),
  });
  return schema.validate(instructor);
}

function validateUpdateInstructor(instructor) {
  const schema = Joi.object({
    firstName: Joi.string().min(3),
    lastName: Joi.string().min(3),
    role: Joi.string().min(3),
    email: Joi.string().min(3),
    image: Joi.string().min(3),
  });
  return schema.validate(instructor);
}

module.exports = router;
