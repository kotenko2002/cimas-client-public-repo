import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import { useGetSessionsByRangeQuery } from '../../api/sessionApi';
import { SessionResponse } from '../../contracts/sessionTypes';
import { WorkdayResponse } from '../../contracts/workdayTypes';
import { convertUtcStringDateToLocalDate } from '../../utils/timeUtils';

export type CalendarEvent = {
    id: string;
    start: Date;
    end: Date;
    extendedProps: {
        filmName: string;
        hallName: string;
        price: number;
    }
};

const mapSessionsToEvents = (sessions: SessionResponse[] | undefined) => {
    if(!sessions){
        return [];
    }

    return sessions.map(session => ({
        id: session.id,
        start: convertUtcStringDateToLocalDate(session.startDateTime),
        end: convertUtcStringDateToLocalDate(session.endDateTime),
        extendedProps: {
            filmName: session.filmName,
            hallName: session.hallName,
            price: session.price
        }
    }));
}

export const useSessions = (calendarRef: React.RefObject<FullCalendar>, workday: WorkdayResponse | null) => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    
    const { data: sessions, refetch } = useGetSessionsByRangeQuery({
        cinemaId: workday?.cinemaId!,
        fromDateTime: calendarRef.current?.getApi().view.currentStart.toISOString()!,
        toDateTime: calendarRef.current?.getApi().view.currentEnd.toISOString()!
    }, {
        skip: !workday || !calendarRef.current?.getApi().view
    });

    useEffect(() => {
        setEvents(mapSessionsToEvents(sessions));
    }, [sessions]);

    return { events, refetch };
}
