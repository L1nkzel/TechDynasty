import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: "POST",
                body: order,
            }),
        }),
        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,
                method: "GET",
            }),
            keepUnusedDataFor: 5,
        }),
        payOrder: builder.mutation({
            query: ({ orderId, details }) => ({
                url: `${ORDERS_URL}`,
                method: "PUT",
                body: { orderId, ...details },
            }),
        }),
        getPaypalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        deleteOrder: builder.mutation({
            query: (orderId) => ({
                url: ORDERS_URL,
                method: "DELETE",
                body: { orderId },
            }),
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/myorders`,
                method: "GET",
            }),
            keepUnusedDataFor: 5,
        }),
        getAllOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}`,
            }),
            keepUnusedDataFor: 5,
        }),
        deliverOrder: builder.mutation({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}/delivered`,
                method: "PUT",
            })
        })
    }),
})

export const { useCreateOrderMutation, useGetOrderDetailsQuery, usePayOrderMutation, useGetPaypalClientIdQuery, useDeleteOrderMutation, useGetMyOrdersQuery, useGetAllOrdersQuery, useDeliverOrderMutation } = ordersApiSlice;

