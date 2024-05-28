import styles from './HallPage.module.less';
import { useParams } from "react-router-dom";
import { useGetSeatsByHallIdQuery, useUpdateHallSeatsMutation } from "../../api/hallApi";
import { useEffect, useState } from 'react';
import { HallSeatStatus, SeatResponse } from '../../contracts/hallTypes';
import { toastSettings } from '../../constants';
import { toast } from 'react-toastify';
import { getSeatClassNameBySeat, mapEditHallSeatsToHallSeatModel, mapSeatResponsesToEditHallSeats } from './utils';
import SeatsEditor from '../../components/seatsEditor/SeatsEditor';
import { useTranslation } from 'react-i18next';

export interface EditHallSeat extends Omit<SeatResponse, 'status'> {
    initStatus: HallSeatStatus;
    newStatus: HallSeatStatus;
}

interface Params {
    hallId: string;
}

const HallPage = () => {
    const [updateSeats] = useUpdateHallSeatsMutation();
    const { t } = useTranslation('hallPage');

    const { hallId } = useParams<keyof Params>() as Params;
    let { data: initialSeats } = useGetSeatsByHallIdQuery(hallId);
    const [seats, setSeats] = useState<EditHallSeat[]>(mapSeatResponsesToEditHallSeats(initialSeats));

    useEffect(() => {
        setSeats(mapSeatResponsesToEditHallSeats(initialSeats));
    }, [initialSeats]);

    if(!initialSeats) {
        return null;
    }

    const handleOnSeatClick = (updatedSeat: EditHallSeat) => {
        setSeats(seats.map(seat => {
            if(seat.id !== updatedSeat.id ) {
                return seat;
            } 

            return {
                ...seat,
                newStatus: seat.newStatus + 1 in HallSeatStatus
                    ? seat.newStatus + 1
                    : HallSeatStatus.notExists
            };
        }));
    }

    const handleOnSaveButtonClick = async () => {
        const seatsToUpdate = seats.filter(seat => seat.initStatus !== seat.newStatus);

        const response = await updateSeats({
            hallId: hallId,
            request: {
                seats: mapEditHallSeatsToHallSeatModel(seatsToUpdate)
            }
        });

        if (!('error' in response)) {
            toast.success(t('changesSuccessfulySavedMessage'), toastSettings);
        } 
    }

    return (
        <div className={styles.hallPageContainer}>
            <SeatsEditor
                seats={seats}
                handleOnSeatClick={handleOnSeatClick}
                handleOnSaveChangesButtonClick={handleOnSaveButtonClick}
                getSeatClassNameBySeat={getSeatClassNameBySeat}
            />
        </div>
    );
}

export default HallPage;
