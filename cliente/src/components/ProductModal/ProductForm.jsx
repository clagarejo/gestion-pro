export const ProductForm = ({ formData, handleChange, handleSubmit }) => (
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="name">Nombre del producto:</label>
            <input
                placeholder="Nombre del producto"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />
        </div>
        <div className="form-group">
            <label htmlFor="category">Categoría:</label>
            <input
                placeholder="Categoría del producto"
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
            />
        </div>
        <div className="form-group">
            <label htmlFor="price">Precio:</label>
            <input
                placeholder="Precio del producto"
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
            />
        </div>
        <div className="form-group">
            <label htmlFor="stock">Cantidad en stock:</label>
            <input
                placeholder="Stock del producto"
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
            />
        </div>
        <div className="modal-footer">
            <button type="submit">Guardar</button>
        </div>
    </form>
);
