import React from 'react';
import { NavigationItem } from '../../types/navigation';

export function NavItem({ icon: Icon, label, isActive, onClick }: NavigationItem) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all
        ${isActive 
          ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20' 
          : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
        }`}
    >
      <Icon className="w-4 h-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}