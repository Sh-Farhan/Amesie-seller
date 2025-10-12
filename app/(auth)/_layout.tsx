import { Stack } from 'expo-router';
import React from 'react';

// This is the layout for the authentication screens.
// It sets up a simple stack navigator without any headers.
export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}