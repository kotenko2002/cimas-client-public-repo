import { createApi } from '@reduxjs/toolkit/query/react';
import { CreateSessionRequest, GetSessionsByRangeRequest, SessionResponse, SessionSeat } from '../contracts/sessionTypes';
import authorizedBaseQuery from './baseQueries/authorizedBaseQuery';

const sessionApi = createApi({
    reducerPath: 'sessionAPI',
    baseQuery: authorizedBaseQuery,
    tagTypes: ['Sessions', 'SessionSeats'],
    endpoints: (builder) => ({
        createSession: builder.mutation<SessionResponse, CreateSessionRequest>({
            query: (request) => ({
                url: `sessions`,
                method: 'POST',
                body: request,
            }),
            invalidatesTags: ['Sessions'],
        }),
        getSessionsByRange: builder.query<SessionResponse[], GetSessionsByRangeRequest>({
            query: (request) => ({
                url: `sessions/byRange`,
                method: 'GET',
                params: request,
            }),
            providesTags: ['Sessions'],
        }),
        deleteSession: builder.mutation<void, string>({
            query: (sessionId) => ({
                url: `sessions/${sessionId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Sessions'],
        }),

        getSeatsBySessionId: builder.query<SessionSeat[], string>({
            query: (sessionId) => ({
                url: `sessions/seats/${sessionId}`,
                method: 'GET',
            }),
            providesTags: ['SessionSeats'],
        }),
    }),
});

export const {
    useCreateSessionMutation,
    useGetSessionsByRangeQuery,
    useDeleteSessionMutation,

    useGetSeatsBySessionIdQuery,
} = sessionApi;

export default sessionApi;
