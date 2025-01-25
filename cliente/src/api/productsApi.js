import axios from 'axios';

const apiURL = "http://localhost:4000/api/products";

// const apiURL = "https://getion-pro.fly.dev/api/products";

const productsApi = axios.create({
    baseURL: apiURL,
});

// Interceptor de solicitud
productsApi.interceptors.request.use(
    (config) => {
        // Agregar encabezados o configuraciones si es necesario
        config.headers['Content-Type'] = 'application/json';

        // Puedes agregar un spinner de carga o cualquier otro estado aquí si lo necesitas
        // console.log('Request made with config:', config);

        return config;
    },
    (error) => {
        // Manejar errores de solicitud antes de que lleguen a la respuesta
        return Promise.reject(error);
    }
);

// Interceptor de respuesta
productsApi.interceptors.response.use(
    (response) => {
        // Manejo de respuestas exitosas
        // console.log('Response received:', response);
        return response;
    },
    (error) => {
        // Manejo global de errores
        if (error.response) {
            // Si la respuesta tiene un error (status code 4xx, 5xx)
            console.error('Response error:', error.response);
        } else if (error.request) {
            // Si no se recibió respuesta del servidor
            console.error('Request error:', error.request);
        } else {
            // Otros errores
            console.error('Error', error.message);
        }

        return Promise.reject(error);
    }
);

export default productsApi;
