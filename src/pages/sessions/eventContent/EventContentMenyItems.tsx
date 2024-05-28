import { MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../../constants';
import styles from './EventContent.module.less';
import { InfoOutlined, DeleteOutline } from '@mui/icons-material';
import useConfirm from '../../../hooks/useConfirm';
import { useDeleteSessionMutation } from '../../../api/sessionApi';
import { EventContentArg } from '@fullcalendar/core';
import { useTranslation } from 'react-i18next';

interface MenuItemProps {
    event: EventContentArg,
    handleCloseMenu: () => void
}

const DetailsMenuItem = ({ event, handleCloseMenu }: MenuItemProps) => {
    const { t } = useTranslation('sessionsPage');
    const navigate = useNavigate();

    const handleOnDetailsClick = () => {
        navigate(`${Routes.SESSIONS_PAGE_ROUTE}/${event.event.id}`);
        handleCloseMenu();
    }

    return (
        <MenuItem
            onClick={handleOnDetailsClick}
            className={styles.sessionMenuItem}
        >
            <InfoOutlined fontSize="small" />
            {t("calendar.menuItems.details")}
        </MenuItem>
    );
}

const DeleteMenuItem = ({ event, handleCloseMenu }: MenuItemProps) => {
    const { t } = useTranslation('sessionsPage');

    const [Dialog, confirm] = useConfirm();
    const [deleteSession] = useDeleteSessionMutation();

    const handleOnDeleteClick = async () => {
        const eventTime = event.timeText.split(" - ");
        
        const confirmDelete = await confirm([
            t("calendar.menuItems.delete.deleteFilmConfirmation.part1"),
            t("calendar.menuItems.delete.deleteFilmConfirmation.part2", {
                startTimeText: eventTime[0],
                endTimeText: eventTime[1],
                hallName: event.event.extendedProps.hallName
            })
        ]);
        if(confirmDelete) { 
            await deleteSession(event.event.id);
        }

        handleCloseMenu();
    }

    return (
        <>
            <MenuItem
                onClick={handleOnDeleteClick}
                className={styles.sessionMenuItem}
            >
                <DeleteOutline fontSize="small" />
                {t("calendar.menuItems.delete.text")}
            </MenuItem>
            <Dialog />
        </>
    );
}

export { DetailsMenuItem, DeleteMenuItem };
