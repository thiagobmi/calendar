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
    handleEventReceive,
    handleEventDrop,
    handleEventResize
  } = useCalendarEvents();


  
  return (
    <div className="flex flex-col h-screen">
      <CalendarHeader />
      <main className="flex-1 px-4 pt-0 pb-8"> {/* Increased bottom padding to pb-8 */}
        <div className="grid grid-cols-12 w-full gap-4 h-[calc(100%-2rem)]"> {/* Subtract some height */}
          <div className="col-span-10 h-full">
            <EventCalendar
              events={allEvents}
              onEventReceive={handleEventReceive}
              onEventDrop={handleEventDrop}
              onEventResize={handleEventResize}
            />
          </div>
          <div className="col-span-2 h-full">
            <DraggableEvents events={events} />
          </div>
        </div>
      </main>
    </div>
  );
}