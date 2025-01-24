import { FaPlus } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { ProductModal } from '../ProductModal';
import { Product } from '../Product';
import { useProductStore } from '@/store/useProductStore';
import Swal from 'sweetalert2';

import './styles.scss';

export const ProductsTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const { products, fetchProducts, deleteProduct, searchProductsByName, loading } = useProductStore();

    const itemsPerPage = 5;

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        if (searchTerm) {
            searchProductsByName(searchTerm);
        } else {
            fetchProducts();
        }
    }, [searchTerm, fetchProducts, searchProductsByName]);

    const handleOpenModal = (product = null) => {
        setProductToEdit(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setProductToEdit(null);
    };

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const paginatedProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDeleteProduct = (productId) => {
        deleteProduct(productId);
        Swal.fire('¡Eliminado!', 'El producto ha sido eliminado correctamente.', 'success');
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="container">
            <div className="container_bottom">
                <input
                    className="search-products"
                    type="text"
                    placeholder="Buscar productos"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button onClick={() => handleOpenModal()}>
                    <FaPlus style={{ marginRight: '10px' }} /> Crear producto
                </button>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre del Producto</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th style={{ textAlign: 'center' }}>Cantidad en Stock</th>
                        <th style={{ textAlign: 'center' }}>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    { paginatedProducts.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="no-products">
                                No hay productos para mostrar, crea uno.
                            </td>
                        </tr>
                    ) : (
                        paginatedProducts.map((product, index) => (
                            <Product
                                key={product._id || index}
                                product={product}
                                handleOpenModal={handleOpenModal}
                                handleDeleteProduct={handleDeleteProduct}
                            />
                        ))
                    )}
                </tbody>
            </table>

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {isModalOpen && (
                <ProductModal
                    product={productToEdit}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};
