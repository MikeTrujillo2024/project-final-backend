require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const expressWinston = require('express-winston');
const winston = require('winston');
// cors
const cors = require('cors');
const logger = require('./utils/logger');

/* const path = require('path'); */
const routerUser = require('./routes/routeUser');
const routerArticle = require('./routes/routeArticle');
const routerNews = require('./routes/routeNews');
const errorHandler = require('./middleware/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

// leer los cuerpos de json
app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
}));
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
    //link a las noticias
    app.use('/news', routerNews);

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