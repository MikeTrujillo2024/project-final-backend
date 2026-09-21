const express = require('express');
const mongoose = require('mongoose');
/* const path = require('path'); */
const routerUser = require('./routes/routesUSer');
const routerCard = require('./routes/routeCards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
// conectamos con el servidor de mongo
mongoose.connect('mongodb://localhost:27017/aroundb');

// middleware para user id
app.use((req, res, next) => {
  req.user = {
    _id: '6ab0283b44a226e879d87ee5', // pega el _id del usuario de prueba que creamos en el paso anterior
  };

  next();
});

// link a los usuarios
app.use('/users', routerUser);
// link a las cards
app.use('/cards', routerCard);

// middleware
app.use((req, res) => {
  res.status(404).json({
    message: 'Recurso solicitado no encontrado mike',
  });
});
app.listen(PORT, () => {
  console.log('enlace al servidor');
});