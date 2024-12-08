import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { FeedbackModal } from './FeedbackModal';
import { Event } from '../types/events';

interface FeedbackButtonProps {
  event: Event;
  onFeedbackSubmit: (feedback: { rating: number; comment: string }) => void;
}

export function FeedbackButton({ event, onFeedbackSubmit }: FeedbackButtonProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 
          bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
      >
        <MessageSquare className="w-4 h-4" />
        {event.feedback ? 'Update Feedback' : 'Give Feedback'}
      </button>

      <FeedbackModal
        event={event}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={onFeedbackSubmit}
      />
    </>
  );
}