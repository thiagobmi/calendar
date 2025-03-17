
import * as React from 'react';

export const formatEventTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',  hour12: false });
};

export const createEventContent = (eventInfo: any) => {
  const start = eventInfo.event.start;
  const end = eventInfo.event.end || new Date(start.getTime() + 60*60*1000);
  
  const teacher = eventInfo.event.extendedProps?.teacher;
  const room = eventInfo.event.extendedProps?.room;
  
  const startTime = formatEventTime(start);
  const endTime = formatEventTime(end);
  
  // Check event duration in milliseconds
  const durationMs = end.getTime() - start.getTime();
  const durationHours = durationMs / (1000 * 60 * 60);
  
  // Only show additional details if event is long enough
  // Events shorter than 1 hour will only show the title and time
  const showDetails = durationHours > 1;
  
  // Get background color from the event (fallback to white if not set)
  const backgroundColor = eventInfo.event.backgroundColor || '#ffffff';
  const textColor = '#000000'; // Always use black text for better readability
  
  return (
    <div className='text-center w-full h-full p-1' style={{ backgroundColor, color: textColor }}>
      <b>{startTime} - {endTime}</b><br/>
      <b>{eventInfo.event.title}</b>
      {showDetails && teacher && <><br/><b>{teacher}</b></>}
      {showDetails && room && <><br/><b>{room}</b></>}
    </div>
  );
};