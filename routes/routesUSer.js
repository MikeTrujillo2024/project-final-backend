const routerUser = require('express').Router();// creamos un controlador de ritas y la guardamos en la contanet route
const fs = require('fs').promises;
const path = require('path');

const userPathUsers = path.join(__dirname, '../data/users.json');

/**
 * obtenemos el json completo de usuarios
 */
routerUser.get('/', (req, res) => {
  fs.readFile(userPathUsers, 'utf-8')
    .then((data) => {
      const user = JSON.parse(data);
      res.json(user);
    }).catch((error) => {
      res.status(500).send({ message: error.message });
    });
});

/**
 * obtenemos a un usaurio especifico
 * depenediendo del id que se nos solicite
 */

routerUser.get('/:id', (req, res) => {
  // agrupamos los datos
  const { id } = req.params;

  fs.readFile(userPathUsers, 'utf-8')
    .then((data) => {
      // obtenemos todo el json
      const users = JSON.parse(data);
      // comparamos el id de la ruta con el id de el json
      const userId = users.find((item) => item._id === id);

      // si el id no se encuentra
      if (!userId) {
        res.status(404).send({ message: `el usuario con id ${id} no encontrado ` });
      }

      return res.send(userId);
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
});

module.exports = routerUser;