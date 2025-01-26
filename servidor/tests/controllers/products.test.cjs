const { getProducts, createProduct, updateProduct, deleteProduct } = require('../../controllers/products');
const Product = require('../../models/Product');

jest.mock('../../models/Product');

describe('Pruebas para la función getProducts', () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test('debería devolver error si ocurre un problema al obtener los productos', async () => {
        Product.find = jest.fn().mockRejectedValue(new Error('Error en la base de datos'));

        await getProducts(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener los productos' });
    });
});

describe('Pruebas para la función createProduct', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                name: 'Producto 1',
                category: 'Categoría 1',
                price: 100,
                stock: 10,
                isSelected: true
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test('debería devolver error si faltan campos requeridos', async () => {
        req.body.name = ''; 

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Todos los campos son requeridos' });
    });

    test('debería devolver error si ocurre un problema al crear el producto', async () => {
        Product.prototype.save = jest.fn().mockRejectedValue(new Error('Error al guardar el producto'));

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error al crear el producto' });
    });
});

describe('Pruebas para la función updateProduct', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: { id: '123' },
            body: {
                name: 'Producto actualizado',
                category: 'Categoría actualizada',
                price: 150,
                stock: 20
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test('debería devolver error si el producto no se encuentra', async () => {
        Product.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

        await updateProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Producto no encontrado' });
    });


    test('debería devolver error si ocurre un problema al actualizar el producto', async () => {
        Product.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Error al actualizar el producto'));

        await updateProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error al actualizar el producto' });
    });
});

describe('Pruebas para la función deleteProduct', () => {
    let req, res;

    beforeEach(() => {
        req = { params: { id: '123' } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test('debería devolver error si el producto no se encuentra', async () => {
        Product.findByIdAndDelete = jest.fn().mockResolvedValue(null);

        await deleteProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Producto no encontrado' });
    });

    test('debería devolver error si ocurre un problema al eliminar el producto', async () => {
        Product.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Error al eliminar el producto'));

        await deleteProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error al eliminar el producto' });
    });
});
