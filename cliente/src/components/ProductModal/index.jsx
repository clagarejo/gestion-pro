import React from 'react';
import { useProductForm } from '@/hooks/useProductForm';
import { ProductForm } from './ProductForm';
import { useProductStore } from '@/store/useProductStore';
import './styles.scss';

export const ProductModal = ({ product, onClose }) => {
    const { formData, handleChange, validateForm } = useProductForm(product);
    const { addProduct, updateProduct } = useProductStore();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            if (product) {
                updateProduct(product.product._id, formData);
            } else {
                addProduct(formData);
            }

            onClose();
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
                <ProductForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};
