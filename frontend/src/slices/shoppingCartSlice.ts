import { createSlice } from "@reduxjs/toolkit";
import { pricesInCart } from "../utils/shoppingCartUtils";
import { ProductType } from "../types";


const cartData = localStorage.getItem("cart");
const initialState = cartData ? JSON.parse(cartData) : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {
        addToCart: (state: any, action) => {
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
        updateCartItemQty: (state: any, action) => {
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
        removeFromCart: (state: any, action) => {
            state.cartItems = state.cartItems.filter(
                (x: ProductType) => x._id !== action.payload
            )
            return pricesInCart(state);
        },
        saveShippingAddress: (state: any, action) => {
            state.shippingAddress = action.payload;
            return pricesInCart(state);
        },
        savePaymentMethod: (state: any, action) => {
            state.paymentMethod = action.payload;
            return pricesInCart(state);
        },
        resetCart: (state) => {
            state.cartItems = [];
            state.shippingAddress = {};
        },
        
    },
});

export const { addToCart, updateCartItemQty, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems, resetCart } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;