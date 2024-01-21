import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import shoppingCartSlice from './slices/shoppingCartSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        shoppingCart: shoppingCartSlice,
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

export default store;