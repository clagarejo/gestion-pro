import productsApi from './productsApi';

const getProductById = async (productId) => {
    try {
        const response = await productsApi.get(`/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting product by id:', error);
        throw error; // Lanzar el error para manejarlo donde se llame
    }
};

export default getProductById;
