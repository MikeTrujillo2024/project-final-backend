const express = require('express');
/* const path = require('path'); */
const routerUser = require('./routes/routesUSer');

const {PORT=3000} = process.env;
const app = express();
/* app.use(express.static(path.join(__dirname),)) */

app.listen(PORT,()=>{
    console.log(routerUser);
})