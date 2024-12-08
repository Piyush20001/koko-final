import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Heart, TrendingUp, Users, Star } from 'lucide-react';
import { Event } from '../types/events';
import { EventDetailsModal } from './EventDetailsModal';
import { AcademicInfo } from './AcademicInfo';
import { FeedbackButton } from './FeedbackButton';
import { useNavigate } from 'react-router-dom';

interface EventCardProps {
  event: Event;
  isSaved: boolean;
  studyMode?: boolean;
  onToggleSave: (id: string) => void;
  isTrending?: boolean;
  friendsAttending?: { name: string; avatar: string }[];
  showFeedback?: boolean;
  onFeedbackSubmit?: (eventId: string, feedback: { rating: number; comment: string }) => void;
}

export function EventCard({ 
  event, 
  isSaved, 
  studyMode = false, 
  onToggleSave,
  isTrending = false,
  friendsAttending = [],
  showFeedback = false,
  onFeedbackSubmit
}: EventCardProps) {
  const navigate = useNavigate();

  const handleFeedbackSubmit = (feedback: { rating: number; comment: string }) => {
    onFeedbackSubmit?.(event.id, feedback);
  };
  return (
    <div 
      className="group bg-white dark:bg-dark-800 rounded-lg shadow-sm w-[360px] cursor-pointer
        transition-all duration-200 hover:shadow-lg"
      onClick={(e) => {
        if (!e.defaultPrevented) {
          navigate(`/events/${event.id}`);
        }
      }}
    >
        {/* Event Banner */}
        {isTrending && (
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-red-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            Trending
          </div>
        )}
        <div className="relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h2 className="text-xl font-bold text-white tracking-tight">{event.title}</h2>
          </div>
        </div>

        <div className="p-4">
          {friendsAttending.length > 0 && (
            <div className="mb-3 flex items-center gap-2">
              <div className="flex -space-x-2">
                {friendsAttending.slice(0, 3).map((friend, index) => (
                  <img
                    key={index}
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-6 h-6 rounded-full border-2 border-white dark:border-dark-800"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {friendsAttending.length > 3
                  ? `${friendsAttending.slice(0, 3).map(f => f.name).join(', ')} and ${friendsAttending.length - 3} others are going`
                  : `${friendsAttending.map(f => f.name).join(', ')} ${friendsAttending.length === 1 ? 'is' : 'are'} going`}
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-500" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-500" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <MapPin className="w-4 h-4 text-teal-500" />
              <span>{event.location}</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            {showFeedback && event.feedback && (
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">{event.feedback.rating}</span>
              </div>
            )}
            {showFeedback && onFeedbackSubmit && (
              <FeedbackButton event={event} onFeedbackSubmit={handleFeedbackSubmit} />
            )}
            <button
              className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 
                transition-colors ${
                isSaved 
                  ? 'text-teal-600' 
                  : 'text-gray-400'
              }`}
              aria-label={isSaved ? 'Remove from saved' : 'Save event'}
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(event.id);
              }}
            >
              <Heart className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
        
        {studyMode && event.category === 'academic' && event.academicInfo && (
          <div className="border-t border-gray-200 dark:border-dark-700 mt-4 pt-4">
            <AcademicInfo event={event} />
          </div>
        )}
      </div>
  );
}