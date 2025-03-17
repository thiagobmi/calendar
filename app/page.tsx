"use client"
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useEffect } from 'react'
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

import { CalendarHeader } from '@/app/components/CalendarHeader'
import { EventCalendar } from '@/app/components/EventCalendar'
import { DraggableEvents } from '@/app/components/DraggableEvents'
import { useCalendarEvents } from '@/app/hooks/useCalendarEvents'

export default function Home() {

  
  const { 
    events,
    allEvents,
    availableEvents,
    handleEventReceive,
    handleEventDrop,
    handleEventResize,
    handleEventClick
  } = useCalendarEvents();
  
  return (
    <div className="flex flex-col h-screen">
      <CalendarHeader />
      <main className="flex-1 px-4 pt-0 pb-8">
        <div className="grid grid-cols-12 w-full gap-4 h-[calc(100%-2rem)]">
          <div className="col-span-10 h-full">
            <EventCalendar
              events={allEvents}
              onEventReceive={handleEventReceive}
              onEventDrop={handleEventDrop}
              onEventResize={handleEventResize}
              onEventClick={handleEventClick}
            />
          </div>
          <div className="col-span-2 h-full">
            <DraggableEvents events={availableEvents} />
          </div>
        </div>
      </main>
    </div>
  );
}