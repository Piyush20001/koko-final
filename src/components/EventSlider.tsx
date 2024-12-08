import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Event } from '../types/events';
import { EventCard } from './EventCard';

interface EventSliderProps {
  events: Event[];
  savedEvents: string[];
  onToggleSave: (id: string) => void;
}

export function EventSlider({ events, savedEvents, onToggleSave }: EventSliderProps) {
  if (!events.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500 dark:text-gray-400">No events to display</p>
      </div>
    );
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const handleNext = () => {
    if (isAnimating) return;
    setDirection('right');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((current) => (current + 1) % events.length);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setDirection('left');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((current) => (current - 1 + events.length) % events.length);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="relative w-full h-full overflow-hidden group">
      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 dark:bg-dark-800/90 shadow-lg hover:bg-white dark:hover:bg-dark-700 transition-colors"
        aria-label="Previous event"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 dark:bg-dark-800/90 shadow-lg hover:bg-white dark:hover:bg-dark-700 transition-colors"
        aria-label="Next event"
      >
        <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
      </button>

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `translate3d(${isAnimating && events.length > 1 ? direction === 'right'
                ? '-100%'
                : '100%'
              : '0'
          }, 0, 0)`,
          opacity: isAnimating ? 0 : 1,
          transition: 'all 0.3s ease-in-out',
          willChange: 'transform, opacity'
        }}
      >
        <div className="w-full max-w-3xl px-4">
          <EventCard
            event={events[currentIndex]}
            isSaved={savedEvents.includes(events[currentIndex].id)}
            onToggleSave={onToggleSave}
          />
        </div>
      </div>
      
      {/* Preload next event for smooth transition */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `translate3d(${isAnimating && events.length > 1
              ? '0'
              : direction === 'right'
                ? '100%'
                : '-100%'
          }, 0, 0)`,
          opacity: isAnimating ? 1 : 0,
          transition: 'all 0.3s ease-in-out',
          willChange: 'transform, opacity'
        }}
      >
        <div className="w-full max-w-3xl px-4">
          <EventCard
            event={events[
              direction === 'right'
                ? (currentIndex + 1) % events.length
                : (currentIndex - 1 + events.length) % events.length
            ]}
            isSaved={savedEvents.includes(
              events[
                direction === 'right'
                  ? (currentIndex + 1) % events.length
                  : (currentIndex - 1 + events.length) % events.length
              ].id
            )}
            onToggleSave={onToggleSave}
          />
        </div>
      </div>
      
      {/* Progress Indicators */}
      {events.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {events.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                currentIndex === index
                  ? 'bg-teal-500 dark:bg-teal-400'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}