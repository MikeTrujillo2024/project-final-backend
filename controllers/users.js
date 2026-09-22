// importamos el model de user
const User = require('../models/user');

/* metodo GET
obtenenmos todos los usurarios
*/
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.json({ data: users }))
    .catch(() => {
      res.status(500).json({ message: 'error predeterminado' });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.json({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'datos invalidos' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }
      return res.status(500).json({ message: 'error predeterminado' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: ' datos invalidos' });
      }
      return res.status(500).send({ message: 'error predeterminado.' });
    });
};

module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'datos invalidos' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Usuario no encontrada' });
      }
      return res.status(500).json({ message: 'Error predeterminado' });
    });
};

module.exports.patchAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'datos invalidos' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Usuario no encontrada' });
      }
      return res.status(500).json({ message: 'Error predeterminado' });
    });
};