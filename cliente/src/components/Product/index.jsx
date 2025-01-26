import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './styles.scss';
import { useProductStore } from '@/store/useProductStore';

export const Product = ({ product, handleOpenModal }) => {
    const { _id: productId, name, category, price, stock } = product;
    const { deleteProduct } = useProductStore();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleDeleteProduct = () => {
        console.log(productId, 'al eliminar')
        deleteProduct(productId);
    };

    return (
        <tr>
            <td>{name}</td>
            <td>{category}</td>
            <td>{formatPrice(price)}(COP)</td>
            <td>{stock}</td>
            {product && (
                <td className="tr-options">
                    <button
                        className="button-options editBottom"
                        onClick={() => handleOpenModal({ product })}
                    >
                        <FaEdit />
                    </button>
                    <button
                        className="button-options deleteBottom"
                        onClick={handleDeleteProduct}
                    >
                        <FaTrash />
                    </button>
                </td>
            )}
        </tr>
    );
};
