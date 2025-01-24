import productsApi from './productsApi';

const deleteProduct = async (productId) => {
    try {
        const response = await productsApi.delete(`/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error; // Lanzar el error para manejarlo donde se llame
    }
};

export default deleteProduct;
