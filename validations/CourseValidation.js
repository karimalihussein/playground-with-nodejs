const Joi = require("joi");

function validateStore(course) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(2).max(255).required(),
    price: Joi.number().min(0).max(1000000).required(),
    instructor: Joi.string().required(),
    image: Joi.string(),
    type: Joi.string().valid("free", "paid").required(),
    category: Joi.string().valid("web", "mobile", "network", "operating system", "database", "data science", "programming language", "other").required(),
    rating: Joi.number().min(0).max(5).required(),
    duration: Joi.string().required(),
  });
  return schema.validate(course);
}

function validateUpdate(course) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50),
    description: Joi.string().min(2).max(255),
    price: Joi.number().min(0).max(1000000),
    instructor: Joi.string(),
    image: Joi.string(),
    type: Joi.string().valid("free", "paid"),
    category: Joi.string().valid("web", "mobile", "network", "operating system", "database", "data science", "programming language", "other"),
    rating: Joi.number().min(0).max(5),
    duration: Joi.string(),
  });
  return schema.validate(course);
}



module.exports = { validateStore, validateUpdate };
