const routerUser = require('express').Router();// creamos un controlador de ritas y la guardamos en la contanet route
const path = require('path');
const userPathUsers = path.join(__dirname, './data/users.json');


/* router.get('/',(req,res)=>{
  res.send("Error 404 Página no encontrada")
});*/

routerUser.get('/users',(req,res)=>{
  res.send(userPathUsers)
})

module.exports = routerUser;