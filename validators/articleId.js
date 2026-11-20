const Joi = require('joi');

const articleIdSchema = Joi.object({
  articleId: Joi.string().hex().length(24).required(),
});

module.exports = articleIdSchema;