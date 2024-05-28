import styles from './SeatsEditor.module.less';
import { Button, Paper } from "@mui/material";
import { EditHallSeat } from "../../pages/hall/HallPage";
import { EditSessionSeat } from "../../pages/session/SessionPage";
import { getContainerWidth } from './utils';
import { useTranslation } from 'react-i18next';

interface SeatsEditorProps<T extends EditHallSeat | EditSessionSeat> {
    seats: T[];
    handleOnSeatClick: (seat: T) => void;
    handleOnSaveChangesButtonClick: () => void;
    getSeatClassNameBySeat: (seat: T) => string;
}

const SeatsEditor = <T extends EditHallSeat | EditSessionSeat>(props: SeatsEditorProps<T>) => {
    const {
        seats,
        handleOnSeatClick,
        handleOnSaveChangesButtonClick,
        getSeatClassNameBySeat
    } = props;
    const { t } = useTranslation('seatsEditor');

    const maxRow = Math.max(...seats.map(seat => seat.row));
    const maxColumn = Math.max(...seats.map(seat => seat.column));

    const getAlphabetForRow = (index: number) => {
        const alphabets = t("alphabets");
        const alphabetIndex = index % alphabets.length;

        const alphabet = alphabets.charAt(alphabetIndex);
        const number = Math.floor(index / alphabets.length);

        return alphabet + (number === 0 ? '' : number);
    };

    return (
        <>
            <div className={styles.saveButtonContainer} style={{ width: getContainerWidth(maxColumn + 1)}}>
                <Button
                    variant="outlined"
                    onClick={handleOnSaveChangesButtonClick}
                    disabled={seats.filter(seat => seat.initStatus !== seat.newStatus).length === 0}
                >
                    {t("saveChangesButtonText")}
                </Button>
            </div>
            <div
                className={styles.seatsContainer}
                style={{gridTemplateColumns: `repeat(${maxColumn + 2}, 1fr)`}}
            >
                {Array.from({ length: maxRow + 1 }).map((_, rowIndex) => (
                    <div
                        key={rowIndex}
                        className={styles.alphabetRowItem}
                        style={{gridRow: rowIndex + 2}}
                    >
                        {getAlphabetForRow(rowIndex)}
                    </div>
                ))}
                {seats.map((seat, index) => (
                    <Paper
                        key={index}
                        className={`${styles.seat} ${getSeatClassNameBySeat(seat)}`}
                        style={{gridRow: seat.row + 2, gridColumn: seat.column + 2}}
                        onClick={() => handleOnSeatClick(seat)}
                    >
                        {seat.column + 1}
                    </Paper>
                ))}
            </div>
        </>
    );
}

export default SeatsEditor;
