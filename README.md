# NewsExplorer - Backend

Backend de la aplicación **NewsExplorer**, desarrollado con Node.js y Express. Proporciona una API REST para gestionar usuarios, autenticar sesiones, guardar artículos y consultar noticias mediante NewsAPI.

## 🌐 Aplicación desplegada

- **Frontend:** https://newsexplorer2026.mooo.com
- **API:** https://api-newsexplorer2026.mooo.com

## 🛠️ Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- Joi
- Winston
- express-winston
- CORS
- NewsAPI

## 📂 Estructura del proyecto

```text
project-final-backend/
├── controllers/
│   ├── articles.js
│   ├── users.js
│   └── news.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   └── validate.js
├── models/
│   ├── article.js
│   └── user.js
├── routes/
│   ├── routeArticle.js
│   ├── routeUser.js
│   └── routeNews.js
├── utils/
│   ├── constants.js
│   └── logger.js
├── validators/
├── .env
├── .gitignore
├── app.js
└── package.json
```

## ⚙️ Instalación y configuración

### Requisitos

- Node.js
- npm
- MongoDB Atlas o una instancia de MongoDB
- Una API Key de NewsAPI

### 1. Clonar el repositorio

```bash
git clone https://github.com/MikeTrujillo2024/project-final-backend.git
```

### 2. Entrar al directorio

```bash
cd project-final-backend
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEWS_API_KEY=your_newsapi_key
FRONTEND_URL=http://localhost:5173
```

**Importante:** Las variables de entorno contienen información sensible. No se debe subir el archivo `.env` a GitHub.

En producción, `FRONTEND_URL` debe contener el dominio HTTPS del frontend:

```env
FRONTEND_URL=https://newsexplorer2026.mooo.com
```

La clave `NEWS_API_KEY` se utiliza exclusivamente en el backend para realizar solicitudes a NewsAPI.

### 5. Ejecutar el servidor

Modo desarrollo:

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

El servidor utiliza el puerto `3000` de manera predeterminada.

## 🔗 Endpoints de la API

### Usuarios

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/users/signup` | Registrar un usuario |
| POST | `/users/signin` | Iniciar sesión |
| GET | `/users/me` | Obtener información del usuario autenticado |

Las rutas de registro e inicio de sesión utilizan validaciones Joi.

La ruta `/users/me` requiere autenticación mediante JWT.

### Artículos guardados

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/articles` | Obtener los artículos guardados por el usuario |
| POST | `/articles` | Guardar un artículo |
| DELETE | `/articles/:articleId` | Eliminar un artículo |

Todas las rutas de artículos requieren autenticación.

Cada artículo se asocia con el usuario que lo guarda. El backend verifica que el usuario autenticado sea el propietario antes de permitir su eliminación.

Al crear un artículo, se reciben los siguientes campos:

- `keyword`
- `title`
- `text`
- `date`
- `source`
- `link`
- `image`

### Noticias

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/news?q=palabra_clave` | Buscar noticias |

La búsqueda requiere el parámetro `q`.

Ejemplo:

```http
GET /news?q=tecnología
```

El backend consulta NewsAPI mediante su endpoint `/v2/everything`.

Características de la búsqueda:

- Consulta noticias de los últimos 7 días.
- Solicita hasta 100 artículos por consulta.
- Utiliza la variable `NEWS_API_KEY` para autenticar la solicitud.
- Devuelve los resultados dentro de la propiedad `articles`.

Respuestas principales:

- `200`: búsqueda exitosa.
- `400`: no se proporcionó una palabra clave válida.
- `502`: error al obtener noticias del proveedor externo.

## 🔐 Autenticación y seguridad

La aplicación utiliza JSON Web Tokens (JWT) para autenticar a los usuarios.

- Las rutas protegidas requieren un token válido.
- Las contraseñas se gestionan mediante bcryptjs.
- Los datos recibidos se validan mediante Joi.
- Los artículos guardados pertenecen a un usuario específico.
- CORS permite solicitudes desde el frontend local y el dominio configurado mediante `FRONTEND_URL`.
- Las claves y credenciales se almacenan en variables de entorno.

## 📰 Integración con NewsAPI

El backend realiza las solicitudes a NewsAPI para evitar exponer la clave de acceso en el frontend.

La configuración de búsqueda se encuentra en `utils/constants.js`:

```js
API_URL_NEWS = 'https://newsapi.org/v2/everything';
DAYS_RANGE_NEWS = 7;
PAGE_SIZE_NEWS = 100;
```

## 📝 Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Inicia el servidor |
| `npm run dev` | Inicia el servidor en modo desarrollo |
| `npm run lint` | Ejecuta ESLint |

## 👨‍💻 Autor

**Mike Trujillo**

Proyecto desarrollado como parte del programa de Desarrollo Web de TripleTen.
