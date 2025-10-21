// FILE: app/(tabs)/orders.tsx
// This screen displays a list of all current orders, categorized by status.

import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Order, OrderCard } from '../../src/components/OrderCard';

// Mock data that simulates a real-time order list from your backend
const initialOrders: Order[] = [
  { id: '5234', customer: 'Farhan Shaikh', items: ['Chicken Biryani (x1)'], total: 400, status: 'new' },
  { id: '5235', customer: 'Priya Sharma', items: ['Paneer Tikka (x2)', 'Garlic Naan (x4)'], total: 780, status: 'new' },
  { id: '5232', customer: 'Arjun Mehta', items: ['Veg Hakka Noodles (x1)', 'Manchurian (x1)'], total: 450, status: 'preparing' },
  { id: '5230', customer: 'Sameer Khan', items: ['Mutton Rogan Josh (x1)'], total: 550, status: 'ready' },
  { id: '5231', customer: 'Anjali Verma', items: ['Margherita Pizza (x1)', 'Coke (x1)'], total: 420, status: 'ready' },
];

export default function OrdersScreen() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  // Helper function to filter orders by their current status
  const getOrdersByStatus = (status: Order['status']) => orders.filter(o => o.status === status);

  // --- Mock functions to handle order state changes ---
  // In a real app, these would be API calls.

  const handleAccept = (id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'preparing' } : o));
  };

  const handleReject = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  const handleReady = (id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'ready' } : o));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Running Orders</Text>
        </View>

        {/* New Orders Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>New ({getOrdersByStatus('new').length})</Text>
          {getOrdersByStatus('new').length > 0 ? (
            getOrdersByStatus('new').map(order => (
                <OrderCard key={order.id} order={order} onAccept={() => handleAccept(order.id)} onReject={() => handleReject(order.id)} />
            ))
          ) : (
            <Text style={styles.emptyText}>No new orders.</Text>
          )}
        </View>

        {/* Preparing Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preparing ({getOrdersByStatus('preparing').length})</Text>
          {getOrdersByStatus('preparing').length > 0 ? (
            getOrdersByStatus('preparing').map(order => (
                <OrderCard key={order.id} order={order} onReady={() => handleReady(order.id)} />
            ))
          ) : (
             <Text style={styles.emptyText}>No orders are being prepared.</Text>
          )}
        </View>

        {/* Ready for Pickup Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ready for Pickup ({getOrdersByStatus('ready').length})</Text>
           {getOrdersByStatus('ready').length > 0 ? (
            getOrdersByStatus('ready').map(order => (
                <OrderCard key={order.id} order={order} />
            ))
           ) : (
             <Text style={styles.emptyText}>No orders are ready for pickup.</Text>
           )}
        </View>
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
  },
  headerTitle: {
    fontFamily: 'Sen',
    fontWeight: '700',
    fontSize: 28,
    color: '#32343e',
  },
  contentContainer: {
    paddingBottom: 120, // Space for the nav bar
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  sectionTitle: {
    fontFamily: 'Sen',
    fontWeight: '700',
    fontSize: 20,
    color: '#32343e',
    marginBottom: 15,
  },
  emptyText: {
    fontFamily: 'Sen',
    fontSize: 14,
    color: '#838699',
    textAlign: 'center',
    marginTop: 10,
  }
});

