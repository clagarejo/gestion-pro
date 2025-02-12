# Monorepositorio `GestionPro`

Este es un monorepositorio para manejar el desarrollo de una aplicación para manejar productos. Incluye un backend y un frontend. A continuación, encontrarás información detallada sobre cómo configurar, ejecutar y contribuir al proyecto.

---

## Estructura del Proyecto

El monorepositorio contiene las siguientes carpetas principales:

- **cliente/**: Código fuente del cliente desarrollado con React, usando Sass para estilos, Zustand para el manejo del estado, y conectado a una API.
- **servidor/**: Código fuente del servidor desarrollado en Node.js con Express y MongoDB como base de datos.

## Requisitos Previos

Asegúrate de tener instalados los siguientes componentes antes de trabajar con este repositorio:

- Node.js (v16 o superior)
- Yarn (preferido sobre npm)
- MongoDB (puedes usar una instancia local o un servicio en la nube como MongoDB Atlas)

## Configuración del Proyecto

1. Clona este repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd gestionpro
   ```

2. Instala las dependencias del proyecto:

   ```bash
   yarn install
   ```

3. Configura los entornos para el frontend y el backend:
4. 
   - **Backend**: Crea un archivo `.env` en la raiz del monorepositorio con las variables necesarias. Ejemplo:
     ```env
     PORT=4000
     MONGO_URI=mongodb://localhost:27017/gestionpro
     ```

## Scripts Disponibles

### En la Raíz

- `yarn install`: Instala todas las dependencias del monorepo.
- `yarn build`: Construye tanto el frontend como el backend.
- `yarn start`: Arranca tanto el servidor como el cliente en modo desarrollo.

### En `frontend/`

- `yarn dev`: Inicia el frontend en modo desarrollo.
- `yarn build`: Genera la versión de producción del frontend.
- `yarn test`: Ejecuta las pruebas del cliente.

### En `servidor/`

- `yarn dev`: Inicia el backend en modo desarrollo.
- `yarn test`: Ejecuta las pruebas del servidor.
- `yarn coverage`: Genera el informe de cobertura de pruebas.

## Despliegue

### Backend

El backend se puede desplegar utilizando Docker. Asegúrate de tener Docker configurado correctamente:

1. En este caso el despliegue es en fly.io
2. Antes de ejecutar cualquier codigo de fly.io asegurate de tener toda la configuración

ejecuta ``` fly deploy ``` si has realizado algun cambio en la bd

### Frontend

El frontend se puede desplegar en servicios como Vercel o Netlify. Asegúrate de configurar las variables de entorno necesarias en la plataforma de despliegue.
En este caso fue desplegado en vercel.

## Contribución

1. Crea un fork del repositorio.
2. Crea una rama para tu nueva funcionalidad o corrección:

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

3. Realiza tus cambios y haz commit:

   ```bash
   git commit -m "Descripción de los cambios"
   ```

4. Sube tus cambios:

   ```bash
   git push origin feature/nueva-funcionalidad
   ```

5. Abre un Pull Request y describe tus cambios.

## Información Adicional

- **MongoDB**: Se utiliza como base de datos principal para gestionar las tareas y usuarios.
- **Zustand**: Manejo de estado en el frontend para simplificar la gestión de datos.
- **Jest**: Framework de pruebas para el backend y frontend.
- **SweetAlert2**: Librería para mostrar alertas y mensajes en el frontend.

---

Aqui te dejo el link de la aplicacion desplegada: https://gestion-pro-cliente.vercel.app/

¡Gracias por contribuir a este proyecto! Si tienes dudas o sugerencias, no dudes en abrir un issue o contactarnos directamente.
