import { createSlice } from "@reduxjs/toolkit";
import { pricesInCart } from "../utils/shoppingCartUtils";
import { ProductType } from "../types";


const cartData = localStorage.getItem("cart");
const initialState = cartData ? JSON.parse(cartData) : { cartItems: [] };

const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existingItem = state.cartItems.find(
                (x: ProductType) => x._id === item._id);

            if (existingItem) {
                state.cartItems = state.cartItems.map(
                    (x: any) => x._id === existingItem._id ? { ...x, qty: x.qty + item.qty } : x
                )
            } else {
                state.cartItems = [...state.cartItems, item];
            }
            return pricesInCart(state);
        },
        updateCartItemQty : (state, action) => {
            const item = action.payload;

            const existingItem = state.cartItems.find(
                (x: ProductType) => x._id === item._id);

            if (existingItem) {
                state.cartItems = state.cartItems.map(
                    (x: ProductType) => x._id === existingItem._id ? item : x
                )
            } else {
                state.cartItems = [...state.cartItems, item];
            }
            return pricesInCart(state);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (x: ProductType) => x._id !== action.payload
            )
            return pricesInCart(state);
        }
    },
});

export const { addToCart, updateCartItemQty, removeFromCart } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;