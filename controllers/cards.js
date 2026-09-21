//importamos modelos de card
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
    .catch(() => {
      res.status(500).json({ message: 'error predeterminado' })
    })
};

/* metodo delete
eliminamos la card
*/

module.exports.deleteCard = (req, res) => {
  card.findByIdAndDelete(req.params.cardId)
    .then((deletedCard) => {
      if (!deletedCard) {
        res.status(404).json({ message: 'error Tarjeta no encontrada' });
        return;
      }
res.json({ data: deletedCard});

    })
    .catch(() => {
      res.status(500).json({ message: 'error predeterminado'})
    })
};