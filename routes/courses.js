const express = require("express");
const Joi = require("joi");
const router = express.Router();

const courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2 " },
  { id: 3, name: "course 3" },
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
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body?.name,
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
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    course.name = req.body?.name;
    res.send(course);
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

function validateCourse(course) {
  const shcema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return shcema.validate(course);
}

module.exports = router;
