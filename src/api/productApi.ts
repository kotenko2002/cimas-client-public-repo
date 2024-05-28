import { createApi } from '@reduxjs/toolkit/query/react'
import { ProductResponse, CreateProductRequest, UpdateProductsRequest } from '../contracts/productTypes';
import authorizedBaseQuery from './baseQueries/authorizedBaseQuery';

const productApi = createApi({
    reducerPath: 'productAPI',
    baseQuery: authorizedBaseQuery,
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        createProduct: builder.mutation<ProductResponse, {cinemaId: string, request: CreateProductRequest} >({
            query: ({cinemaId, request}) => ({
                url: `products/${cinemaId}`,
                method: 'POST',
                body: request
            }),
            invalidatesTags: ['Products']
        }),
        getProductsByCinemaId: builder.query<ProductResponse[], string>({
            query: (cinemaId) => ({
                url: `products/${cinemaId}`,
                method: 'GET'
            }),
            providesTags: ['Products']
        }),
        updateProducts: builder.mutation<void, UpdateProductsRequest>({
            query: (request) => ({
                url: `products`,
                method: 'PATCH',
                body: request
            }),
            invalidatesTags: ['Products']
        }),
        deleteProduct: builder.mutation<void, string>({
            query: (productId) => ({
                url: `products/${productId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Products']
        })
    })
});

export const {
    useCreateProductMutation,
    useGetProductsByCinemaIdQuery,
    useUpdateProductsMutation,
    useDeleteProductMutation,
} = productApi;

export default productApi;
