import styles from './SessionPage.module.less';
import { SessionSeat, SessionSeatStatus } from "../../contracts/sessionTypes";
import { CreateTicketRequestModel, TicketStatus, UpdateTicketRequestModel } from "../../contracts/ticketTypes";
import { EditSessionSeat } from "./SessionPage";

export const mapSessionSeatsToEditSessionSeats = (seats: SessionSeat[] | undefined): EditSessionSeat[] => {
    if(!seats){
        return [];
    }

    return seats.map(seats => ({
        seatId: seats.seatId,
        ticketId: seats.ticketId,
        row: seats.row,
        column: seats.column,
        initStatus: seats.status,
        newStatus: seats.status
    }));
}

export const mapEditSessionSeatsToCreateTicketRequestModels = (seats: EditSessionSeat[]): CreateTicketRequestModel[] => 
    seats.map(seat => ({
        seatId: seat.seatId,
        status: TicketStatus[SessionSeatStatus[seat.newStatus] as keyof typeof TicketStatus]
    }));

export const mapEditSessionSeatsToUpdateTicketRequestModels = (seats: EditSessionSeat[]): UpdateTicketRequestModel[] => 
    seats.map(seat => ({
        ticketId: seat.ticketId!,
        status: TicketStatus[SessionSeatStatus[seat.newStatus] as keyof typeof TicketStatus]
    }));
    
export const getSeatClassNameBySeat = (seat: EditSessionSeat): string => {
    switch (seat.newStatus) {
        case SessionSeatStatus.notExists:
            return styles.notExists;
        case SessionSeatStatus.available:
            return styles.available;
        case SessionSeatStatus.unavailable:
            return styles.unavailable;
        case SessionSeatStatus.booked:
            return styles.booked;
        case SessionSeatStatus.sold:
            return styles.sold;
        default:
            return "";
    }
}
