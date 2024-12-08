import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  isClub?: boolean;
  clubId?: string;
  clubRole?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string, clubInfo?: { isClub: boolean; clubId: string; clubRole: string }) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error('Error loading user:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string, clubInfo?: { isClub: boolean; clubId: string; clubRole: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate server validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get stored users
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = storedUsers.find((u: User) => 
        u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // Create session user without sensitive data
      const mockUser = {
        ...foundUser,
        password: undefined,
        ...(clubInfo && {
          isClub: clubInfo.isClub,
          clubId: clubInfo.clubId,
          clubRole: clubInfo.clubRole
        })
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      navigate('/home');
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Validate email format
      if (!email.endsWith('@ufl.edu')) {
        throw new Error('Please use your UF email address');
      }

      // Get existing users
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      if (storedUsers.some((u: User) => u.email === email)) {
        throw new Error('Email already registered');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new user
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        password,
        firstName,
        lastName,
      };
      
      // Store in users list
      localStorage.setItem('users', JSON.stringify([...storedUsers, mockUser]));
      
      // Create session without password
      const sessionUser = { ...mockUser, password: undefined };
      setUser(sessionUser);
      localStorage.setItem('user', JSON.stringify(sessionUser));
      navigate('/create-profile');
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Signup failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      error,
      login, 
      signup, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}