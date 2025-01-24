import { FaEdit, FaTrash } from 'react-icons/fa';
import { useProductStore } from '@/store/useProductStore';
import './styles.scss';

export const Product = ({ product, handleOpenModal }) => {
    const productId = product._id
    const { name, category, price, stock } = product
    const { deleteProduct } = useProductStore();

    const handleDelete = () => {
        deleteProduct(productId);  
    };

    return (
        <tr>
            <td>{name}</td>
            <td>{category}</td>
            <td>${price}</td>
            <td style={{ textAlign: 'center' }}>{stock}</td>
            <td className="tr-options">
                <button
                    className="button-options editBottom"
                    onClick={() => handleOpenModal({ product })}
                >
                    <FaEdit />
                </button>
                <button
                    className="button-options deleteBottom"
                    onClick={handleDelete}  // Llamamos a handleDelete al hacer clic
                >
                    <FaTrash />
                </button>
            </td>
        </tr>
    );
};
