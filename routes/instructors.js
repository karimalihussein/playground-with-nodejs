const express = require("express");
const Joi = require("joi");
const router = express.Router();

const instructors = [
  {
    id: 1,
    name: "Maximilian Schwarzmüller",
    description:
      "Maximilian Schwarzmüller is a Professional Web Developer and Instructor who currently lives in Germany.",
  },
  {
    id: 2,
    name: "Jonas Schmedtmann",
    description:
      "Jonas Schmedtmann is a full-stack web developer, designer, and teacher.",
  },
  {
    id: 3,
    name: "Brad Traversy",
    description:
      "Brad Traversy is a full stack web developer specializing in modern JavaScript.",
  },
  {
    id: 4,
    name: "Stephen Grider",
    description:
      "Stephen Grider has been building complex Javascript front ends for top corporations in the San Francisco Bay Area.",
  },
  {
    id: 5,
    name: "Andrew Mead",
    description: "Andrew Mead is a full-stack developer from Philadelphia.",
  },
  {
    id: 6,
    name: "Mosh Hamedani",
    description:
      "Mosh (Moshfegh) Hamedani is a passionate and pragmatic software engineer specializing in web application development with ASP.NET MVC, Web API, Entity Framework, Angular, Backbone, HTML5, and CSS.",
  },
];

/**
 * @desc: Get all instructors
 * @route: GET /api/instructors
 * @access: Public
 * @param: req, res
 * @return: instructors
 * @method: GET
 */
router.get("/", (req, res) => {
  res.send(instructors);
});

/**
 * @desc: Get an instructor by id
 * @route: GET /api/instructors/:id
 * @access: Public
 * @param: req, res
 * @return: instructor
 * @method: GET
 */
router.get("/:id", (req, res) => {
  const instructor = instructors.find((i) => i.id === parseInt(req.params.id));
  if (!instructor)
    res.status(404).send("The instructor with the given ID was not found.");
  res.send(instructor);
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
router.post("/", (req, res) => {
  const { error } = validateStoreInstructor(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const instructor = {
    id: instructors.length + 1,
    name: req.body?.name,
    description: req.body?.description,
  };
  instructors.push(instructor);
  res.send(instructor);
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
router.put("/:id", (req, res) => {
  const instructor = instructors.find((i) => i.id === parseInt(req.params.id));
  if (!instructor)
    res.status(404).send("The instructor with the given ID was not found.");

  const { error } = validateUpdateInstructor(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  instructor.name = req.body?.name;
  instructor.description = req.body?.description;
  res.send(instructor);
});

/**
 * @desc: Delete an instructor
 * @route: DELETE /api/instructors/:id
 * @access: Public
 * @param: req, res
 * @return: instructor
 * @method: DELETE
 */
router.delete("/:id", (req, res) => {
  const instructor = instructors.find((i) => i.id === parseInt(req.params.id));
  if (!instructor)
    res.status(404).send("The instructor with the given ID was not found.");

  const index = instructors.indexOf(instructor);
  instructors.splice(index, 1);

  res.send(instructor);
});

function validateStoreInstructor(instructor) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
  });
  return schema.validate(instructor);
}

function validateUpdateInstructor(instructor) {
  const schema = Joi.object({
    name: Joi.string().min(3),
    description: Joi.string().min(3),
  });
  return schema.validate(instructor);
}

module.exports = router;
