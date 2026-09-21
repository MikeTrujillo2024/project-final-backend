/* routes */
const router = require('express').Router();

// llamamos al controlador
const { getUsers, getUserById, createUser } = require('../controllers/users');

// Get
router.get('/', getUsers);

// Get by id
router.get('/:userId', getUserById);

// Post
router.post('/', createUser);

module.exports = router;