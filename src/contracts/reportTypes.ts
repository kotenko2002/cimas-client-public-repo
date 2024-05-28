export interface ReportResponse {
    id: string,
    startDateTime: string,
    endDateTime: string,
    status: ReportStatus
}

export interface UpdateReportStatusRequest {
    status: ReportStatus
}

export interface PdfFile {
    blob: Blob;
    contentType: string;
    fileName: string; 
}

export enum ReportStatus {
    NotReviewed = 0,
    Approved = 1,
    Rejected = 2
}
