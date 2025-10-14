// FILE: src/state/AuthProvider.tsx
// This file creates a central "context" for managing user state.
// It handles both onboarding completion and the user's login session,
// making this information available to any component in the app.

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';

// This is a placeholder for a secure storage library.
// For native (iOS/Android), you should use a library like `expo-secure-store`.
// For this web preview, we'll use `localStorage` as a fallback.
const SecureStore = {
  getItemAsync: async (key: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        console.error('Local storage is unavailable:', e);
        return null;
      }
    }
    // In a real native app, you would implement this with expo-secure-store
    console.warn('SecureStore.getItemAsync is not implemented for this platform.');
    return null;
  },
  setItemAsync: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
      return;
    }
    console.warn('SecureStore.setItemAsync is not implemented for this platform.');
  },
  deleteItemAsync: async (key: string): Promise<void> => {
    if (Platform.OS === 'web') {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
      return;
    }
    console.warn('SecureStore.deleteItemAsync is not implemented for this platform.');
  },
};


// 1. Define the shape of the data and functions in our context
interface AuthContextType {
  signIn: () => void;
  signOut: () => void;
  completeOnboarding: () => void;
  session: string | null;
  hasOnboarded: boolean;
  isLoading: boolean;
}

// 2. Create the actual context
const AuthContext = createContext<AuthContextType | null>(null);

// 3. Create a custom hook for easy access
// Any component can call useAuth() to get the current session or sign out.
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// 4. Create the Provider component
// This component will wrap our app in `app/_layout.tsx`.
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<string | null>(null);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // On app start, this effect runs once to check the user's status.
    const loadState = async () => {
      try {
        // Check if the user has completed onboarding.
        const onboardingStatus = await SecureStore.getItemAsync('hasCompletedOnboarding');
        const completed = onboardingStatus === 'true';
        setHasOnboarded(completed);

        // If they have completed onboarding, then check if they have an active session.
        if (completed) {
          const storedSession = await SecureStore.getItemAsync('session');
          if (storedSession) {
            setSession(storedSession);
          }
        }
      } catch (e) {
        console.error('Failed to load state from storage:', e);
      } finally {
        // We're done loading, so the app can now render the correct screen.
        setIsLoading(false);
      }
    };

    loadState();
  }, []);

  const authContextValue: AuthContextType = {
    signIn: async () => {
      // In a real app, this is where you would make an API call to log the user in.
      // If the login is successful, the API would return a session token.
      const newSession = 'mock-session-token';

      await SecureStore.setItemAsync('session', newSession);
      setSession(newSession);
    },
    signOut: async () => {
      await SecureStore.deleteItemAsync('session');
      setSession(null);
    },
    completeOnboarding: async () => {
      // This function is called from the onboarding screen to mark it as completed.
      await SecureStore.setItemAsync('hasCompletedOnboarding', 'true');
      setHasOnboarded(true);
    },
    session,
    hasOnboarded,
    isLoading,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

