// FILE: app/(onboarding)/index.tsx
// This file provides a swipeable, three-page onboarding experience.

import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../../src/state/AuthProvider';

const { width } = Dimensions.get('window');

// Data for the three onboarding slides
const onboardingSlides = [
  {
    key: '1',
    title: 'Manage Your Orders',
    description: 'Accept new orders and track their status from new to ready for pickup.',
    // Replace with your own image URL
    imageUrl: 'https://placehold.co/600x400/E23744/FFF?text=Manage+Orders',
  },
  {
    key: '2',
    title: 'Control Your Menu',
    description: 'Easily add new items and toggle the availability of any dish in real-time.',
    // Replace with your own image URL
    imageUrl: 'https://placehold.co/600x400/17A2B8/FFF?text=Update+Menu',
  },
  {
    key: '3',
    title: 'Grow Your Business',
    description: 'Access insights, manage your restaurant profile, and watch your business thrive.',
    // Replace with your own image URL
    imageUrl: 'https://placehold.co/600x400/28A745/FFF?text=Grow+Business',
  },
];

export default function OnboardingScreen() {
  const { completeOnboarding } = useAuth();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handlePress = () => {
    completeOnboarding();
    router.replace('/(auth)/login');
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  // Renders each individual slide
  const renderSlide = ({ item }: { item: typeof onboardingSlides[0] }) => (
    <View style={styles.slide}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingSlides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      />

      <View style={styles.footer}>
        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {onboardingSlides.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === currentIndex ? styles.dotActive : {}]}
            />
          ))}
        </View>
        
        {/* Show the button only on the last slide */}
        {currentIndex === onboardingSlides.length - 1 && (
            <TouchableOpacity style={styles.button} onPress={handlePress}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: width * 0.8,
    height: 250,
    borderRadius: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  footer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  dotActive: {
    backgroundColor: '#E23744',
  },
  button: {
    backgroundColor: '#E23744',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

