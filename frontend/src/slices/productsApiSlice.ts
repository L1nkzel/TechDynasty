import { CATEGORIES_URL, PRODUCTS_URL, UPLOAD_IMAGE_URL } from "../constants";
import { ProductType } from "../types";
import { apiSlice } from "./apiSlice";


export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getProductById: builder.query({
            query: (productId: ProductType) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Product'],
        }),
        getProductsByCategory: builder.query({
            query: (category: ProductType) => ({
                url: `${CATEGORIES_URL}/${category}`,
            }),
            keepUnusedDataFor: 5,
        }),
        addProduct: builder.mutation({
            query: (product: ProductType) => ({
                url: PRODUCTS_URL,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Product'],
        }),
        editProduct: builder.mutation({
            query: (product: ProductType) => ({
                url: `${PRODUCTS_URL}/${product._id}`,
                method: "PUT",
                body: product
            }),
            invalidatesTags: ['Product'],
        }),
        uploadProductImage: builder.mutation({
            query: (image: ProductType) => ({
                url: UPLOAD_IMAGE_URL,
                method: "POST",
                body: image
            })
        })
    })
});


export const { useGetProductsQuery, useGetProductByIdQuery, useGetProductsByCategoryQuery, useAddProductMutation, useEditProductMutation, useUploadProductImageMutation } = productsApiSlice;

