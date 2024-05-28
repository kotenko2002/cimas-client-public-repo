import { createApi } from '@reduxjs/toolkit/query/react'
import { CreateTicketsRequest, DeleteTicketsRequest, UpdateTicketsRequest } from '../contracts/ticketTypes';
import authorizedBaseQuery from './baseQueries/authorizedBaseQuery';

const ticketApi = createApi({
    reducerPath: 'ticketAPI',
    baseQuery: authorizedBaseQuery,
    endpoints: (builder) => ({
        createTickets: builder.mutation<string[], { sessionId: string, request: CreateTicketsRequest}>({
            query: ({sessionId, request}) => ({
                url: `tickets/${sessionId}`,
                method: 'POST',
                body: request
            }),
        }),
        updateTickets: builder.mutation<string[], UpdateTicketsRequest>({
            query: (request) => ({
                url: 'tickets',
                method: 'PATCH',
                body: request
            }),
        }),
        deleteTickets: builder.mutation<void, DeleteTicketsRequest>({
            query: (request) => ({
                url: 'tickets',
                method: 'DELETE',
                body: request
            }),
        })
    })
});

export const {
    useCreateTicketsMutation,
    useUpdateTicketsMutation,
    useDeleteTicketsMutation,
} = ticketApi;

export default ticketApi;
