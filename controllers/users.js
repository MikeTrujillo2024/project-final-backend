// importamos el model de user
const User = require('../models/user');

/* metodo GET
obtenenmos todos los usurarios
*/
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.json({ data: users }))
    .catch(() => {
      res.status(500).json({ message: 'Error de servidor' });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }
      res.json({ data: user });
    })
    .catch(() => {
      res.status(500).json({ message: 'Error de servidor' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'erro de insercion' }));
};