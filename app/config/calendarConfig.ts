export const calendarConfig = {
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
  snapDuration: "01:00:00", // Full hour snap
  slotDuration: "01:00:00", // Show 1-hour slots instead of 30-min slots
  slotLabelInterval: "01:00:00", // Label every hour
  defaultTimedEventDuration: "01:00:00", // Default to 1-hour events
  eventTimeFormat: {
    hour: '2-digit',
    minute: '2-digit',
    meridiem: false,
    hour12: false
  }
};