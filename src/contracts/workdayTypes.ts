export interface WorkdayResponse {
    id: string;
    startDateTime: Date;
    endDateTime: Date | null;
    cinemaId: string;
    userId: string;
}; 