import { useState, useEffect } from 'react';
import './styles.scss'

export const ProductModal = ({ product, onClose }) => {
    // Inicializamos los datos del producto si existe (si estamos editando un producto)
    const [formData, setFormData] = useState({
        name: product?.name || '',
        category: product?.category || '',
        price: product?.price || '',
        stock: product?.stock || ''
    });

    // Efecto para rellenar los campos con el producto al abrir el modal en modo edición
    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                category: product.category,
                price: product.price,
                stock: product.stock
            });
        } else {
            // Si no hay producto, vaciamos el formulario
            setFormData({
                name: '',
                category: '',
                price: '',
                stock: ''
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí podrías enviar los datos del formulario (crear o editar)
        console.log(product ? 'Producto editado:' : 'Producto creado:', formData);
        onClose();
    };

    return (
        <div className="modal active">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>{product ? 'Editar producto' : 'Crear producto'}</h3>
                    <button className="close-btn" onClick={onClose}>X</button>
                </div>
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
                        <button type="submit">{product ? 'Guardar cambios' : 'Crear producto'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
