// FILE: app/(tabs)/menu.tsx
// This screen displays a list of all menu items and allows toggling their availability.

import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MenuItem, MenuItemCard } from '../../src/components/MenuItemCard'; // Import the new component

// Mock data for the menu - replace with data fetched from your API
const mockMenu: MenuItem[] = [
  { id: '1', name: 'Chicken Biryani Special', price: 400, category: 'Main Course', inStock: true, imageUrl: 'https://placehold.co/80x80/fdc500/fff?text=Food' },
  { id: '2', name: 'Paneer Butter Masala', price: 350, category: 'Main Course', inStock: true, imageUrl: 'https://placehold.co/80x80/32343e/fff?text=Food' },
  { id: '3', name: 'Masala Dosa', price: 180, category: 'South Indian', inStock: false, imageUrl: 'https://placehold.co/80x80/838699/fff?text=Food' },
  { id: '4', name: 'Veg Hakka Noodles', price: 280, category: 'Chinese', inStock: true, imageUrl: 'https://placehold.co/80x80/fdc500/fff?text=Food' },
  { id: '5', name: 'Margherita Pizza Large', price: 350, category: 'Italian', inStock: true, imageUrl: 'https://placehold.co/80x80/32343e/fff?text=Food' },
  { id: '6', name: 'Gulab Jamun (2 pcs)', price: 120, category: 'Desserts', inStock: true, imageUrl: 'https://placehold.co/80x80/838699/fff?text=Food' },
];

export default function MenuScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Manage Menu</Text>
        {/* We could add a search bar or filter buttons here later */}
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {mockMenu.length > 0 ? (
          mockMenu.map(item => (
            <MenuItemCard key={item.id} item={item} />
          ))
        ) : (
          <Text style={styles.emptyText}>Your menu is empty. Tap the '+' button to add items.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8f9',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e9ec',
    backgroundColor: '#fff', // Give header a solid background
  },
  headerTitle: {
    fontFamily: 'Sen',
    fontWeight: '700',
    fontSize: 28,
    color: '#32343e',
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 120, // Space for the nav bar
  },
  emptyText: {
    fontFamily: 'Sen',
    fontSize: 16,
    color: '#838699',
    textAlign: 'center',
    marginTop: 50,
  }
});