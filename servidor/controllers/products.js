const Product = require('../models/Product'); 

const getProducts = async (req, res) => {
    try {
        const products = await Product.find(); 
        res.json(products); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los productos" });
    }
};

const createProduct = async (req, res) => {
    const { name, category, price, stock, isSelected } = req.body;
    if (!name || !category || !price || !stock) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    try {
        const newProduct = new Product({ name, category, price, stock, isSelected });
        await newProduct.save();
        res.status(201).json(newProduct); // Devuelve el producto creado
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el producto" });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, category, price, stock } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, category, price, stock },
            { new: true } 
        );
        if (!updatedProduct) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el producto" });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json({ message: "Producto eliminado correctamente", id: deletedProduct._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
};

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};
