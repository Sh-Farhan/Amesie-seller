// import React, { useState } from 'react';
// import { ScrollView, StyleSheet, Text, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Order, OrderCard } from '../../src/components/OrderCard';

// // Mock data that simulates a real-time order list from your backend
// const initialOrders: Order[] = [
//   { id: '5234', customer: 'Farhan Shaikh', items: ['Chicken Biryani (x1)'], total: 400, status: 'new' },
//   { id: '5235', customer: 'Priya Sharma', items: ['Paneer Tikka (x2)', 'Garlic Naan (x4)'], total: 780, status: 'new' },
//   { id: '5232', customer: 'Arjun Mehta', items: ['Veg Hakka Noodles (x1)', 'Manchurian (x1)'], total: 450, status: 'preparing' },
//   { id: '5230', customer: 'Sameer Khan', items: ['Mutton Rogan Josh (x1)'], total: 550, status: 'ready' },
//   { id: '5231', customer: 'Anjali Verma', items: ['Margherita Pizza (x1)', 'Coke (x1)'], total: 420, status: 'ready' },
// ];

// export default function OrdersScreen() {
//   const [orders, setOrders] = useState<Order[]>(initialOrders);

//   // Helper function to filter orders by their current status
//   const getOrdersByStatus = (status: Order['status']) => orders.filter(o => o.status === status);

//   // --- Mock functions to handle order state changes ---
//   // In a real app, these would be API calls.

//   const handleAccept = (id: string) => {
//     setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'preparing' } : o));
//   };

//   const handleReject = (id: string) => {
//     setOrders(prev => prev.filter(o => o.id !== id));
//   };

//   const handleReady = (id: string) => {
//     setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'ready' } : o));
//   };

//   return (
//     <SafeAreaView style={styles.container} edges={['top']}>
//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
//         <View style={styles.header}>
//           <Text style={styles.headerTitle}>Running Orders</Text>
//         </View>

//         {/* New Orders Section */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>New ({getOrdersByStatus('new').length})</Text>
//           {getOrdersByStatus('new').length > 0 ? (
//             getOrdersByStatus('new').map(order => (
//                 <OrderCard key={order.id} order={order} onAccept={() => handleAccept(order.id)} onReject={() => handleReject(order.id)} />
//             ))
//           ) : (
//             <Text style={styles.emptyText}>No new orders.</Text>
//           )}
//         </View>

//         {/* Preparing Section */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Preparing ({getOrdersByStatus('preparing').length})</Text>
//           {getOrdersByStatus('preparing').length > 0 ? (
//             getOrdersByStatus('preparing').map(order => (
//                 <OrderCard key={order.id} order={order} onReady={() => handleReady(order.id)} />
//             ))
//           ) : (
//              <Text style={styles.emptyText}>No orders are being prepared.</Text>
//           )}
//         </View>

//         {/* Ready for Pickup Section */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Ready for Pickup ({getOrdersByStatus('ready').length})</Text>
//            {getOrdersByStatus('ready').length > 0 ? (
//             getOrdersByStatus('ready').map(order => (
//                 <OrderCard key={order.id} order={order} />
//             ))
//            ) : (
//              <Text style={styles.emptyText}>No orders are ready for pickup.</Text>
//            )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f7f8f9',
//   },
//   header: {
//     paddingHorizontal: 24,
//     paddingTop: 20,
//     paddingBottom: 10,
//   },
//   headerTitle: {
//     fontFamily: 'Sen',
//     fontWeight: '700',
//     fontSize: 28,
//     color: '#32343e',
//   },
//   contentContainer: {
//     paddingBottom: 120, // Space for the nav bar
//   },
//   section: {
//     paddingHorizontal: 24,
//     marginTop: 20,
//   },
//   sectionTitle: {
//     fontFamily: 'Sen',
//     fontWeight: '700',
//     fontSize: 20,
//     color: '#32343e',
//     marginBottom: 15,
//   },
//   emptyText: {
//     fontFamily: 'Sen',
//     fontSize: 14,
//     color: '#838699',
//     textAlign: 'center',
//     marginTop: 10,
//   }
// });



// FILE: app/(tabs)/orders.tsx
// This screen displays orders, filtered by status using a top segmented control,
// matching the design image provided.

import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Ensure this path is correct for your project structure
import { Order, OrderCard } from '../../src/components/OrderCard';

// Mock data including ETA and driver info for some orders
const initialOrders: Order[] = [
  { id: '5234', customer: 'Farhan Shaikh', items: ['Chicken Biryani (x1)', 'Coke (x1)'], total: 450, status: 'new' },
  { id: '5235', customer: 'Priya Sharma', items: ['Paneer Tikka (x2)', 'Garlic Naan (x4)'], total: 780, status: 'new' },
  { id: '5236', customer: 'Rohan Verma', items: ['Veg Pulao'], total: 250, status: 'new' },
  { id: '5232', customer: 'Arjun Mehta', items: ['Veg Hakka Noodles (x1)', 'Manchurian (x1)'], total: 450, status: 'preparing', eta: '15 mins' },
  { id: '5230', customer: 'Sameer Khan', items: ['Mutton Rogan Josh (x1)'], total: 550, status: 'ready', eta: '5 mins', driver: { name: 'Rohan Patil', rating: 4.8, image: 'https://placehold.co/40x40/cccccc/333?text=D' } },
  { id: '5231', customer: 'Anjali Verma', items: ['Margherita Pizza (x1)', 'Coke (x1)'], total: 420, status: 'ready', eta: '8 mins', driver: { name: 'Vikram Singh', rating: 4.5, image: 'https://placehold.co/40x40/eeeeee/555?text=D' } },
];

// Define the tabs based on OrderStatus
const TABS: Order['status'][] = ['new', 'preparing', 'ready'];

export default function OrdersScreen() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [activeTab, setActiveTab] = useState<Order['status']>('new');

  // Filter orders based on the currently selected tab
  const filteredOrders = orders.filter(o => o.status === activeTab);

  // --- Mock functions to handle order state changes ---
  const handleAccept = (id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'preparing', eta: `${Math.floor(Math.random() * 10) + 10} mins` } : o));
  };
  const handleReject = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };
  const handleReady = (id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'ready', driver: { name: 'Assigned Driver', rating: 4.7, image: 'https://placehold.co/40x40/dddddd/666?text=D' } } : o));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Running Orders</Text>
        {/* Optional: Add Filter/Search Icon TouchableOpacity here */}
      </View>

      {/* Top Tab Bar / Segmented Control */}
      <View style={styles.tabContainer}>
        {TABS.map((tab) => {
          const count = orders.filter(o => o.status === tab).length;
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, isActive && styles.activeTabButton]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {/* Capitalize the first letter */}
                {tab.charAt(0).toUpperCase() + tab.slice(1)} ({count})
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              onAccept={() => handleAccept(order.id)}
              onReject={() => handleReject(order.id)}
              onReady={() => handleReady(order.id)}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>No orders in this category.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8f9', // Slightly off-white background
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 15, // Reduced padding
    backgroundColor: '#fff', // White header background
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  headerTitle: {
    fontFamily: 'Sen',
    fontWeight: '700',
    fontSize: 26, // Slightly smaller title
    color: '#32343e',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 10, // Padding around the tabs
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'space-around', // Distribute tabs evenly
  },
  tabButton: {
    flex: 1, // Make tabs take equal width
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5, // Space between tabs
    backgroundColor: '#f0f0f0', // Inactive background
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#FFF8E1', // Light yellow for active tab background
  },
  tabText: {
    fontFamily: 'Sen',
    fontSize: 14,
    color: '#676767', // Grey text for inactive tabs
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fdc500', // Yellow text for active tab
    fontWeight: '700',
  },
  contentContainer: {
    paddingHorizontal: 20, // Adjusted padding for content area
    paddingTop: 20,
    paddingBottom: 120, // Space for the bottom nav bar
  },
  emptyText: {
    fontFamily: 'Sen',
    fontSize: 16,
    color: '#838699',
    textAlign: 'center',
    marginTop: 50,
  }
});
