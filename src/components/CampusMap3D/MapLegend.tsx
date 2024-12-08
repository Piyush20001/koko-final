import React from 'react';
import { MapPin } from 'lucide-react';

export function MapLegend() {
  const categories = [
    { label: 'Academic Buildings', color: 'bg-blue-500' },
    { label: 'Student Life', color: 'bg-green-500' },
    { label: 'Sports Facilities', color: 'bg-orange-500' },
    { label: 'Libraries', color: 'bg-purple-500' },
    { label: 'Landmarks', color: 'bg-yellow-500' }
  ];

  return (
    <div className="absolute bottom-4 left-4 bg-white dark:bg-dark-800 rounded-lg shadow-lg p-4">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
        Map Legend
      </h3>
      <div className="space-y-2">
        {categories.map(({ label, color }) => (
          <div key={label} className="flex items-center gap-2">
            <MapPin className={`w-4 h-4 ${color.replace('bg-', 'text-')}`} />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}