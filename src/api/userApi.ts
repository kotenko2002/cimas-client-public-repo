import { createApi } from '@reduxjs/toolkit/query/react'
import { RegisterNonOwnerRequest, UserResponse } from '../contracts/userTypes';
import authorizedBaseQuery from './baseQueries/authorizedBaseQuery';

const userApi = createApi({
    reducerPath: 'userAPI',
    baseQuery: authorizedBaseQuery,
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        registerNonOwner: builder.mutation<void, RegisterNonOwnerRequest>({
            query: (request) => ({
                url: `users/register/nonowner`,
                method: 'POST',
                body: request
            }),
            invalidatesTags: ['Users']
        }),
        getCompanyUsers: builder.query<UserResponse[], void>({
            query: () => ({
                url: 'users',
                method: 'GET'
            }),
            providesTags: ['Users']
        }),
        fireUser: builder.mutation<void, string>({
            query: (userId) => ({
                url: `users/${userId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Users']
        })
    })
});

export const {
    useRegisterNonOwnerMutation,
    useGetCompanyUsersQuery,
    useFireUserMutation
} = userApi;

export default userApi;
