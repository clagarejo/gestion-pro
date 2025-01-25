import React, { useState, useRef } from 'react';
import { ProductModal } from '../ProductModal';
import { Product } from '../Product';
import { DarkModeToggle } from '../DarkModeToggle';
import { Spinner } from '../Spinner';
import { useProducts } from '@/hooks/useProducts';
import { Pagination } from './Pagination';
import { ActionButtons } from './ActionButtons';

import './styles.scss';

export const ProductsTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const {
        products,
        selected,
        loading,
        searchProducts,
        handleSelectAllChange,
        handleMassiveDeleteProducts,
        handleFileUpload
    } = useProducts();

    const fileInputRef = useRef(null);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(products.length / itemsPerPage);


    const paginatedProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleOpenModal = (product = null) => {
        setProductToEdit(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setProductToEdit(null);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        searchProducts(e.target.value);
    };

    return (
        <div className="container">
            <header className="container_header">
                <h1>Gestión Pro</h1>
                <DarkModeToggle />
            </header>

            <div className="container_bottom">
                <input
                    className="search-products"
                    type="text"
                    placeholder="Buscar productos"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <ActionButtons
                    handleFileUpload={handleFileUpload}
                    handleOpenModal={handleOpenModal}
                    handleMassiveDeleteProducts={handleMassiveDeleteProducts}
                    fileInputRef={fileInputRef}
                    selected={selected}
                />
            </div>

            {loading && <Spinner />}

            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={selected.length === products.length}
                                onChange={handleSelectAllChange}
                            />
                        </th>
                        <th>Nombre del Producto</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Cantidad en Stock</th>
                        {products.length > 0 && <th>Opciones</th>}
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

            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />

            {isModalOpen && <ProductModal product={productToEdit} onClose={handleCloseModal} />}
        </div>
    );
};
