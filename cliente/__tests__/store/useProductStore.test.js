import { useProductStore } from '@/store/useProductStore';
import productsApi from '@/api/productsApi';

jest.mock('@/api/productsApi', () => ({
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
    put: jest.fn(),
}));

describe('useProductStore', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('fetchProducts debe cargar productos correctamente', async () => {
        const productsData = [{ _id: '1', name: 'Product 1', category: 'Category', price: 1000, stock: 10 }];
        productsApi.get.mockResolvedValue({ data: productsData });
        useProductStore.setState({ products: [] });
        await useProductStore.getState().fetchProducts();
        expect(useProductStore.getState().products).toEqual(productsData);
    });

    test('fetchProducts debe manejar error al cargar productos', async () => {
        productsApi.get.mockRejectedValue(new Error('Error'));
        useProductStore.setState({ products: [] });
        await useProductStore.getState().fetchProducts();
        expect(useProductStore.getState().products).toEqual([]);
    });

    test('addProduct debe agregar un producto correctamente', async () => {
        const newProduct = { name: 'New Product', category: 'Category', price: 1000, stock: 10 };
        const productResponse = { ...newProduct, _id: '1' };
        productsApi.post.mockResolvedValue({ data: productResponse });
        await useProductStore.getState().addProduct(newProduct);
        expect(useProductStore.getState().products).toContainEqual(productResponse);
    });

});
