// creamos las rutas
const router = require('express').Router();

// llamamos al controlador cards
const { getCards, createCard, deleteCard } = require('../controllers/cards');

// GET
router.get('/', getCards);

// POST
router.post('/', createCard);

// DELETE
router.delete('/:id', deleteCard);

module.exports = router;