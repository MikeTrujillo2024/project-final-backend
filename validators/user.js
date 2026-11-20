const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = userSchema;