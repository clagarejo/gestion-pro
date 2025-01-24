import axios from 'axios';

const apiURl = "http://localhost:4000/products";
// const apiURl = "https://server-task.fly.dev/api";

const productsApi = axios.create({
    baseURL: apiURl,
});

// Interceptor de solicitud
productsApi.interceptors.request.use(
    (config) => {
        // Agregar encabezados de autorización si se necesita
        const token = localStorage.getItem('token'); // O de donde estés obteniendo el token
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        // Otros encabezados o configuraciones
        config.headers['Content-Type'] = 'application/json';

        // Puedes también agregar un spinner de carga o cualquier otro estado aquí si lo necesitas
        console.log('Request made with config:', config);

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
        // Puedes manejar las respuestas exitosas aquí
        console.log('Response received:', response);

        return response;
    },
    (error) => {
        // Manejo global de errores
        if (error.response) {
            // Si la respuesta tiene un error (status code 4xx, 5xx)
            console.error('Response error:', error.response);
            // Mostrar algún mensaje de error o redirigir según sea necesario
        } else if (error.request) {
            // Si no se recibió respuesta del servidor
            console.error('Request error:', error.request);
        } else {
            // Otros errores
            console.error('Error', error.message);
        }

        // Si deseas, puedes redirigir al usuario a una página de login en caso de error de autorización
        if (error.response?.status === 401) {
            console.log('Session expired or unauthorized');
            // Redirigir al login o manejar según sea necesario
        }

        return Promise.reject(error);
    }
);

export default productsApi;
