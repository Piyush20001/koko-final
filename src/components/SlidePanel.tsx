import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface SlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  side?: 'left' | 'right';
  duration?: number;
  children: React.ReactNode;
}

export function SlidePanel({
  isOpen,
  onClose,
  side = 'right',
  duration = 300,
  children
}: SlidePanelProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        style={{
          opacity: isOpen ? 1 : 0,
          transitionDuration: `${duration}ms`
        }}
      />
      <div
        className={`absolute inset-y-0 max-w-2xl w-full bg-white dark:bg-dark-800 shadow-2xl transition-transform duration-300 ease-in-out ${
          side === 'right' ? 'right-0' : 'left-0'
        }`}
        style={{
          transform: `translateX(${isOpen ? '0' : side === 'right' ? '100%' : '-100%'})`,
          transitionDuration: `${duration}ms`
        }}
      >
        <div className="absolute top-0 right-0 pt-4 pr-4">
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="h-full overflow-y-auto py-16 px-6">
          {children}
        </div>
      </div>
    </div>
  );
}