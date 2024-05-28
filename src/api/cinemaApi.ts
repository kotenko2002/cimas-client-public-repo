import { createApi } from '@reduxjs/toolkit/query/react'
import { CinemaResponse, CreateCinemaRequest } from '../contracts/cinemaTypes';
import authorizedBaseQuery from './baseQueries/authorizedBaseQuery';

const cinemaAPI = createApi({
    reducerPath: 'cinemaAPI',
    baseQuery: authorizedBaseQuery,
    tagTypes: ['Cinemas'],
    endpoints: (builder) => ({
        createCinema: builder.mutation<CinemaResponse, CreateCinemaRequest>({
            query: (request) => ({
                url: `cinemas`,
                method: 'POST',
                body: request
            }),
            invalidatesTags: ['Cinemas']
        }),
        getAllCinemas: builder.query<CinemaResponse[], void>({
            query: () => ({
                url: 'cinemas',
                method: 'GET'
            }),
            providesTags: ['Cinemas']
        }),
        deleteCinema: builder.mutation<void, string>({
            query: (cinemaId) => ({
                url: `cinemas/${cinemaId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Cinemas']
        })
    })
});

export const {
    useCreateCinemaMutation,
    useGetAllCinemasQuery,
    useDeleteCinemaMutation,
} = cinemaAPI;

export default cinemaAPI;
