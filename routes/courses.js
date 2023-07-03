const express = require("express");
const Joi = require("joi");
const router = express.Router();

const courses = [
  {
    id: 1,
    name: "Javascript Course From Zero to Hero",
    description : "This course is for beginners who want to learn javascript from scratch",
    price : 100,
    duration : "2 months",
    instructor : "John Doe",
    rating : 4.5,
    category : "Programming",
  }, {
    id: 2,
    name: "Python Course From Zero to Hero",
    description : "This course is for beginners who want to learn python from scratch",
    price : 140,
    duration : "3 months",
    instructor : "Maxmillian Schwarzmuller",
    rating : 4.8,
    category : "Programming",
  }, {
    id: 3,
    name: "React Course From Zero to Hero",
    description : "This course is for beginners who want to learn react from scratch",
    price : 120,
    duration : "1 months",
    instructor : "John Doe",
  }
];

/**
 * @desc: Get all courses
 * @route: GET /api/courses
 * @access: Public
 * @param: req, res
 * @return: courses
 * @method: GET
 */
router.get("/", (req, res) => {
  res.send(courses);
});

/**
 * @desc: Get a course by id
 * @route: GET /api/courses/:id
 * @access: Public
 * @param: req, res
 * @return: course
 * @method: GET
 */
router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The course with the given ID was not found.");
  res.send(course);
});


/**
 * @desc: Create a course
 * @route: POST /api/courses
 * @access: Public
 * @param: req, res
 * @return: course
 * @method: POST
 */
router.post("/", (req, res) => {
  const { error } = validateStoreCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body?.name,
    description: req.body?.description,
    price: req.body?.price,
    duration: req.body?.duration,
    instructor: req.body?.instructor,
    rating: req.body?.rating,
    category: req.body?.category,
  };

  courses.push(course);
  res.send(course);
});

/**
 * @desc: Update a course
 * @route: PUT /api/courses/:id
 * @access: Public
 * @param: req, res
 * @return: course
 * @method: PUT
 */
router.put("/:id", (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) { res.status(404).send("The course with the given ID was not found."); return; }
    const { error } = validateUpdateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    // only update the properties that are sent
});

/**
 * @desc: Delete a course
 * @route: DELETE /api/courses/:id
 * @access: Public
 * @param: req, res
 * @return: course
 * @method: DELETE
 */
router.delete("/:id", (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) { res.status(404).send("The course with the given ID was not found."); return; }
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

function validateStoreCourse(course) {
  const shcema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    price: Joi.number().min(0).required(),
    duration: Joi.string().min(3).required(),
    instructor: Joi.string().min(3).required(),
    rating: Joi.number().min(0).required(),
    category: Joi.string().min(3).required(),
  });
  return shcema.validate(course);
}

function validateUpdateCourse(course) {
  const shcema = Joi.object({
    name: Joi.string().min(3),
    description: Joi.string().min(3),
    price: Joi.number().min(0),
    duration: Joi.string().min(3),
    instructor: Joi.string().min(3),
    rating: Joi.number().min(0),
    category: Joi.string().min(3),
  });
  return shcema.validate(course);
}

module.exports = router;
