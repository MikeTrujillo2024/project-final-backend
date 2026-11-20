const errorHandler = (err, req, res, _next) => {
  // error datos invalidos
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Datos inválidos',
    });
  }

  // erro cast
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'datos invalidos',
    });
  }

  // Error de correo duplicado
  if (err.code === 11000) {
    return res.status(409).json({
      message: 'El correo ya está registrado',
    });
  }

  // error por default
  return res.status(500).json({
    message: 'Error interno del sistema',
  });
};

module.exports = errorHandler;