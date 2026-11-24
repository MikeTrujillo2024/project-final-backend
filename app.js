require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const expressWinston = require('express-winston');
const winston = require('winston');
const logger = require('./utils/logger');

// cors
const cors = require('cors');

/* const path = require('path'); */
const routerUser = require('./routes/routeUser');
const routerArticle = require('./routes/routeArticle');
const errorHandler = require('./middleware/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

// leer los cuerpos de json
app.use(express.json());

app.use(cors({
  origin:  'http://localhost:5173',
}))
// registra solicitudes entrantes
app.use(expressWinston.logger({
  winstonInstance: logger,
  level: 'http',
  format: winston.format.json(),
  requestWhitelist: ['method', 'url', 'httpVersion', 'originalUrl'],
}));
// conectamos con el servidor de mongo
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conexión exitosa a MongoDB');

    // libk a users
    app.use('/users', routerUser);
    // link a las cards
    app.use('/articles', routerArticle);

    app.use(expressWinston.errorLogger({
      winstonInstance: logger,
      format: winston.format.json(),
      requestWhitelist: ['method', 'url', 'httpVersion', 'originalUrl'],
    }));

    // middleware para centralizar los errores
    app.use(errorHandler);

    // middleware
    app.use((req, res) => {
      res.status(404).json({
        message: 'Recurso solicitado no encontrado',
      });
    });

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con MongoDB:', error);
  });