import productsApi from './productsApi';

const getProducts = async () => {
    try {
        const response = await productsApi.get('/');
        return response.data;
    } catch (error) {
        console.error('Error getting products:', error);
        throw error; // Lanzar el error para manejarlo donde se llame
    }
};

export default getProducts;
