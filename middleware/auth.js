const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        message: 'Se requiere autorizacion',
      });
    }

    if (!authorization.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Formato de autorizacion invalido',
      });
    }

    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // guarda informacion del usuario
    req.user = { _id: payload._id };

    return next();
  } catch (error) {
    return res.status(401).json({
      message: 'Token inválido o expirado',
    });
  }
};

module.exports = auth;