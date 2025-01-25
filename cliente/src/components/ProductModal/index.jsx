import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './styles.scss';
import { useProductStore } from '@/store/useProductStore';

export const ProductModal = ({ product, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock: ''
    });

    const { addProduct, updateProduct } = useProductStore();

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.product.name || '',
                category: product.product.category || '',
                price: product.product.price || '',
                stock: product.product.stock || ''
            });
        } else {
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

    const validateForm = () => {
        const { name, category, price, stock } = formData;

        if (!name.trim()) {
            Swal.fire('Ups', 'El nombre del producto es obligatorio.', 'warning');
            return false;
        }

        if (!category.trim()) {
            Swal.fire('Ups', 'La categoría del producto es obligatoria.', 'warning');
            return false;
        }

        if (price === '' || isNaN(price) || Number(price) <= 0) {
            Swal.fire('Ups', 'El precio debe ser un número positivo mayor a 0.', 'warning');
            return false;
        }

        if (stock === '' || isNaN(stock) || !Number.isInteger(Number(stock)) || Number(stock) < 0) {
            Swal.fire('Ups', 'La cantidad en stock debe ser un número entero no negativo.', 'warning');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            if (product) {
                // Si estamos editando, actualizamos el producto en el store
                updateProduct(product.product._id, formData);
            } else {
                // Si no estamos editando, agregamos un nuevo producto al store
                addProduct(formData);
            }

            onClose(); // Cierra el modal
        } catch (error) {
            console.error('Error al crear o actualizar el producto:', error);
            Swal.fire('Error', 'Hubo un problema al procesar tu solicitud.', 'error');
        }
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
