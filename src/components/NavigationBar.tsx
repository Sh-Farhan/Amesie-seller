import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface NavigationBarProps {
  activeTab?: string;
  onTabPress?: (tab: string) => void;
}

const navigationItems = [
  { icon: 'home', name: 'dashboard', library: 'Ionicons' as const, size: 28 },
  { icon: 'receipt', name: 'orders', library: 'Ionicons' as const, size: 28 },
  { icon: 'add-circle', name: 'add', library: 'Ionicons' as const, size: 64, isCenter: true },
  { icon: 'restaurant', name: 'menu', library: 'Ionicons' as const, size: 28 },
  { icon: 'person', name: 'profile', library: 'Ionicons' as const, size: 28 },
];

export const NavigationBar: React.FC<NavigationBarProps> = ({
  activeTab = 'dashboard',
  onTabPress,
}) => {
  const getIconColor = (itemName: string, isCenter: boolean) => {
    if (isCenter) return '#fdc500';
    return activeTab === itemName ? '#fdc500' : '#9b9ba5';
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        {navigationItems.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={[
              styles.navButton,
              item.isCenter && styles.centerButton,
            ]}
            onPress={() => onTabPress?.(item.name)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={item.icon as any}
              size={item.size}
              color={getIconColor(item.name, item.isCenter || false)}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    height: 80, // Adjusted height for better spacing
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 24,
    paddingBottom: 10, // Added padding for safe area
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  centerButton: {
    marginTop: -35, // Lifts the center button up
  },
});
