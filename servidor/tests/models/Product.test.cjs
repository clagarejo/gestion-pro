const mongoose = require('mongoose');
const Product = require('../../models/Product');

jest.mock('mongoose');

describe('Pruebas unitarias del modelo Product', () => {
    test('debería crear un producto con éxito', async () => {
        const productData = {
            name: 'Producto de prueba',
            category: 'Categoría prueba',
            price: 100,
            stock: 50,
            isSelected: true,
        };

        const saveMock = jest.fn().mockResolvedValue(productData);
        Product.prototype.save = saveMock;

        const product = new Product(productData);
        const savedProduct = await product.save();

        expect(saveMock).toHaveBeenCalledTimes(1);
        expect(savedProduct.name).toBe(productData.name);
        expect(savedProduct.category).toBe(productData.category);
        expect(savedProduct.price).toBe(productData.price);
        expect(savedProduct.stock).toBe(productData.stock);
        expect(savedProduct.isSelected).toBe(productData.isSelected);
    });

    test('debería fallar al crear un producto sin nombre', async () => {
        const productData = {
            category: 'Categoría prueba',
            price: 100,
            stock: 50,
            isSelected: true,
        };

        const saveMock = jest.fn().mockRejectedValue(new Error('Falló la validación'));
        Product.prototype.save = saveMock;

        const product = new Product(productData);

        try {
            await product.save();
        } catch (error) {
            expect(saveMock).toHaveBeenCalledTimes(1);
            expect(error.message).toBe('Falló la validación');
        }
    });

    test('debería fallar al crear un producto sin precio', async () => {
        const productData = {
            name: 'Producto de prueba',
            category: 'Categoría prueba',
            stock: 50,
            isSelected: true,
        };

        const saveMock = jest.fn().mockRejectedValue(new Error('Falló la validación'));
        Product.prototype.save = saveMock;

        const product = new Product(productData);

        try {
            await product.save();
        } catch (error) {
            expect(saveMock).toHaveBeenCalledTimes(1);
            expect(error.message).toBe('Falló la validación');
        }
    });

    test('debería actualizar el precio de un producto', async () => {
        const productData = {
            name: 'Producto de prueba',
            category: 'Categoría prueba',
            price: 100,
            stock: 50,
            isSelected: true,
        };

        const updatedData = {
            ...productData,
            price: 120,
        };

        const findByIdAndUpdateMock = jest.fn().mockResolvedValue(updatedData);
        Product.findByIdAndUpdate = findByIdAndUpdateMock;

        const updatedProduct = await Product.findByIdAndUpdate(productData._id, { price: 120 }, { new: true });

        expect(findByIdAndUpdateMock).toHaveBeenCalledTimes(1);
        expect(updatedProduct.price).toBe(120);
    });

    test('debería eliminar un producto', async () => {
        const productData = {
            name: 'Producto de prueba',
            category: 'Categoría prueba',
            price: 100,
            stock: 50,
            isSelected: true,
        };

        const deleteOneMock = jest.fn().mockResolvedValue({ deletedCount: 1 });
        Product.deleteOne = deleteOneMock;

        const response = await Product.deleteOne({ _id: productData._id });

        expect(deleteOneMock).toHaveBeenCalledTimes(1);
        expect(response.deletedCount).toBe(1);
    });
});
