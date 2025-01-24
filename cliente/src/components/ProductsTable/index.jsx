import { useState, useEffect } from 'react';
import { ProductModal } from '../ProductModal';
import { Product } from '../Product';
import './styles.scss';
import { useProductStore } from '@/store/useProductStore';
import Swal from 'sweetalert2';  // Importamos SweetAlert2

export const ProductsTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');  // Estado para almacenar el término de búsqueda
    const { products, fetchProducts, deleteProduct, searchProductsByName } = useProductStore(); // Asegúrate de tener deleteProduct en tu store

    const itemsPerPage = 5;

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        if (searchTerm) {
            searchProductsByName(searchTerm);  // Llamamos a la función de búsqueda
        } else {
            fetchProducts();  // Si no hay búsqueda, traemos todos los productos
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
        deleteProduct(productId);  // Eliminar el producto directamente
        Swal.fire('¡Eliminado!', 'El producto ha sido eliminado correctamente.', 'success');
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);  // Actualizamos el término de búsqueda
    };

    return (
        <div className="container">
            <div className="container_bottom">
                <input
                    className="search-products"
                    type="text"
                    placeholder="Buscar productos"
                    value={searchTerm}  // Enlazamos el valor del input con el estado searchTerm
                    onChange={handleSearchChange}  // Llamamos a la función para actualizar el estado
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
                        <Product
                            key={product._id || index}
                            product={product}
                            handleOpenModal={handleOpenModal}
                            handleDeleteProduct={handleDeleteProduct}  // Pasamos la función de eliminación
                        />
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
