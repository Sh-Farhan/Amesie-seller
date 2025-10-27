import { useFonts } from 'expo-font'; // Import useFonts
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { AuthProvider, useAuth } from '../src/state/AuthProvider';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
  const { session, isLoading, hasOnboarded } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // Load the custom fonts
  const [fontsLoaded] = useFonts({
    'Sen': require('../assets/fonts/Sen-VariableFont_wght.ttf'),
  });

  // Hide the splash screen only when both auth state and fonts are loaded
  const onLayoutRootView = useCallback(async () => {
    if (!isLoading && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoading, fontsLoaded]);


  
  // useEffect(() => {
  //   // Wait until both auth state and fonts are ready
  //   if (isLoading || !fontsLoaded) {
  //     return;
  //   }

  //   const inOnboardingGroup = segments[0] === '(onboarding)';
  //   const inAuthGroup = segments[0] === '(auth)';
    // const inAppGroup = segments[0] === '(tabs)';

  //   if (!hasOnboarded && !inOnboardingGroup) {
  //     router.replace('/(onboarding)');
  //   } else if (hasOnboarded && !session && !inAuthGroup) {
  //     router.replace('/(auth)/login');
  //   } else if (session && !inAppGroup) {
  //     router.replace('/(tabs)/dashboard');
  //   }
  // }, [hasOnboarded, session, isLoading, fontsLoaded, segments, router]);

  // // If still loading fonts or auth state, return null to keep splash screen visible
  // if (isLoading || !fontsLoaded) {
  //   return null;
  // }

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



