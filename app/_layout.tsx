// FILE: app/_layout.tsx
// This is the root layout for the entire app. It works with the AuthProvider
// to act as a "guard," showing the correct screen based on the user's state.

import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
// Make sure this path is correct based on your project structure
import { AuthProvider, useAuth } from '../src/state/AuthProvider';

const MainLayout = () => {
  const { session, isLoading, hasOnboarded } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Don't run any logic until the auth state has been loaded from storage
    if (isLoading) {
      return;
    }

    const inOnboardingGroup = segments[0] === '(onboarding)';
    const inAuthGroup = segments[0] === '(auth)';
    const inAppGroup = segments[0] === '(tabs)';

    // This logic ensures we only redirect when necessary to prevent loops.
    if (!hasOnboarded && !inOnboardingGroup) {
      // If the user has NOT been onboarded and is NOT in the onboarding flow,
      // redirect them to the onboarding screen.
      router.replace('/(onboarding)');

    } else if (hasOnboarded && !session && !inAuthGroup) {
      // If the user HAS been onboarded, is NOT logged in, and is NOT in the auth flow,
      // redirect them to the login screen.
      router.replace('/(auth)/login');

    } else if (session && !inAppGroup) {
      // If the user IS logged in and is NOT in the main app,
      // redirect them to the dashboard.
      router.replace('/(tabs)/dashboard');
    }
    
  }, [hasOnboarded, session, isLoading, segments, router]);

  // Show a loading spinner while we are determining which screen to show
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // This Stack navigator will render the correct group based on the logic above.
  // The user will only ever see one of these screen groups at a time.
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

// The root component that wraps our entire app in the AuthProvider
export default function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

