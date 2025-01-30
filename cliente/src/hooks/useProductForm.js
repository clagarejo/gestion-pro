import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export const useProductForm = (product) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock: ''
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                category: product.category || '',
                price: product.price || '',
                stock: product.stock || ''
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

    return { formData, setFormData, handleChange, validateForm };
};
