const winston = require('winston');

const onlyLevel = (level) => winston.format((info) => (
  info.level === level ? info : false
));

const logger = winston.createLogger({
  level: 'http',
  transports: [
    new winston.transports.File({
      filename: 'logs/request.log',
      format: onlyLevel('http')(),
    }),

    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: onlyLevel('error')(),
    }),
  ],
});

module.exports = logger;