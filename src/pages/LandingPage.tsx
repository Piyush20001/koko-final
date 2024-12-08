import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AuthForm } from '../components/auth/AuthForm';
import { MobilePreview } from '../components/landing/MobilePreview';
import { AppStoreButtons } from '../components/landing/AppStoreButtons';
import { Footer } from '../components/landing/Footer';
import { Logo } from '../components/navigation/Logo';

export function LandingPage() { 
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mobile Preview Section */}
          <div className="hidden lg:block">
            <MobilePreview />
          </div>

          {/* Auth Section */}
          <div className="max-w-md mx-auto w-full space-y-8">
            <div className="flex justify-center mb-8">
              <Logo size="large" />
            </div>
            
            <AuthForm />
            
            <div className="text-center space-y-6">
              <AppStoreButtons />
              
              <p className="text-gray-400 text-sm">
                Get the app to explore campus events and connect with your peers.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}