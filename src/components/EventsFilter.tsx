import React from 'react';
import { Filter } from 'lucide-react';
import { EventCategory } from '../types/events';

interface EventsFilterProps {
  selectedCategory: EventCategory | 'all';
  onCategoryChange: (category: EventCategory | 'all') => void;
}

export function EventsFilter({ selectedCategory, onCategoryChange }: EventsFilterProps) {
  const categories: Array<{ value: EventCategory | 'all'; label: string }> = [
    { value: 'all', label: 'All Events' },
    { value: 'academic', label: 'Academic' },
    { value: 'social', label: 'Social' },
    { value: 'sports', label: 'Sports' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'career', label: 'Career' },
  ];

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      <Filter className="w-5 h-5 text-purple-600" />
      <div className="flex gap-2">
        {categories.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onCategoryChange(value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${selectedCategory === value
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}