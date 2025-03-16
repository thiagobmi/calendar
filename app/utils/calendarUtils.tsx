
import * as React from 'react';

export const formatEventTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',  hour12: false });
};

export const createEventContent = (eventInfo: any) => {
  console.log('Event info:', eventInfo.event);
  console.log('Extended props:', eventInfo.event.extendedProps);

  const start = eventInfo.event.start;
  const end = eventInfo.event.end || new Date(start.getTime() + 60*60*1000);
  
  // Use optional chaining to avoid errors if extendedProps is undefined
  const teacher = eventInfo.event.teacher || '';
  const room = eventInfo.event.room || '';
  
  const startTime = formatEventTime(start);
  const endTime = formatEventTime(end);
  
  return (
    <>
      <div className='text-center'>
        <b>{startTime} - {endTime}</b><br/>
        <b>{eventInfo.event.title}</b>
        {teacher && <><br/><b>Teacher: {teacher}</b></>}
        {room && <><br/><b>Room: {room}</b></>}
      </div>
    </>
  );
};