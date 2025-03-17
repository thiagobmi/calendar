import { useState } from 'react';

interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  room?: string;
  teacher?: string;
  id: number;
  end?: Date | string;
  backgroundColor?: string;
}

export function useCalendarEvents() {
const [events, setEvents] = useState([
  { title: 'Cálculo 1', id: 1, room: '101', teacher: 'Prof. Silva', backgroundColor: '#ffcdd2' },
  { title: 'Mat. Discreta', id: 2, room: '102', teacher: 'Prof. Souza', backgroundColor: '#bbdefb' },
  { title: 'Cálculo 2', id: 3, room: '103', teacher: 'Prof. Lima', backgroundColor: '#c8e6c9' },
  { title: 'Álgebra Linear', id: 4, room: '104', teacher: 'Prof. Costa', backgroundColor: '#fff9c4' },
  { title: 'Física 1', id: 5, room: '105', teacher: 'Prof. Almeida', backgroundColor: '#e1bee7' },
  { title: 'Física 2', id: 6, room: '106', teacher: 'Prof. Pereira', backgroundColor: '#b2dfdb' },
  { title: 'Química', id: 7, room: '107', teacher: 'Prof. Fernandes', backgroundColor: '#ffe0b2' },
  { title: 'Biologia', id: 8, room: '108', teacher: 'Prof. Oliveira', backgroundColor: '#d1c4e9' },
  { title: 'História', id: 9, room: '109', teacher: 'Prof. Santos', backgroundColor: '#b3e5fc' },
  { title: 'Geografia', id: 10, room: '110', teacher: 'Prof. Rodrigues', backgroundColor: '#f8bbd0' },
]);


  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showmodal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  
  // Helper function to snap times to the 7:30-based half-hour slots
  const snapToHalfHour = (date: Date): Date => {
    const roundedDate = new Date(date);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    // If minutes are less than 15, snap to the previous :30
    if (minutes < 15) {
      if (hours === 0) {
        // Special case: very early morning
        roundedDate.setHours(0);
        roundedDate.setMinutes(30, 0, 0);
      } else {
        roundedDate.setHours(hours - 1);
        roundedDate.setMinutes(30, 0, 0);
      }
    } 
    // If minutes are between 15 and 45, snap to the current hour's :30
    else if (minutes >= 15 && minutes < 45) {
      roundedDate.setMinutes(30, 0, 0);
    } 
    // If minutes are 45 or more, snap to the next hour's :30
    else {
      roundedDate.setHours(hours + 1);
      roundedDate.setMinutes(30, 0, 0);
    }
    
    return roundedDate;
  };

  const handleEventReceive = (info: any) => {
    console.log('Received event:', info.event);
  
    const startDate = info.event.start || new Date();
    // Snap the start time to the correct half-hour slot
    const snappedStart = snapToHalfHour(startDate);
    
    // Properly access extendedProps
    const teacher = info.event.extendedProps.teacher || '';
    const room = info.event.extendedProps.room || '';
    const backgroundColor = info.event.backgroundColor || '';
    
    // Remove the original event
    info.event.remove();
    
    const newEvent = {
      id: Date.now(),
      title: info.event.title,
      start: snappedStart,
      allDay: false,
      teacher,
      room,
      backgroundColor,
      borderColor: backgroundColor
    };
    
    console.log('New event with props:', newEvent);
    setAllEvents(prev => [...prev, newEvent]);
  };

  
  const handleEventDrop = (info: any) => {
    // Enforce half-hour snapping on drop
    if (info.event.start) {
      const snappedStart = snapToHalfHour(info.event.start);
      info.event.setStart(snappedStart);
    }
    
    if (info.event.end) {
      const snappedEnd = snapToHalfHour(info.event.end);
      info.event.setEnd(snappedEnd);
    }
    
    // Update the event in state to persist the changes
    setAllEvents(prev => {
      console.log(allEvents)
      return prev.map(event => {
        if (event.id === Number(info.event.id)) {
          return {
            ...event,
            start: info.event.start,
            end: info.event.end
          };
        }
        return event;
      });
    });
  };

  const handleEventResize = (info: any) => {
    // Force snap to correct half-hour slots on resize
    if (info.event.start) {
      const snappedStart = snapToHalfHour(info.event.start);
      info.event.setStart(snappedStart);
    }
    
    if (info.event.end) {
      const snappedEnd = snapToHalfHour(info.event.end);
      info.event.setEnd(snappedEnd);
    }
    
    console.log('Event resized:', info.event.start, info.event.end);
    
    // Update the event in state to persist the changes
    setAllEvents(prev => {
      return prev.map(event => {
        if (event.id === Number(info.event.id)) {
          return {
            ...event,
            start: info.event.start,
            end: info.event.end
          };
        }
        return event;
      });
    });
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