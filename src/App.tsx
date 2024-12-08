import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { CreateProfilePage } from './pages/CreateProfilePage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailsPage } from './pages/EventDetailsPage';
import { ClubEventPage } from './pages/ClubEventPage';
import { NavigationProvider } from './contexts/NavigationContext';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return user ? <>{children}</> : <Navigate to="/" />;
}

export function App() {
  return (
    <Router>
      <AuthProvider>
        <NavigationProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/home"
              element={<PrivateRoute><EventsPage /></PrivateRoute>}
            />
            <Route
              path="/events/:eventId"
              element={<PrivateRoute><EventDetailsPage /></PrivateRoute>}
            />
            <Route
              path="/create-profile"
              element={<PrivateRoute><CreateProfilePage /></PrivateRoute>}
            />
            <Route
              path="/club/events/new"
              element={<PrivateRoute><ClubEventPage /></PrivateRoute>}
            />
          </Routes>
        </NavigationProvider>
      </AuthProvider>
    </Router>
  );
}