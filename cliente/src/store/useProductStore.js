import { create } from 'zustand';
import productsApi from '@/api/productsApi';
import Swal from 'sweetalert2';

export const useProductStore = create((set) => ({
    products: [],
    loading: false,
    error: null,
    selected: [],

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
                confirmButtonText: 'Aceptar',
            });
        } finally {
            set({ loading: false });
        }
    },

    addProduct: async (newProduct) => {
        try {
            set({ loading: true });
            const productWithSelection = { ...newProduct, isSelected: false };
            const response = await productsApi.post('/', productWithSelection);
            const createdProduct = response.data;

            set((state) => ({
                products: [...state.products, createdProduct],
            }));

            Swal.fire({
                title: 'Producto agregado',
                text: 'El producto se ha agregado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
            });
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al agregar el producto. Por favor, intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        } finally {
            set({ loading: false });
        }
    },

    updateProduct: async (id, productData) => {
        try {
            set({ loading: true });
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
                confirmButtonText: 'Aceptar',
            });
        } catch (error) {
            set({ error: 'Error al actualizar el producto' });
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al actualizar el producto. Por favor, intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        } finally {
            set({ loading: false });
        }
    },

    deleteProduct: async (id) => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'Si eliminas este producto no volverás a verlo.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'No, cancelar',
            });

            if (result.isConfirmed) {
                set({ loading: true });
                await productsApi.delete(`/${id}`);
                set((state) => ({
                    products: state.products.filter((product) => product._id !== id),
                }));

                Swal.fire({
                    title: 'Producto eliminado',
                    text: 'El producto ha sido eliminado correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                });
            }
        } catch (error) {
            set({ error: 'Error al eliminar el producto' });
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al eliminar el producto. Por favor, intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        } finally {
            set({ loading: false });
        }
    },

    searchProductsByName: (name) => {
        set((state) => ({
            products: state.products.filter((product) =>
                product.name.toLowerCase().includes(name.toLowerCase())
            ),
        }));
    },

    processJsonFile: async (file) => {
        const reader = new FileReader();

        reader.onload = async () => {
            try {
                const data = JSON.parse(reader.result);
                if (!Array.isArray(data)) {
                    throw new Error('El archivo debe contener un array de productos.');
                }

                const processedProducts = data.map((product) => ({
                    ...product,
                    isSelected: false,
                }));

                set({ loading: true });

                // Espera a que se guarden todos los productos antes de actualizar el estado
                const createdProducts = await Promise.all(
                    processedProducts.map(async (product) => {
                        const response = await productsApi.post('/', product);
                        return response.data; // Asegúrate de que la respuesta contiene el producto con el ID
                    })
                );

                // Una vez que los productos hayan sido creados, actualiza el estado con los datos correctos
                set((state) => ({
                    products: [...state.products, ...createdProducts],
                }));

                Swal.fire({
                    title: 'Productos cargados',
                    text: 'Los productos del archivo se han agregado correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                });

            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: error.message || 'Hubo un problema al procesar el archivo. Asegúrate de que el archivo es válido.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                });
            } finally {
                set({ loading: false });
            }
        };

        reader.onerror = () => {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al leer el archivo.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        };

        reader.readAsText(file);
    },

}));
