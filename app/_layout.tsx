import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
// import { AuthProvider, useAuth } from '../src/state/AuthProvider';
import { AuthProvider, useAuth } from '@/src/state/AuthProvider';

const MainLayout = () => {
  const { session, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Wait until the auth state is loaded
    if (isLoading) {
      return;
    }

    const inAuthGroup = segments[0] === '(auth)';

    // If the user is signed in and not in the main app area,
    // redirect them to the dashboard.
    if (session && !inAuthGroup) {
      router.replace('/(tabs)/dashboard');
    } 
    // If the user is not signed in and not in the auth group already,
    // redirect them to the login page.
    else if (!session && !inAuthGroup) {
      router.replace('/(auth)/login');
    }
  }, [session, isLoading, segments, router]);

  // Show a loading indicator while we check for a session
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // This Stack navigator contains both the auth and main app layouts.
  // The logic above determines which one is currently active.
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
};

// The actual root component wraps the entire app in the AuthProvider
export default function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}