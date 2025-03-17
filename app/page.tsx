"use client"
import { useEffect } from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

import { CalendarHeader } from '@/app/components/CalendarHeader'
import { EventCalendar } from '@/app/components/EventCalendar'
import { DraggableEvents } from '@/app/components/DraggableEvents'
import { useCalendarEvents } from '@/app/hooks/useCalendarEvents'

// Importar estilos
import '@/app/styles/calendar.css'

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
  
  // Adicionar classe para habilitar transições suaves
  useEffect(() => {
    document.body.classList.add('transition-colors');
    return () => {
      document.body.classList.remove('transition-colors');
    };
  }, []);
  
  return (
    <div className="flex flex-col h-screen">
      <CalendarHeader />
      <main className="flex-1 px-4 pt-0 pb-8 transition-colors">
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