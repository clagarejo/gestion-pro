import { useState, useEffect } from 'react';
import { useProductStore } from '@/store/useProductStore';

export const useProducts = () => {
    const [loading, setLoading] = useState(false);
    const {
        products,
        fetchProducts,
        searchProductsByName,
        selected,
        processJsonFile,
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
        handleFileUpload,
    };
};
