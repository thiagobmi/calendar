import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { calendarConfig } from '@/app/config/calendarConfig';
import { createEventContent } from '@/app/utils/calendarUtils';

interface Event {
    title: string;
    start: Date | string;
    allDay: boolean;
    id: number;
    end?: Date | string;
}

interface EventCalendarProps {
    events: Event[];
    onEventReceive?: (info: any) => void;
    onEventDrop?: (info: any) => void;
    onEventResize?: (info: any) => void;
}

export const EventCalendar: React.FC<EventCalendarProps> = ({
    events,
    onEventReceive,
    onEventDrop,
    onEventResize
}) => {
    return (
        <FullCalendar
            {...calendarConfig}
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            locale={ptBrLocale}
            events={events}
            eventContent={createEventContent}
            eventReceive={onEventReceive}
            eventDrop={onEventDrop}
            eventResize={onEventResize}
            height="100%"
            eventResizeStart={(info) => {
                // Ensure resize only happens on hour boundaries
                if (info.event.start) {
                    const startHour = info.event.start.getHours();
                    const startMin = info.event.start.getMinutes();

                    // If not at a full hour, adjust
                    if (startMin !== 0) {
                        const adjustedStart = new Date(info.event.start);
                        adjustedStart.setMinutes(0, 0, 0);
                        info.event.setStart(adjustedStart);
                    }
                }
            }}
        />
    );
};