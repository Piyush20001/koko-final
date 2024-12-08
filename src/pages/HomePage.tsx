import React, { useState } from 'react';
import { MainNav } from '../components/MainNav';
import { EventCard } from '../components/EventCard';
import { EventFilters } from '../components/EventFilters';
import { EventCategory } from '../types/events';
import { EVENTS } from '../data/events';
import { useDarkMode } from '../hooks/useDarkMode';
import { CampusMap3D } from '../components/CampusMap3D';

export function HomePage() {
  const [isDark, setIsDark] = useDarkMode();
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [savedEvents, setSavedEvents] = useState<string[]>([]);
  const [showMap, setShowMap] = useState(false);

  const filteredEvents = selectedCategory === 'all'
    ? EVENTS
    : EVENTS.filter(event => event.category === selectedCategory);

  const toggleSaveEvent = (eventId: string) => {
    setSavedEvents(prev =>
      prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <MainNav isDark={isDark} onThemeToggle={() => setIsDark(!isDark)} />
      
      <main className="pt-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${!savedEvents.length ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              All Events
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${savedEvents.length ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Saved Events ({savedEvents.length})
            </button>
          </div>
        </div>

        <EventFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="mt-6 grid gap-6">
          {filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              isSaved={savedEvents.includes(event.id)}
              onToggleSave={toggleSaveEvent}
            />
          ))}
        </div>
      </main>

      {showMap && (
        <CampusMap3D
          isOpen={showMap}
          onClose={() => setShowMap(false)}
        />
      )}
    </div>
  );
}