export interface CreateSessionRequest {
    hallId: string;
    filmId: string;
    startTime: string;
    price: number;
}

export interface GetSessionsByRangeRequest {
    cinemaId: string;
    fromDateTime: string;
    toDateTime: string;
}

export interface SessionResponse {
    id: string;
    startDateTime: string;
    endDateTime: string;
    price: number;
    hallName: string;
    filmName: string;
}

export interface SessionSeat {
    ticketId?: string;
    seatId: string;
    row: number;
    column: number;
    status: SessionSeatStatus;
}

export enum SessionSeatStatus {
    notExists = 0,
    available = 1,
    unavailable = 2,
    booked = 3,
    sold = 4
}
