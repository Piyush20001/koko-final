import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Heart, X, Users } from 'lucide-react';
import { Event } from '../types/events';
import { RegistrationModal } from './registration/RegistrationModal';
import { FeedbackButton } from './FeedbackButton';
import { useRegistration } from '../hooks/useRegistration';

interface EventDetailsModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  isAttended?: boolean;
  onFeedbackSubmit?: (feedback: { rating: number; comment: string }) => void;
}

export function EventDetailsModal({ 
  event, 
  isOpen, 
  onClose, 
  isSaved,
  onToggleSave,
  isAttended = false,
  onFeedbackSubmit
}: EventDetailsModalProps) {
  const [showRegistration, setShowRegistration] = useState(false);
  const { registerForEvent } = useRegistration();

  if (!isOpen) return null;

  const handleRegistration = async (formData: RegistrationFormData) => {
    await registerForEvent(event.id, formData);
    setShowRegistration(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-lg overflow-y-auto overscroll-none">
        <div className="min-h-screen relative">
          {/* Header */}
          <div className="relative h-[50vh]">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-4xl font-bold text-white tracking-tight mb-4">{event.title}</h2>
              <div className="flex items-center gap-4">
                <span className={`px-4 py-1.5 rounded-full text-sm font-medium
                  ${event.priority === 'high' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'}`}
                >
                  {event.priority.toUpperCase()}
                </span>
                <span className="text-sm text-gray-300 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {event.attendingCount} attending
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 
                transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-400" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-teal-400" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-teal-400" />
                <span>{event.location}</span>
              </div>
            </div>

            <p className="text-gray-200 text-base leading-relaxed">
              {event.description}
            </p>
            
            <div className="bg-teal-900/20 p-4 rounded-lg border border-teal-500/20">
              <p className="text-teal-200 text-base">
                <span className="font-medium">Memory Tip:</span> {event.memoryTip}
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Key Takeaways
              </h3>
              <ul className="list-disc list-inside space-y-3">
                {event.keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="text-gray-200 text-base">
                    {takeaway}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {event.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-dark-700/50 text-gray-200 
                    text-sm rounded-full border border-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              {isAttended ? (
                <div className="flex-1">
                  {onFeedbackSubmit && (
                    <FeedbackButton 
                      event={event} 
                      onFeedbackSubmit={onFeedbackSubmit}
                    />
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => setShowRegistration(true)}
                  className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white
                    rounded-lg font-medium text-base transition-colors"
                >
                  Register for Event
                </button>
              )}
              <button
                onClick={() => onToggleSave(event.id)}
                className={`px-4 py-3 rounded-lg border ${
                  isSaved 
                    ? 'border-teal-500 text-teal-500' 
                    : 'border-gray-300 text-gray-600'
                } hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors`}
              >
                <Heart className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <RegistrationModal
        event={event}
        isOpen={showRegistration}
        onClose={() => setShowRegistration(false)}
        onSubmit={handleRegistration}
      />
    </>
  );
}