import styles from './ControlPanel.module.less';
import { IconButton, Button } from '@mui/material';
import { ArrowLeftIcon, ArrowRightIcon } from '@mui/x-date-pickers';
import FullCalendar from '@fullcalendar/react';
import CreateSessionButton from '../createSessionButton/CreateSessionButton';
import { useTranslation } from 'react-i18next';

interface ControlPanelProps {
    cinemaId: string;
    calendarRef: React.MutableRefObject<FullCalendar | null>;
    tryToRefetchSessions: () => void;
}

const ControlPanel= (props: ControlPanelProps) => {
    const { cinemaId, calendarRef, tryToRefetchSessions } = props;

    const { t } = useTranslation('sessionsPage');

    const handleChangeWeekButtonClick = (action: () => void) => {
        if (calendarRef.current) {
            action();
            tryToRefetchSessions();
        }
    }

    return (
        <div className={styles.controlPanelContainer}>
            <div>
                <IconButton onClick={() => handleChangeWeekButtonClick(() => calendarRef.current?.getApi().prev())}>
                    <ArrowLeftIcon />
                </IconButton>
                <IconButton onClick={() => handleChangeWeekButtonClick(() => calendarRef.current?.getApi().next())}>
                    <ArrowRightIcon/>
                </IconButton>
                <Button
                    variant="outlined"
                    className={styles.todayButton}
                    onClick={() => handleChangeWeekButtonClick(() => calendarRef.current?.getApi().today())}
                >
                    {t("controlPanel.todayButtonText")}
                </Button>
            </div>
            <h2 className={styles.title}>{calendarRef.current?.getApi().view.title}</h2>
            <CreateSessionButton cinemaId={cinemaId}/>
        </div>
    );
}

export default ControlPanel;
