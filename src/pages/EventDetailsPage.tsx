import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Heart, Users, ArrowLeft } from 'lucide-react';
import { Event } from '../types/events';
import { EVENTS, ATTENDED_EVENTS } from '../data/events';
import { RegistrationModal } from '../components/registration/RegistrationModal';
import { FeedbackButton } from '../components/FeedbackButton';
import { useRegistration } from '../hooks/useRegistration';
import { useSavedEvents } from '../hooks/useSavedEvents';

export function EventDetailsPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [showRegistration, setShowRegistration] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(true);
  const { registerForEvent } = useRegistration();
  const { isSaved, toggleSaveEvent } = useSavedEvents();
  
  useEffect(() => {
    // Start animation when component mounts
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const event = React.useMemo(() => {
    return [...EVENTS, ...ATTENDED_EVENTS].find(e => e.id === eventId);
  }, [eventId]);

  const isAttended = ATTENDED_EVENTS.some(e => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen bg-dark-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <button
            onClick={() => navigate('/home')}
            className="text-purple-400 hover:text-purple-300"
          >
            Return to Events
          </button>
        </div>
      </div>
    );
  }

  const handleRegistration = async (formData: RegistrationFormData) => {
    await registerForEvent(event.id, formData);
    setShowRegistration(false);
    navigate('/home');
  };

  return (
    <div className={`min-h-screen bg-dark-900 transition-opacity duration-500 ease-out
      ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative h-[60vh] transition-transform duration-700 ease-out
        transform ${isAnimating ? 'translate-y-4' : 'translate-y-0'}">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out
            transform scale-[1.02] hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <button
          onClick={() => navigate('/home')}
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full
            bg-black/40 hover:bg-black/60 text-white transition-all duration-300
            hover:gap-3 transform hover:-translate-x-1"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Events
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto
          transition-all duration-700 delay-300 transform
          ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}">
          <h1 className="text-5xl font-bold text-white mb-4 transition-transform
            duration-500 transform hover:scale-[1.01]">{event.title}</h1>
          <div className="flex items-center gap-6 text-gray-200">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>{event.attendingCount} attending</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 transition-all duration-700 delay-500
        transform ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}">
        <div className="text-lg text-gray-200">
          <p>{event.description}</p>
        </div>

        <div className="bg-teal-900/20 p-6 rounded-xl border border-teal-500/20
          transition-all duration-300 hover:bg-teal-900/30 hover:border-teal-500/30
          transform hover:-translate-y-1">
          <h3 className="text-teal-300 font-semibold mb-2">Memory Tip</h3>
          <p className="text-teal-100">{event.memoryTip}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Key Takeaways</h3>
          <ul className="space-y-3">
            {event.keyTakeaways.map((takeaway, index) => (
              <li 
                key={index}
                className="flex items-start gap-3 text-gray-300 transition-all duration-300
                  transform hover:-translate-x-1 hover:text-gray-100"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600/20 
                  text-purple-400 flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                {takeaway}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          {event.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1.5 rounded-full text-sm bg-dark-800 text-gray-300
                border border-dark-700 transition-all duration-300
                hover:bg-dark-700 hover:border-dark-600 transform hover:-translate-y-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4 pt-8">
          {isAttended ? (
            <FeedbackButton
              event={event}
              onFeedbackSubmit={(feedback) => {
                console.log('Feedback:', feedback);
                navigate('/home');
              }}
            />
          ) : (
            <div className="flex gap-4 w-full">
              <button
                onClick={() => setShowRegistration(true)}
                className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white
                  rounded-lg font-medium transition-all duration-300
                  transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-600/20"
              >
                Register for Event
              </button>
              <button
                onClick={() => toggleSaveEvent(event.id)}
                className={`px-6 py-3 rounded-lg border ${
                  isSaved(event.id)
                    ? 'border-teal-500 text-teal-500'
                    : 'border-gray-300 text-gray-300'
                } hover:bg-dark-800 transition-all duration-300
                  transform hover:-translate-y-0.5 hover:shadow-lg
                  flex items-center gap-2`}
              >
                <Heart className="w-5 h-5" fill={isSaved(event.id) ? 'currentColor' : 'none'} />
                {isSaved(event.id) ? 'Saved' : 'Save Event'}
              </button>
            </div>
          )}
        </div>
      </div>

      <RegistrationModal
        event={event}
        isOpen={showRegistration}
        onClose={() => setShowRegistration(false)}
        onSubmit={handleRegistration}
      />
    </div>
  );
}