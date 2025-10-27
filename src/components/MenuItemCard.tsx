// FILE: src/components/MenuItemCard.tsx
// This component displays a single menu item with details and an in-stock toggle.

import React, { useState } from 'react';
import { Image, StyleSheet, Switch, Text, View } from 'react-native';

// Define the structure of a menu item
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  imageUrl: string; // URL for the item's image
}

interface MenuItemCardProps {
  item: MenuItem;
  // We can add onPress later to navigate to a details/edit screen
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  // State to manage the toggle switch (In a real app, this would update the backend)
  const [isEnabled, setIsEnabled] = useState(item.inStock);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
        <Text style={styles.itemPrice}>₹{item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.stockContainer}>
        <Switch
          trackColor={{ false: '#767577', true: '#fdc500' }}
          thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }} // Make switch slightly smaller
        />
        <Text style={styles.stockLabel}>In Stock</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: 70, // Slightly smaller image
    height: 70,
    borderRadius: 10,
    backgroundColor: '#f0f0f0', // Placeholder background
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  itemName: {
    fontFamily: 'Sen',
    fontWeight: '700',
    fontSize: 16,
    color: '#32343e',
    marginBottom: 2,
  },
  itemCategory: {
    fontFamily: 'Sen',
    fontSize: 12,
    color: '#838699',
    marginBottom: 4,
  },
  itemPrice: {
    fontFamily: 'Sen',
    fontWeight: '700',
    fontSize: 15,
    color: '#32343e',
  },
  stockContainer: {
    alignItems: 'center',
    marginLeft: 10, // Add some space
  },
  stockLabel: {
    fontFamily: 'Sen',
    fontSize: 11, // Smaller label
    color: '#838699',
    marginTop: 2,
  },
});