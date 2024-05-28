export interface CreateHallRequest {
    name: string;
    numberOfRows: number;
    numberOfColumns: number;
}

export interface HallResponse {
    id: string;
    name: string;
    numberOfSeats: number;
}

export interface SeatResponse {
    id: string;
    row: number;
    column: number;
    status: HallSeatStatus;
}

export enum HallSeatStatus {
    notExists = 0,
    available = 1,
    unavailable = 2
}

export interface UpdateHallSeatsRequest {
    seats: HallSeatModel[];
}

export interface HallSeatModel {
    id: string;
    status: HallSeatStatus;
}
