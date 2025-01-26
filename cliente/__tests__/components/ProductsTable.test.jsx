import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProductsTable } from '@/components/ProductsTable';
import { useProducts } from '@/hooks/useProducts';
// import '@testing-library/jest-dom/extend-expect';

// Mocking el hook useProducts
jest.mock('@/hooks/useProducts', () => ({
    useProducts: jest.fn(),
}));

describe('ProductsTable', () => {
    const mockSearchProducts = jest.fn();
    const mockHandleFileUpload = jest.fn();

    beforeEach(() => {
        useProducts.mockReturnValue({
            products: [
                { _id: '1', name: 'Producto 1', category: 'Categoría 1', price: '10', stock: '100' },
                { _id: '2', name: 'Producto 2', category: 'Categoría 2', price: '20', stock: '50' },
            ],
            selected: [],
            loading: false,
            searchProducts: mockSearchProducts,
            handleFileUpload: mockHandleFileUpload,
        });
    });

    test('debe manejar el cambio en el input de búsqueda', () => {
        render(<ProductsTable />);

        const searchInput = screen.getByPlaceholderText('Buscar productos');
        fireEvent.change(searchInput, { target: { value: 'Producto 1' } });

        expect(mockSearchProducts).toHaveBeenCalledWith('Producto 1');
    });


    test('debe coincidir con el snapshot', () => {
        const { asFragment } = render(<ProductsTable />);
        expect(asFragment()).toMatchSnapshot();
    });
});
