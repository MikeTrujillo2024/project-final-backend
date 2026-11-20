/* routes */
const router = require('express').Router();

// auth
const auth = require('../middleware/auth');
// middlewareValidator
const validate = require('../middleware/validate');
// esquemas de validators
const userSchema = require('../validators/user');
const loginSchema = require('../validators/login');

// llamamos al controlador
const {
  createUser,
  login,
  getCurrentUser,
} = require('../controllers/users');

router.post('/signup', validate(userSchema), createUser);
router.post('/signin', validate(loginSchema), login);
router.get('/me', auth, getCurrentUser);

module.exports = router;