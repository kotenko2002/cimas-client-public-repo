import { EventContentArg } from '@fullcalendar/core';
import { Menu } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './EventContent.module.less';
import { DeleteMenuItem, DetailsMenuItem } from './EventContentMenyItems';

interface EventContentProps {
    event: EventContentArg
}

const EventContent = ({ event }: EventContentProps) => {
    const { t } = useTranslation('sessionsPage');

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpenMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <button 
                className={styles.eventContentCantainer}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleOpenMenuClick}
            >
                <div className={styles.time}>
                    {event.timeText}
                    </div>
                <div className={styles.otherInfo}>
                    {t("calendar.eventContent.name", {
                        filmName: event.event.extendedProps.filmName,
                        hallName: event.event.extendedProps.hallName,
                    })}
                </div>
            </button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                MenuListProps={{ 'aria-labelledby': 'basic-button' }}
            >
                <DetailsMenuItem event={event} handleCloseMenu={handleCloseMenu}/>
                <DeleteMenuItem event={event} handleCloseMenu={handleCloseMenu}/>
            </Menu>
        </>
    );
}

export default EventContent;
