import { createApi } from '@reduxjs/toolkit/query/react'
import { FilmResponse, CreateFilmRequest } from '../contracts/filmTypes';
import authorizedBaseQuery from './baseQueries/authorizedBaseQuery';

const filmApi = createApi({
    reducerPath: 'filmAPI',
    baseQuery: authorizedBaseQuery,
    tagTypes: ['Films'],
    endpoints: (builder) => ({
        createFilm: builder.mutation<FilmResponse, {cinemaId: string, request: CreateFilmRequest} >({
            query: ({cinemaId, request}) => ({
                url: `films/${cinemaId}`,
                method: 'POST',
                body: request
            }),
            invalidatesTags: ['Films']
        }),
        getFilmsByCinemaId: builder.query<FilmResponse[], string>({
            query: (cinemaId) => ({
                url: `films/${cinemaId}`,
                method: 'GET'
            }),
            providesTags: ['Films']
        }),
        deleteFilm: builder.mutation<void, string>({
            query: (filmId) => ({
                url: `films/${filmId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Films']
        })
    })
});

export const {
    useCreateFilmMutation,
    useGetFilmsByCinemaIdQuery,
    useDeleteFilmMutation,
} = filmApi;

export default filmApi;
