const validate = (schema, property = 'body') => (req, res, next) => {
  // extraemos la propiedad de error
  const { error } = schema.validate(req[property]);

  if (error) {
    return res.status(400).json({
      message: 'Datos inválidos',
    });
  }
  return next();
};
module.exports = validate;