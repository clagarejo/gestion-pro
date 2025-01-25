import { FaCloudUploadAlt, FaPlus, FaTrash } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { ProductModal } from '../ProductModal';
import { Product } from '../Product';
import { useProductStore } from '@/store/useProductStore';
import { DarkModeToggle } from '../DarkModeToggle';
import { Spinner } from '../Spinner';

import './styles.scss';

export const ProductsTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const {
        products,
        fetchProducts,
        searchProductsByName,
        selected,
        deleteSelectedProducts,
        processJsonFile,
        toggleProductSelection 
    } = useProductStore();

    const fileInputRef = useRef(null);

    const itemsPerPage = 6;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 3000));
            await fetchProducts();
            setLoading(false);
        };

        fetchData();
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

    const handleSelectAllChange = () => {
        if (selected.length === products.length) {
            toggleProductSelection([]);
        } else {
            const allProductIds = products.map((product) => product._id);
            toggleProductSelection(allProductIds);
        }
    };

    const handleMassiveDeleteProducts = () => {
        deleteSelectedProducts(selected);
    };

    const handleFileUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Archivo seleccionado:', file.name);
            setLoading(true);
            new Promise(resolve => setTimeout(resolve, 3000))
                .then(() => processJsonFile(file))
                .finally(() => setLoading(false));
        }
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
                <div className="action-buttons">
                    <button onClick={handleFileUploadClick} className="massive-upload">
                        <FaCloudUploadAlt /> Cargar productos
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }} // Oculta el input
                        onChange={handleFileChange}
                    />
                    <button onClick={() => handleOpenModal()} className="add_product">
                        <FaPlus style={{ marginRight: '10px' }} /> Crear producto
                    </button>
                    {selected.length >= 1 && (
                        <button onClick={handleMassiveDeleteProducts} className="masive-delete">
                            <FaTrash style={{ marginRight: '10px' }} /> Eliminar productos
                        </button>
                    )}
                </div>
            </div>

            {loading && <Spinner />} {/* Muestra el spinner si `loading` es true */}

            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={selected.length === products.length} // Si el número de seleccionados es igual al total, se marca el checkbox
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

            {isModalOpen && <ProductModal product={productToEdit} onClose={handleCloseModal} />}
        </div>
    );
};
