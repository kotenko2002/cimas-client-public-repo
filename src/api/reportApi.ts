import { createApi } from '@reduxjs/toolkit/query/react'
import { PdfFile, ReportResponse, UpdateReportStatusRequest } from '../contracts/reportTypes';
import authorizedBaseQuery from './baseQueries/authorizedBaseQuery';

const reportApi = createApi({
    reducerPath: 'reportAPI',
    baseQuery: authorizedBaseQuery,
    tagTypes: ['Reports'],
    endpoints: (builder) => ({
        getAllCompanyReports: builder.query<ReportResponse[], void>({
            query: () => ({
                url: 'reports',
                method: 'GET'
            }),
            providesTags: ['Reports']
        }),
        getReportById: builder.query<ReportResponse, string>({
            query: (reportId) => ({
                url: `reports/${reportId}`,
                method: 'GET'
            }),
            providesTags: ['Reports']
        }),
        getReportFile: builder.query<PdfFile, string>({
            query: (reportId) => ({
                url: `reports/file/${reportId}`,
                method: 'GET',
                responseHandler: async (response) => {
                    return {
                        blob: await response.blob(),
                        contentType: response.headers.get('Content-Type') || '',
                        fileName: response.headers.get('Content-Disposition')?.split('filename=')[1] || ''
                    };
                },
                cache: "no-store",
            })
        }),
        updateReportStatus: builder.mutation<void, { reportId: string, request: UpdateReportStatusRequest}>({
            query: ({ reportId, request }) => ({
                url: `reports/${reportId}`,
                method: 'PATCH',
                body: request
            }),
            invalidatesTags: ['Reports']
        })
    })
});

export const {
    useGetAllCompanyReportsQuery,
    useGetReportByIdQuery,
    useUpdateReportStatusMutation,
    useGetReportFileQuery
} = reportApi;

export default reportApi;
