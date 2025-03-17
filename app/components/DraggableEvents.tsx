import React, { useEffect, useRef } from 'react';
import { Draggable } from '@fullcalendar/interaction';

interface DraggableEventsProps {
    events: Array<{ title: string; id: number, teacher: string, room: string, backgroundColor?: string }>;
}

export const DraggableEvents: React.FC<DraggableEventsProps> = ({ events }) => {
    const draggableRef = useRef<Draggable | null>(null);

    useEffect(() => {
        if (draggableRef.current) {
            draggableRef.current.destroy();
            draggableRef.current = null;
        }
        
        let draggable = document.getElementById('draggable-el');
        if (draggable) {
            draggableRef.current = new Draggable(draggable, {
                itemSelector: '.fc-event',
                eventData: function (eventEl) {
                    let title = eventEl.getAttribute("title");
                    let id = eventEl.getAttribute("data-id");
                    let teacher = eventEl.dataset.teacher;
                    let room = eventEl.dataset.room;
                    let backgroundColor = eventEl.dataset.color;

                    console.log('Event data:', title, id, teacher, room, backgroundColor);
                    const now = new Date();
                    now.setMinutes(0, 0, 0);

                    return {
                        title,
                        id,
                        start: now,
                        allDay: false,
                        teacher,
                        room,
                        backgroundColor,
                        borderColor: backgroundColor
                    };
                }
            });
        }
        
        return () => {
            if (draggableRef.current) {
                draggableRef.current.destroy();
                draggableRef.current = null;
            }
        };
    }, [events]); // Recria o draggable quando a lista de eventos mudar

    return (
        <div id="draggable-el" className='w-full border-2 p-2 rounded-md bg-gray-50 h-full overflow-y-auto'>
          <h1 className='font-bold text-lg text-center'>Disciplinas</h1>
          {events.map((event) => (
            <div
              className='fc-event border-2 p-1 mt-2 w-full rounded-md ml-auto text-center'
              title={event.title}
              data-id={event.id}
              data-teacher={event.teacher}
              data-room={event.room}
              data-color={event.backgroundColor}
              key={event.id}
              style={{ backgroundColor: event.backgroundColor || '#ffffff', color: '#000000', borderColor: event.backgroundColor || '#cccccc' }}
            >
              {event.title}
            </div>
          ))}
        </div>
      );
};