import { Redirect, Stack } from 'expo-router';
import React from 'react';

// This is a mock auth hook. In a real app, this would check for a token
// in secure storage and make an API call.
function useAuth() {
  // To test the two states, you can manually change this value.
  // - null = logged out
  // - 'some-token' = logged in
  const [userToken, setUserToken] = React.useState<string | null>(null);

  return {
    userToken,
    // In a real app, you'd have a loading state while checking the token.
    isLoading: false, 
  };
}

export default function RootLayout() {
  const { userToken, isLoading } = useAuth();

  // You can return a loading screen here while the token is being checked.
  if (isLoading) {
    return null; // Or a <SplashScreen /> component
  }

  // If the user is logged in, this will render the (tabs) layout.
  // If they are not, it will automatically redirect to the (auth) layout's entry screen.
  if (!userToken) {
    // Redirect to the login page.
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

