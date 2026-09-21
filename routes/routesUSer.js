/* routes */
const router = require('express').Router();

// llamamos al controlador
const {
  getUsers,
  getUserById,
  createUser,
  patchUser,
  patchAvatar,
} = require('../controllers/users');

// Get
router.get('/', getUsers);

// Post
router.post('/', createUser);

// PATCH usuario
router.patch('/me', patchUser);

// PATCH avatar
router.patch('/me/avatar', patchAvatar);

// Get by id
router.get('/:userId', getUserById);

module.exports = router;