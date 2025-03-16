
import * as React from 'react';

export const formatEventTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const createEventContent = (eventInfo: any) => {
  const start = eventInfo.event.start;
  const end = eventInfo.event.end || new Date(start.getTime() + 60*60*1000); // 1 hour default if no end
  
  // Format for display
  const startTime = formatEventTime(start);
  const endTime = formatEventTime(end);
  
  return (
    <>
      {startTime}
      <i> {eventInfo.event.title}</i>
      <span> - {endTime}</span>
    </>
  );
};