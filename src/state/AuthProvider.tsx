

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';

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
  session: string | null;
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // On app start, this effect runs once to check if a user session
    // is already stored on the device.
    const loadSession = async () => {
      try {
        const storedSession = await SecureStore.getItemAsync('session');
        if (storedSession) {
          setSession(storedSession);
        }
      } catch (e) {
        console.error('Failed to load session from storage:', e);
      } finally {
        // We're done loading, so the app can now render the correct screen.
        setIsLoading(false);
      }
    };

    loadSession();
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
    session,
    isLoading,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

