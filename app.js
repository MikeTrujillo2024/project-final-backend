const express = require('express');
/* const path = require('path'); */
const routerUser = require('./routes/routesUSer');
const routerCard = require('./routes/routeCards');

const { PORT = 3000 } = process.env;
const app = express();
/* app.use(express.static(path.join(__dirname),)) */
// link a los usuarios
app.use('/users', routerUser);
app.use('/cards', routerCard);

// middleware
app.use((req, res) => {
  res.status(404).json({
    message: 'Recurso solicitado no encontrado',
  });
});
app.listen(PORT, () => {
  console.log('enlace al servidor');
});