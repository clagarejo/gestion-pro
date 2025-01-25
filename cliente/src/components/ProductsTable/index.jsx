import { FaPlus, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { ProductModal } from '../ProductModal';
import { Product } from '../Product';
import { useProductStore } from '@/store/useProductStore';
import { DarkModeToggle } from '../DarkModeToggle';

import './styles.scss';

export const ProductsTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const { products, fetchProducts, searchProductsByName, selected, deleteSelectedProducts } = useProductStore();

    const itemsPerPage = 6;

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

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleMassiveDeleteProducts = () => {
        deleteSelectedProducts(selected)
    }

    return (
        <div className="container">
            <header>
                <h1> Gestión Pro </h1>
            </header>

            <DarkModeToggle />
            <div className="container_bottom">
                <input
                    className="search-products"
                    type="text"
                    placeholder="Buscar productos"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <div>
                    <button onClick={() => handleOpenModal()}>
                        <FaPlus style={{ marginRight: '10px' }} /> Crear producto
                    </button>
                    
                    {
                        selected.length >= 1 && (

                            <button onClick={handleMassiveDeleteProducts} className="masive_delete">
                                <FaTrash style={{ marginRight: '10px' }} /> Eliminar productos
                            </button>

                        )
                    }
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Sel. todo</th>
                        <th>Nombre del Producto</th>
                        <th>Categoría</th>
                        <th className="aling-text">Precio</th>
                        <th className="aling-text">Cantidad en Stock</th>
                        {products.length > 0 && (
                            <th className="aling-text">Opciones</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {paginatedProducts.length === 0 ? (
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
