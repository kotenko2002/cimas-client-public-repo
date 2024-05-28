import { useEffect, useState } from "react";
import { useGetAllCompanyReportsQuery } from "../../api/reportApi";
import { ReportResponse, ReportStatus } from "../../contracts/reportTypes";
import { convertUtcStringDateToLocalDate } from "../../utils/timeUtils";

export interface Report {
    id: string,
    startDateTime: Date,
    endDateTime: Date,
    status: ReportStatus
}

const setReportResponsesToReports = (reports: ReportResponse[] | undefined): Report[] => {
    if(!reports){
        return [];
    }

    return reports.map(report => ({
        id: report.id,
        startDateTime: convertUtcStringDateToLocalDate(report.startDateTime),
        endDateTime: convertUtcStringDateToLocalDate(report.endDateTime),
        status: report.status
    })).reverse();
}

export const useReports = () => {
    const [reports, setReports] = useState<Report[] | undefined>([]);
    const {data: reportResponses } = useGetAllCompanyReportsQuery();

    useEffect(() => {
        setReports(setReportResponsesToReports(reportResponses));
    }, [reportResponses]);

    return { reports };
}
