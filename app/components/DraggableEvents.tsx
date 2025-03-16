import React, { useEffect } from 'react';
import { Draggable } from '@fullcalendar/interaction';

interface DraggableEventsProps {
    events: Array<{ title: string; id: number }>;
}

export const DraggableEvents: React.FC<DraggableEventsProps> = ({ events }) => {
    useEffect(() => {
        let draggable = document.getElementById('draggable-el');
        if (draggable) {
            new Draggable(draggable, {
                itemSelector: '.fc-event',
                // In DraggableEvents.tsx
                eventData: function (eventEl) {
                    let title = eventEl.getAttribute("title");
                    let id = eventEl.getAttribute("data");

                    // Create default start time
                    const now = new Date();
                    // Round down to the nearest hour
                    now.setMinutes(0, 0, 0);

                    return {
                        title,
                        id,
                        start: now,
                        allDay: false
                    };
                }
            });
        }
    }, []);

    return (
        <div id="draggable-el" className='w-full border-2 p-2 rounded-md bg-violet-100 h-full overflow-y-auto'>
          <h1 className='font-bold text-lg text-center'>Drag Event</h1>
          {events.map((event) => (
            <div
              className='fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white'
              title={event.title}
              key={event.id}
              //data={event.id.toString()}
            >
              {event.title}
            </div>
          ))}
        </div>
      );
};