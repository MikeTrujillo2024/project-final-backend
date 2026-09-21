// creamos las rutas
const routeCards = require('express').Router();
// usamos readfile para leer el archivo
const fs = require('fs').promises;
// requerimos el path
const path = require('path');
// mandamos a traer el archivo
const cardPath = path.join(__dirname, '../data/cards.json');

routeCards.get('/', (req, res) => {
  fs.readFile(cardPath, 'utf-8')
    .then((data) => {
      const cards = JSON.parse(data);
      res.json(cards);
    }).catch(() => {
      res.status(500).send({ message: 'error predeterminado' });
    });
});

module.exports = routeCards;