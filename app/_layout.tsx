// // FILE: app/_layout.tsx
// // This is the root layout for the entire app. It works with the AuthProvider
// // to act as a "guard," showing the correct screen based on the user's state.

// import { Stack, useRouter, useSegments } from 'expo-router';
// import React, { useEffect } from 'react';
// import { ActivityIndicator, View } from 'react-native';
// // Make sure this path is correct based on your project structure
// import { AuthProvider, useAuth } from '../src/state/AuthProvider';

// const MainLayout = () => {
//   const { session, isLoading, hasOnboarded } = useAuth();
//   const segments = useSegments();
//   const router = useRouter();

//   useEffect(() => {
//     // Don't run any logic until the auth state has been loaded from storage
//     if (isLoading) {
//       return;
//     }

//     const inOnboardingGroup = segments[0] === '(onboarding)';
//     const inAuthGroup = segments[0] === '(auth)';
//     const inAppGroup = segments[0] === '(tabs)';

//     // This logic ensures we only redirect when necessary to prevent loops.
//     if (!hasOnboarded && !inOnboardingGroup) {
//       // If the user has NOT been onboarded and is NOT in the onboarding flow,
//       // redirect them to the onboarding screen.
//       router.replace('/(onboarding)');

//     } else if (hasOnboarded && !session && !inAuthGroup) {
//       // If the user HAS been onboarded, is NOT logged in, and is NOT in the auth flow,
//       // redirect them to the login screen.
//       router.replace('/(auth)/login');

//     } else if (session && !inAppGroup) {
//       // If the user IS logged in and is NOT in the main app,
//       // redirect them to the dashboard.
//       router.replace('/(tabs)/dashboard');
//     }
    
//   }, [hasOnboarded, session, isLoading, segments, router]);

//   // Show a loading spinner while we are determining which screen to show
//   if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   // This Stack navigator will render the correct group based on the logic above.
//   // The user will only ever see one of these screen groups at a time.
//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="(onboarding)" />
//       <Stack.Screen name="(auth)" />
//       <Stack.Screen name="(tabs)" />
//     </Stack>
//   );
// };

// // The root component that wraps our entire app in the AuthProvider
// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <MainLayout />
//     </AuthProvider>
//   );
// }
// FILE: app/_layout.tsx
// FINAL FIX: This version uses Expo's SplashScreen module to prevent any
// flicker or race conditions during the initial app load.

import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { AuthProvider, useAuth } from '../src/state/AuthProvider';

// Prevent the splash screen from auto-hiding before we have determined the initial route.
SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
  const { session, isLoading, hasOnboarded } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // This `onLayout` function will be called when the root view is rendered.
  // We use it to hide the splash screen only when we are ready.
  const onLayoutRootView = useCallback(async () => {
    // Hide the splash screen once we are no longer loading.
    if (!isLoading) {
      await SplashScreen.hideAsync();
    }
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) {
      return; // Do nothing while we are loading state from storage.
    }

    const inOnboardingGroup = segments[0] === '(onboarding)';
    const inAuthGroup = segments[0] === '(auth)';
    const inAppGroup = segments[0] === '(tabs)';

    // --- Redirection Logic ---
    if (!hasOnboarded && !inOnboardingGroup) {
      router.replace('/(onboarding)');
    } else if (hasOnboarded && !session && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (session && !inAppGroup) {
      router.replace('/(tabs)/dashboard');
    }
  }, [hasOnboarded, session, isLoading, segments, router]);

  // If we are still loading, we return `null`. The splash screen will remain visible.
  if (isLoading) {
    return null;
  }

  // Once loading is complete, we render the main navigator.
  // The `onLayout` prop will then hide the splash screen, ensuring a smooth transition.
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </View>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}


