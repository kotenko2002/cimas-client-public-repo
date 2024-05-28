import styles from './SessionsPage.module.less';
import { useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid';
import ukLocale from '@fullcalendar/core/locales/uk';
import enLocale from '@fullcalendar/core/locales/en-gb';
import { CalendarEvent, useSessions } from './useSessions';
import ControlPanel from './controlPanel/ControlPanel';
import EventContent from './eventContent/EventContent';
import { useAppSelector } from '../../hooks/redux';
import { useTranslation } from 'react-i18next';

const SessionsPage = () => {
    const { i18n } = useTranslation();

    const calendarRef = useRef<FullCalendar>(null);
    const { workday } = useAppSelector(state => state.workday);
    const { events, refetch } = useSessions(calendarRef, workday);
    
    useEffect(() => {
        // Костиль. Без цього кастомний заголовок не змінює локалізацію
        tryToRefetchSessions();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language]);

    if(!workday) {
        return null;
    }

    const tryToRefetchSessions = () => {
        if(calendarRef && events) {
            setTimeout(() => {
                refetch();
            }, 0);
        } 
    }

    const getSlotMinTime = (events: CalendarEvent[]) => {
        const defaultSlotMinTime = 10;

        if (!events || events.length === 0) {
            return `${defaultSlotMinTime}:00:00`;
        }

        const earliestHour = events
            .map(event => event.start.getHours())
            .reduce((minHour, hour) => Math.min(minHour, hour), defaultSlotMinTime);

        return earliestHour < defaultSlotMinTime
            ? `${earliestHour}:00:00`
            : `${defaultSlotMinTime}:00:00`;
    }

    return (
        <div className={styles.sessionsPageContainer}>
            <ControlPanel
                cinemaId={workday?.cinemaId!}
                calendarRef={calendarRef}
                tryToRefetchSessions={tryToRefetchSessions}
            />
            <FullCalendar
                eventContent={(event) => <EventContent event={event}/>}
                ref={calendarRef}
                events={events}
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                initialView="timeGridWeek"
                allDaySlot={false} // прибирає слот зверху, який показує івент, що займає весь день
                slotLabelFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }} // 1PM -> 13:00 
                locale={i18n.language === "uk" ? ukLocale : enLocale} // 24:00 -> 0:00 + локалізація
                firstDay={1} // робить Пон першим днем
                dayHeaderFormat={{ weekday: 'short', day: '2-digit' }} // Mon 17.03 -> Mon 17
                contentHeight="auto" // прибирає скрол
                headerToolbar={{ left: "", center: "", right: "" }} // прибирає дефолтну панель управління
                slotEventOverlap={false}
                slotMinTime={getSlotMinTime(events)}
            />
        </div>
    );
}

export default SessionsPage;
