import { CalendarOptions } from '@fullcalendar/core';

export const calendarConfig: CalendarOptions = {
  initialView: "timeGridWeek",
  headerToolbar: {
    left: '',
    center: 'title',
    right: ''
  },
  dayHeaderFormat: { weekday: 'short' },
  nowIndicator: true,
  editable: true,
  selectable: false,
  selectMirror: true,
  droppable: true,
  slotMinTime: "07:30:00",
  slotMaxTime: "22:30:00",
  allDaySlot: false,
  
  displayEventTime: true,
  displayEventEnd: true,
  titleFormat: () => 'Agenda Semanal',
  
  // Update snap duration to 1 hour to match the 7:30, 8:30 pattern
  snapDuration: "01:00:00", 
  slotDuration: "01:00:00", 
  slotLabelInterval: "01:00:00",
  
  // Make default event duration match slot duration
  defaultTimedEventDuration: "01:00:00",
  forceEventDuration: true,
  
  // Additional constraints for time snapping
  eventDurationEditable: true,

  eventTimeFormat: {
    hour: '2-digit',
    minute: '2-digit',
    meridiem: false,
    hour12: false
  },
  
  // Add this to style Monday columns red
  slotLabelDidMount: (arg) => {
    // This affects the time labels on the left
  },
  
  // This will target the day columns
  datesSet: (dateInfo) => {
    // Wait for DOM to be ready
    setTimeout(() => {
      // Find all Monday columns
      const mondayCells = document.querySelectorAll('.fc-day.fc-day-mon');
      mondayCells.forEach((cell, index) => {
        if (index > 2) {
          // Change background color to red
          (cell as HTMLElement).style.backgroundColor = '#ffdddd';
        }
      });
    }, 0);
  }
};