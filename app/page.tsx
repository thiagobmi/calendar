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
    <div className="flex flex-col h-screen bg-gray-600">
      <CalendarHeader />
      
      <main className="flex-1 px-4 pt-0 pb-8 transition-colors h-[calc(100vh-5rem)] overflow-y-hidden">
        <div className="flex h-full gap-4">
          {/* Sidebar (agora à esquerda) */}
          <div className="w-72 h-full">
            <DraggableEvents events={availableEvents} />
          </div>
          
          {/* Calendário */}
          <div className="flex-grow">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-sm shadow-md h-full overflow-hidden">
              <EventCalendar
                events={allEvents}
                onEventReceive={handleEventReceive}
                onEventDrop={handleEventDrop}
                onEventResize={handleEventResize}
                onEventClick={handleEventClick}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}