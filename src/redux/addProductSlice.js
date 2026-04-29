import { createSlice } from "@reduxjs/toolkit"

const initialValue = {
    products: localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : []
}
const addProductSlice = createSlice({
    name: "product",
    initialState: initialValue,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
            localStorage.setItem("products", JSON.stringify(state.products));
        },
        updateProduct: (state, action) => {
            const { id, data } = action.payload;
            state.products = state.products.map((product) =>
                product.id === id ? { ...product, ...data } : product
            );
            localStorage.setItem("products", JSON.stringify(state.products));
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter((product) => product.id !== action.payload);
            localStorage.setItem("products", JSON.stringify(state.products));
        },
    }
})
export const { addProduct, updateProduct, deleteProduct } = addProductSlice.actions;
export default addProductSlice.reducer;