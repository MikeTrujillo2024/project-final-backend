// creamos las rutas
const router = require('express').Router();

const validate = require('../middleware/validate');
const articleSchema = require('../validators/article');
const articleIdSchema = require('../validators/articleId');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

const auth = require('../middleware/auth');

router.get('/', auth, getArticles);
router.post('/', auth, validate(articleSchema), createArticle);
router.delete('/:articleId', auth, validate(articleIdSchema, 'params'), deleteArticle);

module.exports = router;