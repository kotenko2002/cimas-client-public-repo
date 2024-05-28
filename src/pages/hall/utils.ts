import styles from './HallPage.module.less';
import { HallSeatModel, HallSeatStatus, SeatResponse } from "../../contracts/hallTypes";
import { EditHallSeat } from "./HallPage";

export const mapSeatResponsesToEditHallSeats = (seats: SeatResponse[] | undefined): EditHallSeat[] => {
    if(!seats){
        return [];
    }

    return seats.map(seats => ({
        id: seats.id,
        row: seats.row,
        column: seats.column,
        initStatus: seats.status,
        newStatus: seats.status
    }));
}

export const mapEditHallSeatsToHallSeatModel = (seats: EditHallSeat[]): HallSeatModel[] => {
    return seats.map(seats => ({
        id: seats.id,
        status: seats.newStatus
    }));
}

export const getSeatClassNameBySeat = (seat: EditHallSeat): string => {
    switch (seat.newStatus) {
        case HallSeatStatus.notExists:
            return styles.notExists;
        case HallSeatStatus.available:
            return styles.available;
        case HallSeatStatus.unavailable:
            return styles.unavailable;
        default:
            return "";
    }
}
