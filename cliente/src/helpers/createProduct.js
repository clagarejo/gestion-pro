import productsApi from './productsApi';

const createProduct = async (productData) => {
    try {
        const response = await productsApi.post('/', productData);
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error; // Lanzar el error para manejarlo donde se llame
    }
};

export default createProduct;
