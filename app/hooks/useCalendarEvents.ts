import { useState } from 'react';

interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
  end?: Date | string;
}

export function useCalendarEvents() {
const [events, setEvents] = useState([
    { title: 'Cálculo 1', id: 1 },
    { title: 'Mat. Discreta', id: 2 },
    { title: 'Cálculo 2', id: 3 },
    { title: 'Álgebra Linear', id: 4 },
    { title: 'Física 1', id: 5 },
    { title: 'Física 2', id: 6 },
    { title: 'Química', id: 7 },
    { title: 'Biologia', id: 8 },
    { title: 'História', id: 9 },
    { title: 'Geografia', id: 10 },
]);

  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showmodal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  
  // Function to add 2 hours to event
  const addTwoHoursToEvent = (startDate: Date) => {
    const endDate = new Date(startDate.getTime());
    endDate.setHours(endDate.getHours() + 2);
    return endDate;
  };

  const handleEventReceive = (info: any) => {
    const startDate = info.event.start || new Date();
    // Use default duration from calendar config instead of hardcoded 2 hours
    
    // Remove the original event
    info.event.remove();
    
    const newEvent = {
      id: Date.now(),
      title: info.event.title,
      start: startDate,
      // If no end is specified, the calendar will use defaultTimedEventDuration
      allDay: false
    };
    
    setAllEvents(prev => [...prev, newEvent]);
  };

  const handleEventDrop = (info: any) => {
    // No need to manually set end date
    console.log('Event moved:', info.event.start, info.event.end);
  };

  const handleEventResize = (info: any) => {
    // No need to force a specific duration, 
    // as the calendar will snap to hours based on snapDuration
    console.log('Event resized:', info.event.start, info.event.end);
  };


  return {
    events,
    allEvents,
    handleEventReceive,
    handleEventDrop,
    handleEventResize,
    showmodal,
    setShowModal,
    showDeleteModal,
    setShowDeleteModal,
    idToDelete,
    setIdToDelete
  };
}