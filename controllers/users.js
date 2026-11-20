const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// importamos el model de user
const User = require('../models/user');

// create user
module.exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // obtenemos el hash del password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      data: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// login
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        message: 'Correo o contraseña incorrectos',
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        message: 'Correo o contraseña incorrecto',
      });
    }

    const payload = { _id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.status(200).json({
      token,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: 'Usuario no encontrado',
      });
    }

    return res.status(200).json({
      data: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return next(error);
  }
};