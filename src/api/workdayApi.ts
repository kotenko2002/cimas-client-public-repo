import { createApi } from '@reduxjs/toolkit/query/react';
import { WorkdayResponse } from '../contracts/workdayTypes';
import authorizedBaseQuery from './baseQueries/authorizedBaseQuery';

const workdayApi = createApi({
    reducerPath: 'workdayAPI',
    baseQuery: authorizedBaseQuery,
    tagTypes: ['Workday'],
    endpoints: (builder) => ({
        startWorkday: builder.mutation<WorkdayResponse, string>({
            query: (cinemaId) => ({
                url: `workdays/start/${cinemaId}`,
                method: 'POST'
            }),
            invalidatesTags: ['Workday']
        }),
        getCurrentWorkday: builder.query<WorkdayResponse | null, void>({
            query: () => ({
                url: `workdays/current`,
                method: 'GET'
            }),
            providesTags: ['Workday']
        }),
        finishWorkday: builder.mutation<void, void>({
            query: () => ({
                url: `workdays/finish`,
                method: 'PATCH'
            }),
            invalidatesTags: ['Workday']
        })
    }),
    keepUnusedDataFor: 0
});

export const {
    useStartWorkdayMutation,
    useGetCurrentWorkdayQuery,
    useFinishWorkdayMutation,
} = workdayApi;

export default workdayApi;
