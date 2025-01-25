import { FaEdit, FaTrash } from 'react-icons/fa';
import './styles.scss';
import { useProductStore } from '@/store/useProductStore';

export const Product = ({ product, handleOpenModal }) => {
    const productId = product._id;
    const { name, category, price, stock } = product;
    const { selected, toggleProductSelection, deleteProduct } = useProductStore();

    const handleCheckboxChange = () => {
        toggleProductSelection(productId);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleDeleteProduct = () => {
        deleteProduct(productId);
    };

    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    checked={selected.includes(productId)}
                    onChange={handleCheckboxChange}
                />
            </td>
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
