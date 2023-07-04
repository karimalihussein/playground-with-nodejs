const Joi = require("joi");


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

module.exports = { validateStoreInstructor, validateUpdateInstructor };
