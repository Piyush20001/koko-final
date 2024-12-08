import React, { useState, useEffect } from 'react';
import { Users, School } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

type AuthMode = 'login' | 'signup' | 'club';

export function AuthForm() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clubId, setClubId] = useState('');
  const [clubRole, setClubRole] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup, error: authError } = useAuth();

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    try {
      if (mode === 'login') {
        await login(email, password);
      } else if (mode === 'club') {
        await login(email, password, { isClub: true, clubId, clubRole });
      } else {
        await signup(email, password, firstName, lastName);
      }
    } catch (err) {
      // Error is handled by the auth context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-dark-800 rounded-lg p-8 space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => setMode('login')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors
            ${mode === 'login' 
              ? 'bg-purple-600 text-white' 
              : 'bg-dark-700 text-gray-400 hover:text-white'}`}
        >
          <School className="w-4 h-4" />
          Student
        </button>
        <button
          onClick={() => setMode('club')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors
            ${mode === 'club'
              ? 'bg-purple-600 text-white'
              : 'bg-dark-700 text-gray-400 hover:text-white'}`}
        >
          <Users className="w-4 h-4" />
          Club Member
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              required
            />
          </>
        )}
        
        {mode === 'club' && (
          <>
            <input
              type="text"
              placeholder="Club ID"
              value={clubId}
              onChange={(e) => setClubId(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              required
            />
            <select
              value={clubRole}
              onChange={(e) => setClubRole(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              required
            >
              <option value="">Select Role</option>
              <option value="president">Club President</option>
              <option value="officer">Club Officer</option>
              <option value="member">Club Member</option>
            </select>
          </>
        )}

        <input
          type="text"
          placeholder="Email or username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
        />
        
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Please wait...' : mode === 'signup' ? 'Sign up' : 'Log in'}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-dark-600/50"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-dark-800 text-gray-400">OR</span>
        </div>
      </div>

      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 py-3 rounded-lg bg-[#0021A5] hover:bg-[#001A84] text-white font-medium transition-colors"
      >
        <img 
          src="/gator-logo.svg" 
          alt="UF Logo" 
          className="h-8 w-auto object-contain"
        />
        {mode === 'club' ? 'Verify with UFID' : 'Continue with UFID'}
      </button>

      {mode === 'login' && (
        <div className="text-center">
          <button className="text-purple-400 hover:text-purple-300 text-sm">
            Forgot password?
          </button>
        </div>
      )}

      <div className="pt-4 text-center border-t border-dark-600">
        <p className="text-gray-400">
          {mode === 'signup' ? "Already have an account? " : "Don't have an account? "}
          <button
            onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
            className="text-[#0021A5] hover:text-[#001A84] font-medium"
          >
            {mode === 'signup' ? 'Log in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
}