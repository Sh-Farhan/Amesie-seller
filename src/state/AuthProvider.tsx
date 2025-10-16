// // FILE: src/state/AuthProvider.tsx
// // This file is now corrected to use AsyncStorage, making it work on both web and native.

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, { createContext, useContext, useEffect, useState } from 'react';

// interface AuthContextType {
//   signIn: () => void;
//   signOut: () => void;
//   completeOnboarding: () => void;
//   session: string | null;
//   hasOnboarded: boolean;
//   isLoading: boolean;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [session, setSession] = useState<string | null>(null);
//   const [hasOnboarded, setHasOnboarded] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const loadState = async () => {
//       try {
//         const onboardingStatus = await AsyncStorage.getItem('hasCompletedOnboarding');
//         const completed = onboardingStatus === 'true';
//         setHasOnboarded(completed);

//         if (completed) {
//           const storedSession = await AsyncStorage.getItem('session');
//           if (storedSession) {
//             setSession(storedSession);
//           }
//         }
//       } catch (e) {
//         console.error('Failed to load state from storage:', e);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadState();
//   }, []);

//   const authContextValue: AuthContextType = {
//     signIn: async () => {
//       const newSession = 'mock-session-token';
//       await AsyncStorage.setItem('session', newSession);
//       setSession(newSession);
//     },
//     signOut: async () => {
//       await AsyncStorage.removeItem('session');
//       setSession(null);
//     },
//     completeOnboarding: async () => {
//       await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
//       setHasOnboarded(true);
//     },
//     session,
//     hasOnboarded,
//     isLoading,
//   };

//   return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
// }

// FILE: src/state/AuthProvider.tsx
// This version contains the corrected logic for initializing and checking the onboarding status.

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Interface remains the same
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
  // FIX 1: Initialize hasOnboarded to false.
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadState = async () => {
      try {
        const onboardingStatus = await AsyncStorage.getItem('hasCompletedOnboarding');
        
        // FIX 2: Explicitly check if the stored value is the string 'true'.
        // If it's null (new user), this will correctly result in false.
        setHasOnboarded(onboardingStatus === 'true');

        // This part remains the same
        const sessionStatus = await AsyncStorage.getItem('session');
        if (sessionStatus) {
          setSession(sessionStatus);
        }
      } catch (e) {
        console.error('Failed to load state from storage:', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadState();
  }, []);

  // The rest of the file remains the same...
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

  
