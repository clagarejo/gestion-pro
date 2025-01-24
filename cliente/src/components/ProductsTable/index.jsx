import { useState } from 'react';
import { ProductModal } from '../ProductModal';
import { Product } from '../Product';
import './styles.scss';

export const ProductsTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleOpenModal = (product = null) => {
        setProductToEdit(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setProductToEdit(null);
    };

    const products = [
        { name: 'Producto 1', category: 'Electrónica', price: 100, stock: 20 },
        { name: 'Producto 2', category: 'Ropa', price: 25, stock: 50 },
        { name: 'Producto 3', category: 'Alimentos', price: 15, stock: 80 },
        { name: 'Producto 4', category: 'Hogar', price: 75, stock: 10 },
        { name: 'Producto 5', category: 'Deportes', price: 45, stock: 5 },
        { name: 'Producto 6', category: 'Oficina', price: 30, stock: 25 },
        { name: 'Producto 7', category: 'Mascotas', price: 20, stock: 40 },
        { name: 'Producto 8', category: 'Juguetes', price: 50, stock: 15 },
    ];

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const paginatedProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container">
            <div className="container_bottom">
                <input
                    className="search-products"
                    type="text"
                    placeholder="Buscar productos"
                />
                <button onClick={() => handleOpenModal()}>Crear producto</button>
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
                    {paginatedProducts.map((product, index) => (
                        <Product key={index} {...product} handleOpenModal={handleOpenModal} />
                    ))}
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
