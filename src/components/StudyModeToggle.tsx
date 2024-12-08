import React from 'react';
import { BookOpen, Book } from 'lucide-react';

interface StudyModeToggleProps {
  isEnabled: boolean;
  onToggle: () => void;
}

export function StudyModeToggle({ isEnabled, onToggle }: StudyModeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
        ${isEnabled
          ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
          : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300'
        }`}
    >
      {isEnabled ? (
        <>
          <Book className="w-4 h-4" />
          <span>Study Mode On</span>
        </>
      ) : (
        <>
          <BookOpen className="w-4 h-4" />
          <span>Study Mode Off</span>
        </>
      )}
    </button>
  );
}