import React from 'react';
import { Phone } from 'lucide-react';
import { Logo } from '../navigation/Logo';

export function MobilePreview() {
  return (
    <div className="relative">
      {/* Phone Frame */}
      <div className="relative mx-auto w-[280px] h-[580px] bg-dark-800 rounded-[3rem] border-4 border-dark-700 shadow-2xl overflow-hidden">
        {/* Status Bar */}
        <div className="absolute top-0 inset-x-0 h-6 bg-black">
          <div className="flex justify-between items-center px-6 py-1">
            <span className="text-xs text-white">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 bg-white rounded-sm"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-black rounded-b-3xl"></div>

        {/* App Content */}
        <div className="absolute inset-0 pt-8">
          {/* App Preview Content */}
          <div className="h-full bg-gradient-to-b from-purple-600 to-purple-900">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <Logo size="small" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20"></div>
                  <div className="w-8 h-8 rounded-full bg-white/20"></div>
                </div>
              </div>
              
              {/* Sample Content */}
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-white/20"></div>
                      <div className="flex-1">
                        <div className="h-2 w-24 bg-white/20 rounded"></div>
                        <div className="h-2 w-16 bg-white/20 rounded mt-1"></div>
                      </div>
                    </div>
                    <div className="h-32 bg-white/20 rounded-lg"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white rounded-full"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 blur-3xl"></div>
    </div>
  );
}