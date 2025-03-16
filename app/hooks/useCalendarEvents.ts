import { useState } from 'react';

interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  room?: string;
  teacher?: string;
  id: number;
  end?: Date | string;
}

export function useCalendarEvents() {
const [events, setEvents] = useState([
  { title: 'Cálculo 1', id: 1, room: '101', teacher: 'Prof. Silva' },
  { title: 'Mat. Discreta', id: 2, room: '102', teacher: 'Prof. Souza' },
  { title: 'Cálculo 2', id: 3, room: '103', teacher: 'Prof. Lima' },
  { title: 'Álgebra Linear', id: 4, room: '104', teacher: 'Prof. Costa' },
  { title: 'Física 1', id: 5, room: '105', teacher: 'Prof. Almeida' },
  { title: 'Física 2', id: 6, room: '106', teacher: 'Prof. Pereira' },
  { title: 'Química', id: 7, room: '107', teacher: 'Prof. Fernandes' },
  { title: 'Biologia', id: 8, room: '108', teacher: 'Prof. Oliveira' },
  { title: 'História', id: 9, room: '109', teacher: 'Prof. Santos' },
  { title: 'Geografia', id: 10, room: '110', teacher: 'Prof. Rodrigues' },
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
    console.log('Received event:', info.event);
    console.log('Extended props:', info.event.extendedProps);
  
    const startDate = info.event.start || new Date();
    
    // Properly access extendedProps
    const teacher = info.event.extendedProps?.teacher || '';
    const room = info.event.extendedProps?.room || '';
    
    // Remove the original event
    info.event.remove();
    
    const newEvent = {
      id: Date.now(),
      title: info.event.title,
      start: startDate,
      allDay: false,
      teacher,
      room
    };
    
    console.log('New event with props:', newEvent);
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