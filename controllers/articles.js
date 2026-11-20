/**
 * encaergado de consultar los datos guardados por usuario autenticado
 */
const Article = require('../models/article');

// getarticles
module.exports.getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({ owner: req.user._id });
    return res.status(200).json({
      data: articles,
    });
  } catch (error) {
    return next(error);
  }
};

// create article
module.exports.createArticle = async (req, res, next) => {
  try {
    const {
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
    } = req.body;

    const article = await Article.create({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      owner: req.user._id,
    });

    return res.status(201).json({
      data: article,
    });
  } catch (error) {
    return next(error);
  }
};

// delete article
module.exports.deleteArticle = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const article = await Article.findById(req.params.articleId).select('+owner');

    if (!article) {
      return res.status(404).json({
        message: 'Articulo no encontrado',
      });
    }

    if (!article.owner.equals(userId)) {
      return res.status(403).json({
        message: 'No tienes permisoo para eliminar este artículo',
      });
    }

    await Article.findByIdAndDelete(req.params.articleId);
    return res.status(200).json({
      message: 'Eliminado con éxito',
    });
  } catch (error) {
    return next(error);
  }
};