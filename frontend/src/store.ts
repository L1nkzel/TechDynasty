import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import shoppingCartSlice from './slices/shoppingCartSlice';
import authSlice from './slices/authSlice';
import loginRegisterSlice from './slices/loginRegisterSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        shoppingCart: shoppingCartSlice,
        auth: authSlice,
        loginRegister: loginRegisterSlice
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

export default store;