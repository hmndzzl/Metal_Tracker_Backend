# 🤘 Metal Tracker API (Backend)

## Creado por Hugo Méndez - 241265

---

API RESTful construida con Node.js, Express, TypeScript y PostgreSQL, diseñada para gestionar un catálogo de álbumes, bandas y canciones de metal. 

## 🚀 Cómo correr el proyecto localmente

Este proyecto está completamente dockerizado para facilitar su ejecución.

1. Clona este repositorio y muévete a la carpeta `app`:
   ```bash
   git clone https://github.com/hmndzzl/Metal_Tracker_Backend.git
   cd Metal_Tracker_Backend/app
   ```

2. Crea un archivo `.env` basándote en el `.env_example`:
   ```bash
   cp .env_example .env
   ```
   *Ejemplo de configuración en tu archivo `.env`:*
   ```env
   # CONFIGURACIÓN DEL SERVIDOR NODE.JS
   PORT=3000

   # CREDENCIALES DE POSTGRESQL (DOCKER & NODE)
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=admin_password
   POSTGRES_DB=metal_tracker

   # Host y puerto interno para la conexión
   DB_HOST=db
   DB_PORT=5432

   # SEGURIDAD Y AUTENTICACIÓN
   JWT_SECRET=super_secreto_metalero_123
   JWT_EXPIRES_IN=24h
   ```

3. Construye y levanta los contenedores usando Docker Compose:
   ```bash
   docker compose up --build
   ```

4. La base de datos PostgreSQL se creará y poblará automáticamente usando los scripts de la carpeta `database/init`. La API estará disponible en `http://localhost:3000`.

5. Revisa y prueba la documentación interactiva en `http://localhost:3000/api-docs`.

## 🌐 Sobre CORS

**CORS (Cross-Origin Resource Sharing)** es un mecanismo de seguridad de los navegadores que restringe las peticiones HTTP que se inician desde un dominio diferente al del servidor. 

**¿Qué se configuró?** En el archivo `server.ts`, se utiló el middleware `cors()` permitiendo el origen `*` (todos los orígenes) y los métodos `GET, POST, PUT, DELETE, OPTIONS` para facilitar el desarrollo y consumo desde nuestro cliente en Vanilla JS sin bloqueos del navegador.

## 🏆 Challenges Implementados

* **Swagger / OpenAPI:** Especificación precisa y UI corriendo en `/api-docs`.
* **Códigos HTTP Correctos:** Respuestas 201, 204, 400 y 404 implementadas en toda la API.
* **Validación Server-Side:** Respuestas JSON descriptivas en caso de errores.
* **Paginación, Búsqueda y Ordenamiento:** Implementados en `GET /albums`.
* **Sistema de Rating:** Tablas y endpoints dedicados (`/albums/:id/ratings`).
* **Subida de Imágenes:** Soporte para portadas de álbumes con límite de 1MB usando Multer.

## 🧠 Reflexión Tecnológica

Utilizar **Node.js con TypeScript y PostgreSQL** con **Docker** para este backend fue una decisión acertada. TypeScript nos obligó a mantener contratos estrictos y tipado fuerte, lo que redujo drásticamente los errores de desarrollo. PostgreSQL, estructurado en Forma Normal de Boyce-Codd (BCNF), demostró ser extremadamente robusto gracias a los constraints como `ON DELETE CASCADE`. 

El mayor challenge fue estructurar correctamente la paginación y búsqueda dinámica en SQL puro sin ORMs, además de configurar Multer para la gestión de archivos físicos. Definitivamente volvería a usar este stack, ya que proporciona un control absoluto sobre el flujo de los datos y el rendimiento de la aplicación, separando limpiamente la capa de datos de la presentación.

## 📁 Estructura del Proyecto

```text
Metal_Tracker_Backend/
├── app/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── config/          # Configuración de base de datos
│   │   │   ├── controllers/     # Lógica de negocio y manejo de peticiones
│   │   │   ├── docs/            # Documentación Swagger (YAML)
│   │   │   ├── middlewares/     # Middlewares (Verificación JWT, Multer)
│   │   │   ├── routes/          # Definición y protección de endpoints
│   │   │   ├── uploads/         # Archivos de imágenes subidas localmente
│   │   │   ├── server.ts        # Punto de entrada de la aplicación Express
│   │   │   └── Dockerfile       # Instrucciones de la imagen del backend
│   │   ├── package.json
│   │   └── tsconfig.json        # Configuración estricta de TypeScript
│   ├── database/
│   │   └── init/
│   │       ├── 01_schema.sql    # Creación de tablas y BCNF
│   │       └── 02_seeds.sql     # Datos de prueba (Usuarios, Bandas, Álbumes)
│   ├── docker-compose.yml       # Orquestación de contenedores (App + BD)
│   ├── .env                     # Variables de entorno (No subido al repo)
│   └── .env_example             # Ejemplo de variables de entorno
└── README.md                    # Documentación
```