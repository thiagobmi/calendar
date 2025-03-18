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
    }, [events]);

    return (
        <div className="flex flex-col h-full">
            <div className="bg-indigo-600 dark:bg-indigo-700 text-white p-2 rounded-t-lg shadow-md">
                <h2 className="font-bold text-lg text-center">Disciplinas</h2>
                <p className="text-xs text-center mt-1 text-indigo-100">Arraste para o calendário</p>
            </div>
            
            <div id="draggable-el" className="flex-grow overflow-y-auto p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-b-lg shadow-md">
                {events.length === 0 ? (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400 italic">
                        Todas as disciplinas foram adicionadas ao calendário
                    </div>
                ) : (
                    events.map((event) => (
                        <div
                            className="fc-event mb-3 p-2 rounded-md shadow-sm cursor-move hover:shadow-md transition-shadow duration-200 flex flex-col"
                            title={event.title}
                            data-id={event.id}
                            data-teacher={event.teacher}
                            data-room={event.room}
                            data-color={event.backgroundColor}
                            key={event.id}
                            style={{ 
                                backgroundColor: event.backgroundColor || '#ffffff', 
                                color: '#000000', 
                                borderLeft: `4px solid ${event.backgroundColor || '#cccccc'}`
                            }}
                        >
                            <span className="font-medium">{event.title}</span>
                            <div className="flex justify-between mt-1 text-xs text-gray-700">
                                <span>{event.teacher}</span>
                                <span>Sala {event.room}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};