# Web Project Around Express

API REST desarrollada con **Node.js** y **Express.js** como parte del proyecto Sprint 16.

## Descripción

Este proyecto consiste en la implementación de un servidor web utilizando **Express.js**, con el objetivo de desarrollar y comprender los fundamentos de una API REST.

Actualmente, la aplicación cuenta con dos recursos principales:

- **Users**: gestión y consulta de usuarios.
    en los recursos user te permite consultar especifica por id de usurios
    ![id de usurios](https://i.postimg.cc/wvHnMxMp/404Notfound.jpg)
    
- **Cards**: gestión y consulta de tarjetas.

Durante esta etapa del proyecto, los datos se obtienen desde archivos **JSON**, simulando una fuente de datos. En etapas posteriores, estos datos serán reemplazados por una **base de datos real**.

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
