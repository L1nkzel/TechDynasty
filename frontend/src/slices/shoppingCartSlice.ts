import { createSlice } from "@reduxjs/toolkit";
import { pricesInCart } from "../utils/shoppingCartUtils";


const cartData = localStorage.getItem("cart");
const initialState = cartData ? JSON.parse(cartData) : { cartItems: [] };

const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existItem = state.cartItems.find(
                (x: any) => x._id === item._id);

            if (existItem) {
                state.cartItems = state.cartItems.map(
                    (x: any) => x._id === existItem._id ? item : x
                )
            } else {
                state.cartItems = [...state.cartItems, item];
            }
            return pricesInCart(state);
        },
    },
});

export const { addToCart } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;