
const { API_URL_NEWS,
        DAYS_RANGE_NEWS,
        PAGE_SIZE_NEWS
 } = require('../utils/constants');

module.exports.getNews = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({
        message: 'Debes proporcionar una palabra clave',
      });
    }

    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - DAYS_RANGE_NEWS);

    const params = new URLSearchParams({
      q: q.trim(),
      from: from.toISOString().split('T')[0],
      to: to.toISOString().split('T')[0],
      pageSize: PAGE_SIZE_NEWS,
      apiKey: process.env.NEWS_API_KEY,
    });

    const response = await fetch(
      `${API_URL_NEWS}?${params.toString()}`
    );

    const data = await response.json();

    if (!response.ok || data.status !== 'ok') {
      return res.status(502).json({
        message: data.message || 'No se pudieron obtener las noticias',
      });
    }

    return res.status(200).json({
      articles: data.articles,
    });
  } catch (error) {
    return next(error);
  }
};
