export interface CreateTicketsRequest {
    tickets: CreateTicketRequestModel[];
}
export interface CreateTicketRequestModel {
    seatId: string;
    status: TicketStatus;
}

export interface UpdateTicketsRequest {
    tickets: UpdateTicketRequestModel[];
}
export interface UpdateTicketRequestModel {
    ticketId: string;
    status: TicketStatus;
}

export interface DeleteTicketsRequest {
    tikectIds: string[];
}

export enum TicketStatus {
    booked = 3,
    sold = 4
}
