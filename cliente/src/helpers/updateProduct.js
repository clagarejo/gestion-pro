import productsApi from './productsApi';

const updateProduct = async (productId, updatedData) => {
    try {
        const response = await productsApi.put(`/${productId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error; // Lanzar el error para manejarlo donde se llame
    }
};

export default updateProduct;
