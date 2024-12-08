import { useState, useEffect } from 'react';

export function useSavedEvents() {
  const [savedEvents, setSavedEvents] = useState<string[]>(() => {
    const saved = localStorage.getItem('savedEvents');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
  }, [savedEvents]);

  const toggleSaveEvent = (eventId: string) => {
    setSavedEvents(prev =>
      prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  return {
    savedEvents,
    toggleSaveEvent,
    isSaved: (eventId: string) => savedEvents.includes(eventId)
  };
}