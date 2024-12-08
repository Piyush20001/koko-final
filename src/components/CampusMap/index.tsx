import React, { useState } from 'react';
import { X, MapPin } from 'lucide-react';
import { Event } from '../../types/events';
import { categories } from './MapLegend';

const LOCATIONS = [
  { id: 'davis', name: 'Davis Hall', x: 45, y: 35 },
  { id: 'student-center', name: 'Student Center', x: 30, y: 50 },
  { id: 'ocenter', name: "O'Connell Center", x: 65, y: 25 },
  { id: 'reitz', name: 'Reitz Union', x: 35, y: 45 },
  { id: 'csbuilding', name: 'Computer Science Building', x: 55, y: 40 },
  { id: 'gallery', name: 'University Gallery', x: 25, y: 60 },
  { id: 'recreation', name: 'Student Recreation', x: 70, y: 55 }
];

interface CampusMapProps {
  isOpen: boolean;
  onClose: () => void;
  events: Event[];
  onEventSelect: (event: Event) => void;
}

export function CampusMap({ isOpen, onClose, events, onEventSelect }: CampusMapProps) {
  if (!isOpen) return null;
  
  const [hoveredEvent, setHoveredEvent] = useState<Event | null>(null);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-4 md:inset-10 bg-white dark:bg-dark-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-b from-black/10 to-transparent z-10">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            UF Campus Map
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute inset-0 pt-16">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full bg-dark-900"
          >
            {/* Grid lines */}
            {Array.from({ length: 10 }).map((_, i) => (
              <React.Fragment key={i}>
                <line
                  x1={i * 10}
                  y1="0"
                  x2={i * 10}
                  y2="100"
                  stroke="#2d374850"
                  strokeWidth="0.1"
                />
                <line
                  x1="0"
                  y1={i * 10}
                  x2="100"
                  y2={i * 10}
                  stroke="#2d374850"
                  strokeWidth="0.1"
                />
              </React.Fragment>
            ))}

            {/* Paths */}
            <path
              d="M30,30 L70,70 M20,50 L80,50 M50,20 L50,80"
              stroke="#2d374880"
              strokeWidth="0.5"
              fill="none"
            />

            {events.map((event) => {
              const location = LOCATIONS.find(loc => 
                event.location.toLowerCase().includes(loc.name.toLowerCase())
              );
              if (!location) return null;

              return (
                <g
                  key={event.id}
                  transform={`translate(${location.x},${location.y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredEvent(event)}
                  onMouseLeave={() => setHoveredEvent(null)}
                  onClick={() => onEventSelect(event)}
                >
                  <circle
                    r="2"
                    fill={categories.find(c => c.type.toLowerCase() === event.category)?.color || '#666'}
                    className="transition-all duration-200 hover:r-3"
                  />
                  {hoveredEvent?.id === event.id && (
                    <foreignObject
                      x="3"
                      y="-2"
                      width="20"
                      height="10"
                      className="overflow-visible"
                    >
                      <div className="px-2 py-1 text-xs bg-white dark:bg-dark-700 rounded shadow-lg whitespace-nowrap">
                        {event.title}
                      </div>
                    </foreignObject>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white dark:bg-dark-800 rounded-lg shadow-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Event Types
          </h3>
          <div className="space-y-2">
            {categories.map(({ type, color }) => (
              <div key={type} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-sm text-gray-600 dark:text-gray-400">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}