import { FaEdit, FaTrash } from 'react-icons/fa';
import './styles.scss'

export const Product = ({ name, category, price, stock, handleOpenModal }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{category}</td>
            <td>${price}</td>
            <td style={{ textAlign: 'center' }}>{stock}</td>
            <td className="tr-options">
                <button className="button-options editBottom" onClick={() => handleOpenModal({ name, category, price, stock })}>
                    <FaEdit />
                </button>
                <button className="button-options deleteBottom">
                    <FaTrash />
                </button>
            </td>
        </tr>
    );
};
