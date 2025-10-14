// FILE: app/(onboarding)/_layout.tsx
// A simple stack navigator for the onboarding flow.

import { Stack } from 'expo-router';
import React from 'react';

export default function OnboardingLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}