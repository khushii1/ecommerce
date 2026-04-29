import { createSlice } from "@reduxjs/toolkit";
const initalValue = {
    items: localStorage.getItem("categories") ? JSON.parse(localStorage.getItem("categories")) : [],

}

const addCategorySlice = createSlice({
    name: "addCategory",
    initialState: initalValue,
    reducers: {
        addCategory(state, action) {
            state.items.push(action.payload);
            localStorage.setItem("categories", JSON.stringify(state.items));
        },
        updateCategory(state, action) {
            const { id, data } = action.payload;
            state.items = state.items.map((cat) =>
                cat.id === id ? { ...cat, ...data } : cat
            );
            localStorage.setItem("categories", JSON.stringify(state.items));
        },
        deleteCategory(state, action) {
            state.items = state.items.filter((cat) => cat.id !== action.payload);
            localStorage.setItem("categories", JSON.stringify(state.items));
        },

    },
})
export const { addCategory, updateCategory, deleteCategory } = addCategorySlice.actions;
export default addCategorySlice.reducer;

