import { CATEGORIES_URL, PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getProductById: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        getProductsByCategory: builder.query({
            query: (category) => ({
                url: `${CATEGORIES_URL}/${category}`,
            }),
            keepUnusedDataFor: 5,
        })
    })
});


export const { useGetProductsQuery, useGetProductByIdQuery, useGetProductsByCategoryQuery } = productsApiSlice;

