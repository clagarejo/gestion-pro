import { create } from 'zustand';
import productsApi from '@/api/productsApi';
import Swal from 'sweetalert2';

export const useProductStore = create((set) => ({
    products: [],
    loading: false,
    error: null,
    selected: [],

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
    addProduct: async (newProduct) => {
        try {
            const productWithSelection = { ...newProduct, isSelected: false };
            const response = await productsApi.post('/', productWithSelection);
            const createdProduct = response.data;

            set((state) => ({
                products: [...state.products, createdProduct],
            }));

            Swal.fire({
                title: "Producto agregado",
                text: "El producto se ha agregado correctamente.",
                icon: "success",
                confirmButtonText: "Aceptar",
            });
        } catch (error) {
            console.error("Error agregando el producto:", error);

            Swal.fire({
                title: "Error",
                text: "Hubo un problema al agregar el producto. Por favor, intenta nuevamente.",
                icon: "error",
                confirmButtonText: "Aceptar",
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

    // Funcion para añadir los id al selected
    toggleProductSelection: (productIds) => {
        set((state) => {
            let updatedSelected = [...state.selected];

            if (Array.isArray(productIds)) {
                // Si `productIds` es un array, seleccionamos o deseleccionamos todos
                const allSelected = productIds.every((id) => state.selected.includes(id));

                if (allSelected) {
                    // Si todos ya están seleccionados, deseleccionamos todos
                    updatedSelected = state.selected.filter((id) => !productIds.includes(id));
                } else {
                    // Si no todos están seleccionados, seleccionamos todos
                    updatedSelected = [...new Set([...state.selected, ...productIds])];
                }
            } else {
                // Si `productIds` es un único ID, seleccionamos o deseleccionamos el producto
                const isSelected = state.selected.includes(productIds);
                updatedSelected = isSelected
                    ? state.selected.filter((id) => id !== productIds)
                    : [...state.selected, productIds];
            }

            return { selected: updatedSelected };
        });
    },


    // Función para eliminar los productos seleccionados
    deleteSelectedProducts: async (ids) => {
        try {
            console.log(ids, 'a ver cuantos hay');
            if (ids.length === 0) {
                Swal.fire({
                    title: 'No hay productos seleccionados',
                    text: 'Por favor, selecciona productos para eliminar.',
                    icon: 'warning',
                    confirmButtonText: 'Aceptar',
                });
                return;
            }

            const result = await Swal.fire({
                title: "¿Estás seguro?",
                text: "Si eliminas estos productos no podrás recuperarlos.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "No, cancelar"
            });

            if (result.isConfirmed) {
                // Eliminar los productos de la base de datos usando los ids pasados como parámetro
                await Promise.all(
                    ids.map((productId) =>
                        productsApi.delete(`/${productId}`)
                    )
                );

                set((state) => ({
                    products: state.products.filter((product) =>
                        !ids.includes(product._id)  // Filtrar los productos eliminados
                    ),
                    selected: []  // Limpiar el array de productos seleccionados
                }));

                Swal.fire({
                    title: 'Productos eliminados',
                    text: 'Los productos seleccionados han sido eliminados correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
            }
        } catch (error) {
            set({ error: 'Error al eliminar los productos' });
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al eliminar los productos. Por favor, intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    },

    // Funcion para buscar productos
    searchProductsByName: (name) => {
        set((state) => ({
            products: state.products.filter((product) =>
                product.name.toLowerCase().includes(name.toLowerCase())
            ),
        }));
    },

    // Función para procesar archivo .json
    processJsonFile: async (file) => {
        const reader = new FileReader();

        reader.onload = async () => {
            try {
                const data = JSON.parse(reader.result);
                // Asegurarse de que los datos son un array y agregar el campo `isSelected` como false
                const processedProducts = data.map((product) => ({
                    ...product,
                    isSelected: false,
                }));

                // Guardar los productos procesados en la base de datos
                await Promise.all(
                    processedProducts.map(async (product) => {
                        await productsApi.post('/', product);  // Guardamos cada producto individualmente
                    })
                );

                set((state) => ({
                    products: [...state.products, ...processedProducts],  // Actualizamos el estado de los productos
                }));

                Swal.fire({
                    title: 'Productos cargados',
                    text: 'Los productos del archivo se han agregado correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
            } catch (error) {
                console.error("Error al procesar el archivo:", error);
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al procesar el archivo. Asegúrate de que el archivo es válido.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        };

        reader.onerror = (error) => {
            console.error("Error leyendo el archivo:", error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al leer el archivo.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        };

        reader.readAsText(file);
    },

}));
