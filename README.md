# API Basica Express con CRUD de Productos

Proyecto base con Express.js, organizado por carpetas y conectado a MongoDB Atlas.
El CRUD de productos persiste datos en la base de datos.

## Requisitos

- Node.js instalado
- npm instalado

## Instalacion

```bash
npm init -y
npm install express
npm install mongoose dotenv
npm install -D nodemon
```

## Variables de entorno

Crear un archivo `.env` en la raiz del proyecto:

```env
PORT=3000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/<database>?retryWrites=true&w=majority
```

## Scripts

En `package.json`:

```json
"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

- `npm start`: ejecuta el servidor en modo normal.
- `npm run dev`: ejecuta con recarga automatica (nodemon).

## Estructura de carpetas

```text
ExpressApp
├── .env
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── README.md
├── src
│   ├── app.js
│   ├── config
│   │   └── database.js
│   ├── controllers
│   │   ├── category.controller.js
│   │   └── products.controller.js
│   ├── models
│   │   ├── category.model.js
│   │   └── product.model.js
│   ├── routes
│   │   ├── category.route.js
│   │   └── products.routes.js
│   ├── server.js
│   └── services
│       ├── category.service.js
│       └── products.service.js
```

## Flujo de arquitectura

1. `routes`: define endpoints HTTP.
2. `controllers`: recibe request/response y coordina la logica.
3. `services`: contiene reglas de negocio y validaciones.
4. `models`: define esquema Mongoose para MongoDB.
5. `config`: maneja la conexion a Atlas.
6. `app.js`: arma la aplicacion Express y maneja rutas, 404 y errores simples.

## Manejo de respuestas simples

La aplicacion responde con:

- `404` cuando la ruta no existe.
- `400` para errores de validacion de Mongoose o IDs invalidos.
- `500` para errores internos no previstos.

## Ejecutar

```bash
npm run dev
```

Salida esperada:

```text
[nodemon] starting `node src/server.js`
Server listening on http://localhost:3000
```

## Endpoints del CRUD

Base URL: `http://localhost:3000`

- `GET /`: estado de la API

### Productos

- `GET /api/products`: listar productos
- `GET /api/products/:id`: obtener producto por ID (ObjectId de Mongo)
- `POST /api/products`: crear producto
- `PUT /api/products/:id`: actualizar producto por ID
- `DELETE /api/products/:id`: eliminar producto por ID

### Categorias

- `GET /api/categories`: listar categorias
- `GET /api/categories/:id`: obtener categoria por ID (ObjectId de Mongo)
- `POST /api/categories`: crear categoria
- `PUT /api/categories/:id`: actualizar categoria por ID
- `DELETE /api/categories/:id`: eliminar categoria por ID
