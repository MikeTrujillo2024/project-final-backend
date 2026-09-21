// creamos las rutas
const router = require('express').Router();

// llamamos al controlador cards
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

// GET
router.get('/', getCards);
// POST
router.post('/', createCard);
// PUT
router.put('/:cardId/likes', likeCard);
// delete like
router.delete('/:cardId/likes', dislikeCard);
// DELETE card
router.delete('/:id', deleteCard);

module.exports = router;