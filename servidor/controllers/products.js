const getProducts = (req, res) => {
    // Lógica para obtener todos los productos
    res.json({ msg: 'Obtener todos los productos' });
};

const getProductById = (req, res) => {
    const { id } = req.params;
    // Lógica para obtener un producto por ID
    res.json({ msg: `Obtener producto con ID ${id}` });
};

const createProduct = (req, res) => {
    const { name, category, price, stock } = req.body;
    // Lógica para crear un producto
    res.json({ msg: 'Producto creado', data: { name, category, price, stock } });
};

const updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, category, price, stock } = req.body;
    // Lógica para actualizar un producto
    res.json({ msg: `Producto con ID ${id} actualizado`, data: { name, category, price, stock } });
};

const deleteProduct = (req, res) => {
    const { id } = req.params;
    // Lógica para eliminar un producto
    res.json({ msg: `Producto con ID ${id} eliminado` });
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
