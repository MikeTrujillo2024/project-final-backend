const Joi = require('joi');

const articleSchema = Joi.object({
  title: Joi.string().required(),
  keyword: Joi.string().required(),
  text: Joi.string().required(),
  date: Joi.string().required(),
  source: Joi.string().required(),
  link: Joi.string().uri().required(),
  image: Joi.string().uri().required(),
});

module.exports = articleSchema;