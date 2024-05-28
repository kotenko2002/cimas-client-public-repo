import { createApi } from '@reduxjs/toolkit/query/react'
import { CreateHallRequest, HallResponse, UpdateHallSeatsRequest, SeatResponse } from '../contracts/hallTypes';
import authorizedBaseQuery from './baseQueries/authorizedBaseQuery';

const hallApi = createApi({
    reducerPath: 'hallAPI',
    baseQuery: authorizedBaseQuery,
    tagTypes: ['Halls', 'HallSeats'],
    endpoints: (builder) => ({
        createHall: builder.mutation<HallResponse, {cinemaId: string, request: CreateHallRequest} >({
            query: ({cinemaId, request}) => ({
                url: `halls/${cinemaId}`,
                method: 'POST',
                body: request
            }),
            invalidatesTags: ['Halls']
        }),
        getHallsByCinemaId: builder.query<HallResponse[], string>({
            query: (cinemaId) => ({
                url: `halls/${cinemaId}`,
                method: 'GET'
            }),
            providesTags: ['Halls']
        }),
        getSeatsByHallId: builder.query<SeatResponse[], string>({
            query: (hallId) => ({
                url: `halls/seats/${hallId}`,
                method: 'GET'
            }),
            providesTags: ['HallSeats']
        }),
        updateHallSeats: builder.mutation<void, {hallId: string, request: UpdateHallSeatsRequest}>({
            query: ({hallId, request}) => ({
                url: `halls/${hallId}`,
                method: 'PATCH',
                body: request
            }),
            invalidatesTags: ['HallSeats', 'Halls']
        }),
        deleteHall: builder.mutation<void, string>({
            query: (hallId) => ({
                url: `halls/${hallId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Halls']
        })
    })
});

export const {
    useCreateHallMutation,
    useGetHallsByCinemaIdQuery,
    useGetSeatsByHallIdQuery,
    useUpdateHallSeatsMutation,
    useDeleteHallMutation,
} = hallApi;

export default hallApi;
