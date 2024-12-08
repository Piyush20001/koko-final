import React from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface MapControlsProps {
  onClose: () => void;
}

export function MapControls({ onClose }: MapControlsProps) {
  return (
    <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-b from-black/10 to-transparent">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        UF Campus Map - 3D View
      </h2>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => window.dispatchEvent(new WheelEvent('wheel', { deltaY: -100 }))}
          className="p-2 rounded-full bg-white/90 dark:bg-dark-700/90 hover:bg-white dark:hover:bg-dark-600 transition-colors"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        
        <button
          onClick={() => window.dispatchEvent(new WheelEvent('wheel', { deltaY: 100 }))}
          className="p-2 rounded-full bg-white/90 dark:bg-dark-700/90 hover:bg-white dark:hover:bg-dark-600 transition-colors"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        
        <button
          onClick={() => {
            // Reset camera position
            const controls = document.querySelector('canvas')?.['__r3f']?.controls;
            if (controls) {
              controls.reset();
            }
          }}
          className="p-2 rounded-full bg-white/90 dark:bg-dark-700/90 hover:bg-white dark:hover:bg-dark-600 transition-colors"
          aria-label="Reset view"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/90 dark:bg-dark-700/90 hover:bg-white dark:hover:bg-dark-600 transition-colors"
          aria-label="Close map"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}