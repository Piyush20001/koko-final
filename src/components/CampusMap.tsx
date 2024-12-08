import React from 'react';
import { MapPin } from 'lucide-react';

interface Location {
  name: string;
  type: 'academic' | 'social' | 'landmark';
  time?: string;
  event?: string;
}

interface CampusMapProps {
  locations: Location[];
  onLocationSelect: (location: Location) => void;
}

export function CampusMap({ locations, onLocationSelect }: CampusMapProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">UF Campus Map</h2>
        <div className="mt-2 flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-600">Academic Events</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600">Social Events</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-sm text-gray-600">Campus Landmarks</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {locations.map((location, index) => (
          <button
            key={index}
            onClick={() => onLocationSelect(location)}
            className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors"
          >
            <MapPin className={`w-5 h-5 
              ${location.type === 'academic' ? 'text-blue-500' : 
                location.type === 'social' ? 'text-green-500' : 
                'text-purple-500'}`} 
            />
            <div className="text-left">
              <p className="font-medium text-gray-900">{location.name}</p>
              {location.event && (
                <p className="text-sm text-gray-600">
                  {location.event} {location.time && `- ${location.time}`}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}