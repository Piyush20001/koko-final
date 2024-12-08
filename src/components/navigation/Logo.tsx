import React from 'react';
import { Sparkles } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

export function Logo({ size = 'medium' }: LogoProps) {
  const sizeClasses = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-4xl'
  };

  const iconSizes = {
    small: 'w-5 h-5',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  return (
    <div className="flex items-center gap-2">
      <Sparkles className={`${iconSizes[size]} text-purple-600`} />
      <h1 className={`${sizeClasses[size]} font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent`}>
        Koko
      </h1>
    </div>
  );
}