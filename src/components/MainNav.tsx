import React, { useMemo } from 'react';
import { MapPin, BookOpen, Bookmark, User, Calendar, LogOut } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { StudyModeToggle } from './StudyModeToggle';
import { NavItem } from './navigation/NavItem';
import { Logo } from './navigation/Logo';
import { useNavigation, useStudyMode } from '../contexts/NavigationContext';
import { useAuth } from '../contexts/AuthContext';
import { NavigationItem } from '../types/navigation';

interface MainNavProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

export function MainNav({ isDark, onThemeToggle }: MainNavProps) {
  const { state, setShowMap, setShowProfile } = useNavigation();
  const { studyMode, toggleStudyMode } = useStudyMode();
  const { logout } = useAuth();
  
  const navItems: NavigationItem[] = useMemo(() => [
    {
      id: 'events',
      label: 'Events',
      icon: Calendar,
      isActive: state.currentPath === '/'
    },
    {
      id: 'map',
      label: state.showMap ? 'Hide Map' : 'Show Map',
      icon: MapPin,
      onClick: () => setShowMap(!state.showMap)
    },
    {
      id: 'saved',
      label: 'Saved',
      icon: Bookmark
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      onClick: () => setShowProfile(true)
    }
  ], [state.currentPath, state.showMap, setShowMap, setShowProfile]);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-md bg-glass-light dark:bg-glass-dark border-b border-gray-200/50 dark:border-dark-700/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo />

            {/* Navigation Items */}
            <nav className="flex items-center space-x-8">
              {navItems.map((item) => (
                <NavItem key={item.id} {...item} />
              ))}
              <StudyModeToggle isEnabled={studyMode} onToggle={toggleStudyMode} />
              <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}