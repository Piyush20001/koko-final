import React, { createContext, useContext, useState } from 'react';
import { NavigationState } from '../types/navigation';

interface NavigationContextType {
  state: NavigationState;
  setShowMap: (show: boolean) => void;
  setShowProfile: (show: boolean) => void;
  setCurrentPath: (path: string) => void;
}

interface StudyModeContextType {
  studyMode: boolean;
  toggleStudyMode: () => void;
}

export const NavigationContext = createContext<NavigationContextType | undefined>(undefined);
export const StudyModeContext = createContext<StudyModeContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<NavigationState>(() => ({
    currentPath: '/',
    showMap: false,
    showProfile: false,
  }));

  const [studyMode, setStudyMode] = useState(() => 
    localStorage.getItem('studyMode') === 'true'
  );

  const toggleStudyMode = () => {
    setStudyMode(prev => {
      const newValue = !prev;
      localStorage.setItem('studyMode', String(newValue));
      return newValue;
    });
  };

  const setShowMap = (show: boolean) => {
    setState(prev => ({ ...prev, showMap: show }));
  };

  const setShowProfile = (show: boolean) => {
    setState(prev => ({ ...prev, showProfile: show }));
  };

  const setCurrentPath = (path: string) => {
    setState(prev => ({ ...prev, currentPath: path }));
  };

  return (
    <NavigationContext.Provider
      value={{
        state,
        setShowMap,
        setShowProfile,
        setCurrentPath
      }}
    >
      <StudyModeContext.Provider value={{ studyMode, toggleStudyMode }}>
        {children}
      </StudyModeContext.Provider>
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}

export function useStudyMode() {
  const context = useContext(StudyModeContext);
  if (!context) {
    throw new Error('useStudyMode must be used within a NavigationProvider');
  }
  return context;
}