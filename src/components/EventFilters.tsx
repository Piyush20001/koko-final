import React from 'react';
import { Filter, Calendar, Users, Trophy, Palette, Briefcase, BookOpen } from 'lucide-react';
import { EventCategory } from '../types/events';

interface EventFiltersProps {
  selectedCategory: EventCategory | 'all';
  onCategoryChange: (category: EventCategory | 'all') => void;
}

export function EventFilters({ selectedCategory, onCategoryChange }: EventFiltersProps) {
  const categories: Array<{ value: EventCategory | 'all'; label: string }> = [
    { value: 'all', label: 'All Events', icon: Calendar },
    { value: 'academic', label: 'Academic', icon: BookOpen },
    { value: 'social', label: 'Social', icon: Users },
    { value: 'sports', label: 'Sports', icon: Trophy },
    { value: 'cultural', label: 'Cultural', icon: Palette },
    { value: 'career', label: 'Career', icon: Briefcase }
  ];

  return (
    <div className="rounded-lg p-4 bg-white dark:bg-dark-800">
      <div className="flex items-center gap-4">
        <Filter className="w-5 h-5 text-purple-600" />
        <div className="flex flex-wrap gap-2">
          {categories.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => onCategoryChange(value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${selectedCategory === value
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-dark-700/50 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600'
                }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}