import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-dark-800">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
        <p className="text-gray-600 dark:text-gray-300">
          Loading 3D Campus Map...
        </p>
      </div>
    </div>
  );
}