import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import shoppingCartSlice from './slices/shoppingCartSlice';
import authSlice from './slices/authSlice';
import loginRegisterSlice from './slices/loginRegisterSlice';
import orderSlice from './slices/orderSlice';


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        shoppingCart: shoppingCartSlice,
        auth: authSlice,
        loginRegister: loginRegisterSlice,
        order: orderSlice 
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>

export default store;
