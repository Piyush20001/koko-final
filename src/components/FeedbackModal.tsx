import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { Event, EventFeedback } from '../types/events';

interface FeedbackModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: EventFeedback) => void;
}

export function FeedbackModal({ event, isOpen, onClose, onSubmit }: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      rating,
      comment,
      timestamp: new Date().toISOString()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative w-full max-w-md bg-white dark:bg-dark-800 rounded-xl shadow-xl">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Event Feedback
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                How would you rate this event?
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHoveredRating(value)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1 transition-colors"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        value <= (hoveredRating || rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Additional Comments
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 
                  bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
                placeholder="Share your thoughts about the event..."
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 
                  dark:hover:bg-dark-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!rating}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 
                  disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}