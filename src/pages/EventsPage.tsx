import React, { useState, useRef } from 'react';
import { MainNav } from '../components/MainNav';
import { EventCard } from '../components/EventCard';
import { EventFilters } from '../components/EventFilters';
import { EventCategory } from '../types/events';
import { EVENTS } from '../data/events';

const TRENDING_EVENTS = ['1', '3']; // IDs of trending events
const MOCK_FRIENDS = [
  { name: 'Alex', avatar: 'https://i.pravatar.cc/150?u=alex' },
  { name: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=sarah' },
  { name: 'Mike', avatar: 'https://i.pravatar.cc/150?u=mike' },
  { name: 'Emma', avatar: 'https://i.pravatar.cc/150?u=emma' }
];

import { useDarkMode } from '../hooks/useDarkMode';
import { CampusMap } from '../components/CampusMap/index';
import { SlidePanel } from '../components/SlidePanel';
import { ATTENDED_EVENTS } from '../data/events';
import { ProfilePage } from './ProfilePage';
import { useNavigation } from '../contexts/NavigationContext';
import { useSavedEvents } from '../hooks/useSavedEvents';
import { useStudyMode } from '../contexts/NavigationContext';

export function EventsPage() {
  const [isDark, setIsDark] = useDarkMode();
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [showAttended, setShowAttended] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const { state: { showMap, showProfile }, setShowMap, setShowProfile } = useNavigation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { studyMode } = useStudyMode();
  const { savedEvents, toggleSaveEvent: toggleSave, isSaved } = useSavedEvents();

  const events = React.useMemo(() => {
    if (showAttended) return ATTENDED_EVENTS;
    if (showSaved) return EVENTS.filter(event => isSaved(event.id));
    return EVENTS;
  }, [showAttended, showSaved, isSaved]);

  const filteredEvents = React.useMemo(() => {
    return selectedCategory === 'all'
      ? events
      : events.filter(event => event.category === selectedCategory);
  }, [selectedCategory, events]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollContainerRef.current) {
      const newScrollLeft = scrollLeft - walk;
      scrollContainerRef.current.scrollLeft = newScrollLeft;
      
      const itemWidth = 440; // width + gap
      const newIndex = Math.round(scrollContainerRef.current.scrollLeft / itemWidth);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < filteredEvents.length) {
        setCurrentIndex(newIndex);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    e.stopPropagation();
    
    const x = e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 3;
    if (scrollContainerRef.current) {
      const newScrollLeft = scrollLeft - walk;
      scrollContainerRef.current.scrollLeft = newScrollLeft;
      
      const itemWidth = 500;
      const newIndex = Math.round(scrollContainerRef.current.scrollLeft / itemWidth);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < filteredEvents.length) {
        setCurrentIndex(newIndex);
      }
    }
  };

  const handleFeedbackSubmit = (eventId: string, feedback: { rating: number; comment: string }) => {
    // In a real app, this would make an API call to update feedback
    console.log('Feedback submitted:', { eventId, feedback });
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-white">
      <MainNav isDark={isDark} onThemeToggle={() => setIsDark(!isDark)} />
      
      <main className="pt-16 w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4 px-4 max-w-7xl mx-auto w-full">
            <button
              onClick={() => {
                setShowAttended(false);
                setShowSaved(false);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${!showAttended && !showSaved ? 'bg-purple-600 text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
            >
              All Events
            </button>
            <button
              onClick={() => {
                setShowAttended(true);
                setShowSaved(false);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${showAttended ? 'bg-purple-600 text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
            >
              Attended Events ({ATTENDED_EVENTS.length})
            </button>
            <button
              onClick={() => {
                setShowSaved(true);
                setShowAttended(false);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${showSaved ? 'bg-purple-600 text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
            >
              Saved Events ({savedEvents.length})
            </button>
          </div>
        </div>

        <div className="w-full bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm py-4 border-y border-gray-200 dark:border-dark-700">
          <div className="max-w-7xl mx-auto px-4">
            <EventFilters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="mt-6 carousel-container hide-scrollbar w-full"
        >
          <div 
            className="carousel-slide"
          >
            {filteredEvents.map((event, index) => (
              <div 
                key={event.id}
                className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
                onClick={(e) => {
                  if (!isDragging) {
                    setCurrentIndex(index);
                  }
                }}
              >
                <EventCard
                  event={event}
                  isSaved={isSaved(event.id)}
                  onToggleSave={id => {
                    toggleSave(id);
                    // Force re-render if we're on saved events view
                    if (showSaved) {
                      setCurrentIndex(0);
                    }
                  }}
                  studyMode={studyMode}
                  isTrending={TRENDING_EVENTS.includes(event.id)}
                  friendsAttending={event.id === '3' ? MOCK_FRIENDS : []}
                  showFeedback={showAttended}
                  onFeedbackSubmit={showAttended ? handleFeedbackSubmit : undefined}
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      {showMap && (
        <CampusMap
          isOpen={showMap}
          onClose={() => setShowMap(false)}
          events={filteredEvents}
          onEventSelect={(event) => {
            setShowMap(false);
            const index = filteredEvents.findIndex(e => e.id === event.id);
            if (index !== -1) {
              setCurrentIndex(index);
            }
          }}
        />
      )}

      <SlidePanel
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        side="right"
      >
        <ProfilePage />
      </SlidePanel>
    </div>
  );
}