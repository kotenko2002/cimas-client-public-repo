import { createApi } from '@reduxjs/toolkit/query/react'
import { AuthResponse, LoginRequest, RegisterOwnerRequest } from '../contracts/authTypes';
import anonymousBaseQuery from './baseQueries/anonymousBaseQuery';

const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: anonymousBaseQuery,
    endpoints: (builder) => ({
        registerOwner: builder.mutation<void, RegisterOwnerRequest>({
            query: (request: RegisterOwnerRequest) => ({
                url: `auth/register/owner`,
                method: 'POST',
                body: request
            })
        }),
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (request: LoginRequest) => ({
                url: `auth/login`,
                method: 'POST',
                body: request
            })
        }),
        refreshTokens: builder.mutation<AuthResponse, string>({
            query: (accessToken: string) => ({
                url: `auth/refresh-tokens`,
                method: 'POST',
                body: {
                    accessToken: accessToken
                }
            })
        }),
    })
});

export const {
    useRegisterOwnerMutation,
    useLoginMutation,
    useRefreshTokensMutation
} = authAPI;

export default authAPI;