// FILE: src/state/AuthProvider.tsx
// This file is now corrected to use AsyncStorage, making it work on both web and native.

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  signIn: () => void;
  signOut: () => void;
  completeOnboarding: () => void;
  session: string | null;
  hasOnboarded: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<string | null>(null);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadState = async () => {
      try {
        const onboardingStatus = await AsyncStorage.getItem('hasCompletedOnboarding');
        const completed = onboardingStatus === 'true';
        setHasOnboarded(completed);

        if (completed) {
          const storedSession = await AsyncStorage.getItem('session');
          if (storedSession) {
            setSession(storedSession);
          }
        }
      } catch (e) {
        console.error('Failed to load state from storage:', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadState();
  }, []);

  const authContextValue: AuthContextType = {
    signIn: async () => {
      const newSession = 'mock-session-token';
      await AsyncStorage.setItem('session', newSession);
      setSession(newSession);
    },
    signOut: async () => {
      await AsyncStorage.removeItem('session');
      setSession(null);
    },
    completeOnboarding: async () => {
      await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
      setHasOnboarded(true);
    },
    session,
    hasOnboarded,
    isLoading,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

