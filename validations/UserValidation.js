const Joi = require("joi");

function validateStore(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(2).max(255).required(),
    username: Joi.string().min(2).max(50).required(),
    password: Joi.string().min(2).max(1024).required(),
    isAdmin: Joi.boolean(),
  });
  return schema.validate(user);
}

function validateUpdate(user) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50),
        email: Joi.string().min(2).max(255),
        username: Joi.string().min(2).max(50),
        password: Joi.string().min(2).max(1024),
        isAdmin: Joi.boolean(),
    });
    return schema.validate(user);
}

function validateLogin(user) {
    const schema = Joi.object({
        email: Joi.string().min(2).max(255).required(),
        password: Joi.string().min(2).max(1024).required(),
    });
    return schema.validate(user);
}

function validateRegister(user) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(2).max(255).required(),
        username: Joi.string().min(2).max(50).required(),
        password: Joi.string().min(2).max(1024).required(),
    });
    return schema.validate(user);
}



module.exports = { validateStore, validateUpdate, validateLogin, validateRegister };
