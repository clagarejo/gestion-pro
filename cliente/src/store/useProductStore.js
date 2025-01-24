import { create } from 'zustand';
import productsApi from '@/api/productsApi';
import Swal from 'sweetalert2';

export const useProductStore = create((set) => ({
    products: [],
    loading: false,
    error: null,

    // Función para cargar productos
    fetchProducts: async () => {
        try {
            set({ loading: true });
            const response = await productsApi.get('/');
            set({ products: response.data });
        } catch (error) {
            set({ error: 'No se pudieron cargar los productos' });
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al cargar los productos.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        } finally {
            set({ loading: false });
        }
    },

    // Función para agregar un producto
    addProduct: async (productData) => {
        try {
            const response = await productsApi.post('/', productData);
            set((state) => ({ products: [...state.products, response.data] }));
            Swal.fire({
                title: 'Producto creado',
                text: 'El nuevo producto ha sido agregado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        } catch (error) {
            set({ error: 'Error al crear el producto' });
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al crear el producto. Por favor, intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    },

    // Función para actualizar un producto
    updateProduct: async (id, productData) => {
        try {
            const response = await productsApi.put(`/${id}`, productData);
            set((state) => ({
                products: state.products.map((product) =>
                    product._id === id ? response.data : product
                ),
            }));
            Swal.fire({
                title: 'Producto actualizado',
                text: 'Los cambios del producto se han guardado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        } catch (error) {
            set({ error: 'Error al actualizar el producto' });
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al actualizar el producto. Por favor, intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    },

    // Función para eliminar un producto
    deleteProduct: async (id) => {
        try {
            const result = await Swal.fire({
                title: "¿Estás seguro?",
                text: "Si eliminas este producto no volveras a verlo",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, eliminar",
                cancelButtonText: "No, cancelar"
            });

            if (result.isConfirmed) {
                await productsApi.delete(`/${id}`);

                set((state) => ({
                    products: state.products.filter((product) => product._id !== id),
                }));

                Swal.fire({
                    title: 'Producto eliminado',
                    text: 'El producto ha sido eliminado correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
            }
        } catch (error) {
            set({ error: 'Error al eliminar el producto' });
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al eliminar el producto. Por favor, intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    },


    //Funcion para buscar productos
    searchProductsByName: (name) => {
        set((state) => ({
            products: state.products.filter((product) =>
                product.name.toLowerCase().includes(name.toLowerCase())
            ),
        }));
    },

}));
