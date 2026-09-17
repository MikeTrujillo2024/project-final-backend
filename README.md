# Web Project Around Express

API REST desarrollada con **Node.js** y **Express.js** como parte del proyecto Sprint 16.

## Descripción

Este proyecto consiste en la implementación de un servidor web utilizando **Express.js**, con el objetivo de desarrollar y comprender los fundamentos de una API REST.

Actualmente, la aplicación cuenta con dos recursos principales:

- **Users**: gestión y consulta de usuarios.
    -- es indispensable que la página nos informe de todos los usuaros que tenemos
    ![all users](https://i.postimg.cc/vBMCT8TT/get-Users.jpg)

    -- en los recursos user te permite consultar por id de usurios
    ![id de usurios](https://i.postimg.cc/26mgyjy8/get-Users-By-Id.jpg)
    
- **Cards**: gestión y consulta de tarjetas.
    -- por el momento solo podemos consultar las tarjetas en formato JSON
    ![cards](https://i.postimg.cc/26mgyjy8/get-Users-By-Id.jpg)

Durante esta etapa del proyecto, los datos se obtienen desde archivos **JSON**, simulando una fuente de datos. En etapas posteriores, estos datos serán reemplazados por una **base de datos real**.

En todo momento el proyecto esta al pendiente de los errores que puese pasar durante la navegación

 -- ERROR 404 para los recursos no encontrados es importante que demos a conocer al usuario
 ![error recursos](https://i.postimg.cc/wvHnMxMp/404Notfound.jpg)

 --ERROR USUARIO NO ENCONTRADO cuando ingresamos un id de usuario incorrecto nos muestra error
 ![error idUSer](https://i.postimg.cc/vBMCT8TB/id-Noencontrado.jpg)

 --ERROR 500 cuando por algun motivo el hay un error en programacion tendremos este error
 ![error servidor](https://i.postimg.cc/pLbw4BvP/error500.jpg)



El proyecto también incorpora herramientas para facilitar el desarrollo y mantener la calidad del código, como **Nodemon** y **ESLint**.

---

## Tecnologías utilizadas

- **Node.js**
- **Express.js**
- **JavaScript**
- **Nodemon**
- **ESLint**
- **Airbnb JavaScript Style Guide**
- **JSON** como fuente de datos temporal

---

## Estructura del proyecto

```text
web_project_around_express/
│
├── data/
│   ├── users.json
|   |
│   └── cards.json
│
├── routes/
│   ├── routesUSer.js
│   └── routesCard.js
│
├── app.js
├── package.json
├── package-lock.json
└── README.md
