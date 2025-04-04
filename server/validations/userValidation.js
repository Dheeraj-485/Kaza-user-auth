const Joi = require("joi");

exports.signupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

exports.loginSchema = Joi.object({
  usernameOrEmail: Joi.string().required(),
  password: Joi.string().required(),
});

exports.profileSchema = Joi.object({
  name: Joi.string().max(100),
  bio: Joi.string().max(255),
});
