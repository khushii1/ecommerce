import { createSlice } from "@reduxjs/toolkit";

const initalValue = {
    items: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
}
const addToCartSlice = createSlice({
    name: "addToCart",
    initialState: initalValue,
    reducers: {
        addToCart(state, action) {
            const existing = state.items.find((item) => item.id === action.payload.id);

            if (existing) {
                state.items = state.items.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            } else {
                state.items.push({ ...action.payload, qty: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        removeFromCart(state, action) {
            state.items = state.items.filter((item) => item.id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        updateQty(state, action) {
            const { id, qty } = action.payload;
            state.items = state.items.map((item) =>
                item.id === id ? { ...item, qty } : item
            );
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
    },
})
export const { addToCart, removeFromCart, updateQty } = addToCartSlice.actions;
export default addToCartSlice.reducer;