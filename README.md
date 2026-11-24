# NewsExplorer — Backend

Backend de **NewsExplorer**, una aplicación web Full Stack que permite a los usuarios buscar noticias, guardar sus artículos favoritos y administrar sus artículos guardados.

La API proporciona funcionalidades de registro de usuarios, autenticación y gestión de artículos utilizando Node.js, Express y MongoDB.

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- Joi
- Winston
- CORS

## Estructura del proyecto

```text
backend/
├── controllers/
│   ├── articles.js
│   └── users.js
├── logs/
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   └── validate.js
├── models/
│   ├── article.js
│   └── user.js
├── routes/
│   ├── routeArticle.js
│   └── routeUser.js
├── utils/
│   └── logger.js
├── validators/
│   ├── article.js
│   ├── articleId.js
│   ├── login.js
│   └── user.js
├── .gitignore
├── app.js
├── package.json
└── README.md
```

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/MikeTrujillo2024/project-final-backend.git
```

2. Acceder al directorio del proyecto:

```bash
cd project-final-backend
```

3. Instalar las dependencias:

```bash
npm install
```

4. Crear un archivo `.env` en la raíz del proyecto y configurar las siguientes variables de entorno:

```env
PORT=3000
MONGODB_URI=tu_cadena_de_conexion_a_mongodb
JWT_SECRET=tu_clave_secreta
```

Sustituir los valores de ejemplo por la configuración correspondiente. No compartir ni subir el archivo `.env` al repositorio.

## Ejecución del proyecto

Iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

Iniciar el servidor:

```bash
npm start
```

La aplicación utiliza el puerto `3000` de forma predeterminada si no se especifica otro valor en la variable `PORT`.

## Rutas de la API

### Usuarios y autenticación

| Método | Endpoint | Descripción | Autenticación |
|---|---|---|---|
| POST | `/users/signup` | Registrar un nuevo usuario | No |
| POST | `/users/signin` | Iniciar sesión y obtener un JWT | No |
| GET | `/users/me` | Obtener los datos del usuario autenticado | Sí |

### Artículos guardados

| Método | Endpoint | Descripción | Autenticación |
|---|---|---|---|
| GET | `/articles` | Obtener los artículos guardados por el usuario autenticado | Sí |
| POST | `/articles` | Guardar un nuevo artículo | Sí |
| DELETE | `/articles/:articleId` | Eliminar un artículo guardado | Sí |

## Autenticación

La API utiliza JSON Web Tokens (JWT) para proteger las rutas privadas.

Después de iniciar sesión correctamente, el servidor devuelve un token con una vigencia de 7 días.

Para acceder a las rutas protegidas, se debe enviar el token mediante el encabezado `Authorization`:

```http
Authorization: Bearer TU_JWT_TOKEN
```

El middleware de autenticación verifica el token e identifica al usuario que realiza la solicitud.

## Modelos de datos

### Usuario (User)

| Campo | Tipo | Descripción |
|---|---|---|
| `name` | String | Nombre del usuario (entre 2 y 30 caracteres) |
| `email` | String | Correo electrónico único |
| `password` | String | Contraseña cifrada mediante bcryptjs |

Las contraseñas se procesan mediante bcryptjs antes de almacenarse en la base de datos.

### Artículo (Article)

| Campo | Tipo | Descripción |
|---|---|---|
| `title` | String | Título del artículo |
| `keyword` | String | Palabra clave de búsqueda |
| `text` | String | Texto o descripción del artículo |
| `date` | String | Fecha de publicación |
| `source` | String | Fuente de la noticia |
| `link` | String | Dirección URL del artículo |
| `image` | String | Dirección URL de la imagen |
| `owner` | ObjectId | Referencia al usuario propietario del artículo |

Cada artículo guardado está relacionado con el usuario que lo guardó. Los usuarios solamente pueden consultar y eliminar sus propios artículos.

## Validaciones y manejo de errores

Los datos recibidos por la API se validan mediante esquemas Joi y validaciones de los modelos de Mongoose.

La API cuenta con un middleware centralizado para manejar los errores más comunes:

| Código HTTP | Descripción |
|---|---|
| 400 | Datos de solicitud o identificador inválidos |
| 401 | Falta el token, es inválido o ha expirado; también puede indicar credenciales incorrectas |
| 403 | El usuario no tiene permisos para eliminar el artículo |
| 404 | Usuario o artículo no encontrado |
| 409 | El correo electrónico ya está registrado |
| 500 | Error interno del servidor |

## Registro de actividad (Logs)

La aplicación utiliza Winston y express-winston para registrar las solicitudes HTTP entrantes y los errores del servidor.

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Iniciar el servidor con Nodemon |
| `npm start` | Iniciar el servidor |
| `npm run lint` | Ejecutar ESLint |

## Autor

Miguel Angel Fernandez Trujillo
