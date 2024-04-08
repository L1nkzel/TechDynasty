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
        getPopularProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/popular`,
            }),
            keepUnusedDataFor: 5,
            provideTags : ['Product'],
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
        deleteProduct: builder.mutation({
            query: (productId: ProductType) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: "DELETE"
            }),
            providesTags: ['Product'],
        }),
        uploadProductImage: builder.mutation({
            query: (image: ProductType) => ({
                url: UPLOAD_IMAGE_URL,
                method: "POST",
                body: image
            })
        }),
        addReview : builder.mutation({
            query: (product: any) => ({
                url: `${PRODUCTS_URL}/${product.productId}/reviews`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Product'],
        }),
        toggleReviewLike : builder.mutation({
            query: (product: any) => ({
                url: `${PRODUCTS_URL}/${product.productId}/reviews/${product.reviewId}/likes`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Product'],
        }),
        toggleReviewDislike : builder.mutation({
            query: (product: any) => ({
                url: `${PRODUCTS_URL}/${product.productId}/reviews/${product.reviewId}/dislikes`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Product'],
        }),
        incrementView: builder.mutation({
            query: (productId: ProductType) => ({
                url: `${PRODUCTS_URL}/increment/${productId}`,
                method: "PUT",
            }),
            invalidatesTags: ['Product'],
        })
    }),
});


export const { useGetProductsQuery, useGetProductByIdQuery, useGetProductsByCategoryQuery, useAddProductMutation, useEditProductMutation, useDeleteProductMutation, useUploadProductImageMutation, useAddReviewMutation, useToggleReviewLikeMutation, useToggleReviewDislikeMutation, useIncrementViewMutation, useGetPopularProductsQuery } = productsApiSlice;
