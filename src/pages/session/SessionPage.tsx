import styles from './SessionPage.module.less';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sessionApi, { useGetSeatsBySessionIdQuery } from "../../api/sessionApi";
import { BASE_URL, toastSettings } from "../../constants";
import { SessionSeat, SessionSeatStatus } from "../../contracts/sessionTypes";
import {
    getSeatClassNameBySeat,
    mapEditSessionSeatsToCreateTicketRequestModels,
    mapEditSessionSeatsToUpdateTicketRequestModels,
    mapSessionSeatsToEditSessionSeats
} from "./utils";
import { useAppDispatch } from '../../hooks/redux';
import { useCreateTicketsMutation, useDeleteTicketsMutation, useUpdateTicketsMutation } from "../../api/ticketApi";
import { toast } from 'react-toastify';
import SeatsEditor from '../../components/seatsEditor/SeatsEditor';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export interface EditSessionSeat extends Omit<SessionSeat, 'status'> {
    initStatus: SessionSeatStatus;
    newStatus: SessionSeatStatus;
}

interface Params {
    sessionId: string;
}

const SessionPage = () => {
    const { t } = useTranslation('sessionPage');
    const { sessionId } = useParams<keyof Params>() as Params;
    const { data: initialSeats } = useGetSeatsBySessionIdQuery(sessionId);
    const [seats, setSeats] = useState<EditSessionSeat[]>(mapSessionSeatsToEditSessionSeats(initialSeats));

    const dispatch = useAppDispatch();
    const [createTicket] = useCreateTicketsMutation();
    const [updateTickets] = useUpdateTicketsMutation();
    const [deleteTickets] = useDeleteTicketsMutation();
    
    useEffect(() => {
        setSeats(mapSessionSeatsToEditSessionSeats(initialSeats));
    }, [initialSeats]);

    if(!initialSeats) {
        return null;
    }

    const handleOnSeatClick = (updatedSeat: EditSessionSeat) => {
        if(updatedSeat.newStatus === SessionSeatStatus.notExists || updatedSeat.newStatus === SessionSeatStatus.unavailable) {
            return;
        }

        const incrementValue = updatedSeat.newStatus === SessionSeatStatus.available ? 2 : 1;

        setSeats(seats.map(seat => {
            if(seat.seatId !== updatedSeat.seatId ) {
                return seat;
            } 

            return {
                ...seat,
                newStatus: seat.newStatus + incrementValue in SessionSeatStatus
                    ? seat.newStatus + incrementValue
                    : SessionSeatStatus.available
            };
        }));
    }

    const handleOnSaveButtonClick = async () => {
        const changedSeats = seats.filter(seat => seat.initStatus !== seat.newStatus);

        const ticketsToBeCreated = changedSeats.filter(seat => 
            (seat.newStatus === SessionSeatStatus.sold || seat.newStatus === SessionSeatStatus.booked) && !seat.ticketId);
        const ticketsToBeUpdated = changedSeats.filter(seat => 
            (seat.newStatus === SessionSeatStatus.sold || seat.newStatus === SessionSeatStatus.booked) && seat.ticketId);
        const ticketsToBeDeleted = changedSeats.filter(seat => 
            seat.newStatus === SessionSeatStatus.available && seat.ticketId);

        let errorOccurred = false;
        let IdsOfTicketsToGeneratePdf: string[] = [];
        if(ticketsToBeCreated.length > 0) {
            const createTicketResponse = await createTicket({
                sessionId: sessionId,
                request: {
                    tickets: mapEditSessionSeatsToCreateTicketRequestModels(ticketsToBeCreated)
                }
            });

            if ('error' in createTicketResponse) {
                errorOccurred = true;
            } else if(createTicketResponse.data.length > 0) {
                IdsOfTicketsToGeneratePdf.push(...createTicketResponse.data);
            }
        }

        if(ticketsToBeUpdated.length > 0) {
            const updateTicketsResponse = await updateTickets({
                tickets: mapEditSessionSeatsToUpdateTicketRequestModels(ticketsToBeUpdated)
            });

            if ('error' in updateTicketsResponse) {
                errorOccurred = true;
            } else  if(updateTicketsResponse.data.length > 0) {
                IdsOfTicketsToGeneratePdf.push(...updateTicketsResponse.data);
            }
        }

        if(IdsOfTicketsToGeneratePdf.length > 0) {
            try {
                const response = await axios.post(`${BASE_URL}/tickets/file/generate`, {
                    idsOfSoldTickets: IdsOfTicketsToGeneratePdf
                }, {
                    responseType: 'blob',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                
                const blob = new Blob([response.data], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);

                window.open(url, '_blank');
                URL.revokeObjectURL(url);
            }
            catch(e) {}
        }

        if(ticketsToBeDeleted.length > 0) {
            const response = await deleteTickets({
                tikectIds: ticketsToBeDeleted.map(seat => seat.ticketId!)
            });

            if ('error' in response) {
                errorOccurred = true;
            }
        }

        if(!errorOccurred) {
            dispatch(sessionApi.util.invalidateTags(['SessionSeats']));
            toast.success(t('changesSuccessfulySavedMessage'), toastSettings);
        }
    }
    
    return (
        <div className={styles.sessionPageContainer}>
            <SeatsEditor
                seats={seats}
                handleOnSeatClick={handleOnSeatClick}
                handleOnSaveChangesButtonClick={handleOnSaveButtonClick}
                getSeatClassNameBySeat={getSeatClassNameBySeat}
            />
        </div>
    );
}

export default SessionPage;
