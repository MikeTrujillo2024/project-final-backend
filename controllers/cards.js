// importamos modelos de card
const card = require('../models/card');

/*
metodo GET
obtenemos a todas las tarjetas creadas
 */

module.exports.getCards = (req, res) => {
  card.find({})
    .then((cards) => res.json({ data: cards }))
    .catch(() => {
      res.status(500).json({ message: 'error predeterminado' });
    });
};

/*
metodo post
creamos las card
*/
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  card.create({ name, link, owner: req.user._id })
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'error predeterminado.' }));
};

/* metodo delete
eliminamos la card
*/

module.exports.deleteCard = (req, res) => {
  card.findByIdAndDelete(req.params.id)
    .orFail()
    .then((deletedCard) => {
      res.json({ data: deletedCard });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'datos invalidos' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Tarjeta no encontrada' });
      }
      return res.status(500).json({ message: 'Error predeterminado' });
    });
};

module.exports.likeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    // agrega _id al array si aún no está ahí
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((likeCard) => {
      res.send({ data: likeCard });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'datos invalidos' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'CardLike no encontrada' });
      }
      return res.status(500).json({ message: 'Error predeterminado' });
    });
};

module.exports.dislikeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    // elimina _id del array
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((dislike) => {
      res.send({ data: dislike });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'datos invalidos' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Tarjeta no encontrada' });
      }
      return res.status(500).json({ message: 'Error predeterminado' });
    });
};