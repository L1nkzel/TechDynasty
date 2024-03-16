import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

// Injecting new endpoints to the apiSlice
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // endpoint for users login 
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: "POST",
                body: data,
            }),
        }),
        logout: builder.mutation({
            // endpoint for users logout
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "POST",
                body: data,
            })
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: "PUT",
                body: data,
            })
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: `${USERS_URL}`,
                method: "GET",
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useGetAllUsersQuery, useDeleteUserMutation } = usersApiSlice;