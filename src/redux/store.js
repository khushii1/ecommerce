import { configureStore } from "@reduxjs/toolkit";
import addCategorySlice from "./addCategorySlice";
import addProductSlice from "./addProductSlice";
import addToCartSlice from "./addToCartSlice";


const store = configureStore({
    reducer: {
        category: addCategorySlice,
        product: addProductSlice,
        cart: addToCartSlice,
    }
});
export default store;