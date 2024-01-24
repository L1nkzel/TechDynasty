import { createSlice } from "@reduxjs/toolkit";
import { pricesInCart } from "../utils/shoppingCartUtils";
import { ProductType } from "../components/Product";


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
    },
});

export const { addToCart } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;