import { useState, useEffect } from 'react';
import { useProductStore } from '@/store/useProductStore';

export const useProducts = () => {
    const [loading, setLoading] = useState(false);
    const {
        products,
        fetchProducts,
        searchProductsByName,
        selected,
        deleteSelectedProducts,
        processJsonFile,
        toggleProductSelection,
    } = useProductStore();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchProducts();
            setLoading(false);
        };

        fetchData();
    }, [fetchProducts]);

    const searchProducts = (searchTerm) => {
        if (searchTerm) {
            searchProductsByName(searchTerm);
        } else {
            fetchProducts();
        }
    };

    const handleSelectAllChange = () => {
        if (selected.length === products.length) {
            toggleProductSelection([]);
        } else {
            const allProductIds = products.map((product) => product._id);
            allProductIds.forEach((id) => toggleProductSelection(id));
        }
    };

    const handleMassiveDeleteProducts = () => {
        setLoading(true)
        deleteSelectedProducts(selected);
        setLoading(false)

    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            processJsonFile(file);
        }
    };

    return {
        products,
        loading,
        selected,
        searchProducts,
        handleSelectAllChange,
        handleMassiveDeleteProducts,
        handleFileUpload,
    };
};
