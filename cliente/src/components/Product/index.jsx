import { FaEdit, FaTrash } from 'react-icons/fa';
import { useProductStore } from '@/store/useProductStore';
import './styles.scss';

export const Product = ({ product, handleOpenModal }) => {
    const productId = product._id;
    const { name, category, price, stock } = product;
    const { deleteProduct } = useProductStore();

    const handleDelete = () => {
        deleteProduct(productId);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0, // Evitar decimales si el precio es entero
        }).format(price);
    };

    return (
        <tr>
            <td>{name}</td>
            <td>{category}</td>
            <td>{formatPrice(price)}(cop)</td>
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
