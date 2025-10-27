// import { Ionicons } from '@expo/vector-icons';
// import React from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// type OrderStatus = 'new' | 'preparing' | 'ready';

// export interface Order {
//   id: string;
//   customer: string;
//   items: string[];
//   total: number;
//   status: OrderStatus;
// }

// interface OrderCardProps {
//   order: Order;
//   onAccept?: () => void;
//   onReject?: () => void;
//   onReady?: () => void;
// }

// export const OrderCard: React.FC<OrderCardProps> = ({ order, onAccept, onReject, onReady }) => {
//   const renderButtons = () => {
//     switch (order.status) {
//       case 'new':
//         return (
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={onReject}>
//               <Text style={[styles.buttonText, styles.rejectButtonText]}>Reject</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={onAccept}>
//               <Text style={[styles.buttonText, styles.acceptButtonText]}>Accept</Text>
//             </TouchableOpacity>
//           </View>
//         );
//       case 'preparing':
//         return (
//           <TouchableOpacity style={[styles.button, styles.readyButton]} onPress={onReady}>
//             <Text style={[styles.buttonText, styles.readyButtonText]}>Mark as Ready</Text>
//           </TouchableOpacity>
//         );
//       case 'ready':
//         return (
//           <View style={styles.readyStatus}>
//             <Ionicons name="checkmark-circle" size={18} color="#28a745" />
//             <Text style={styles.readyStatusText}>Ready for Pickup</Text>
//           </View>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <View style={styles.card}>
//       <View style={styles.header}>
//         <Text style={styles.orderId}>Order #{order.id}</Text>
//         <Text style={styles.total}>₹{order.total.toFixed(2)}</Text>
//       </View>
//       <View style={styles.body}>
//         <Text style={styles.customerName}>{order.customer}</Text>
//         <Text style={styles.items}>{order.items.join(', ')}</Text>
//       </View>
//       <View style={styles.footer}>
//         {renderButtons()}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   orderId: {
//     fontFamily: 'Sen',
//     fontWeight: '700',
//     fontSize: 16,
//     color: '#32343e',
//   },
//   total: {
//     fontFamily: 'Sen',
//     fontWeight: '700',
//     fontSize: 16,
//     color: '#28a745',
//   },
//   body: {
//     marginBottom: 15,
//   },
//   customerName: {
//     fontFamily: 'Sen',
//     fontSize: 15,
//     color: '#555',
//     marginBottom: 5,
//   },
//   items: {
//     fontFamily: 'Sen',
//     fontSize: 14,
//     color: '#838699',
//   },
//   footer: {
//     borderTopWidth: 1,
//     borderTopColor: '#f0f0f0',
//     paddingTop: 10,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   button: {
//     flex: 1,
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   acceptButton: {
//     backgroundColor: '#28a745',
//     marginLeft: 5,
//   },
//   acceptButtonText: {
//     color: '#fff',
//   },
//   rejectButton: {
//     backgroundColor: '#fff',
//     borderColor: '#dc3545',
//     borderWidth: 1,
//     marginRight: 5,
//   },
//   rejectButtonText: {
//     color: '#dc3545',
//   },
//   readyButton: {
//     backgroundColor: '#007bff',
//   },
//   readyButtonText: {
//     color: '#fff',
//   },
//   buttonText: {
//     fontFamily: 'Sen',
//     fontWeight: '700',
//     fontSize: 14,
//   },
//   readyStatus: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 10,
//   },
//   readyStatusText: {
//     fontFamily: 'Sen',
//     fontSize: 14,
//     color: '#28a745',
//     marginLeft: 8,
//   },
// });

// FILE: src/components/OrderCard.tsx
// This component displays a single order card with detailed information and action buttons,
// matching the design from the image provided.

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Define the structure for an Order, including optional ETA and driver details
export type OrderStatus = 'new' | 'preparing' | 'ready';
export interface Order {
  id: string;
  customer: string;
  items: string[];
  total: number;
  status: OrderStatus;
  eta?: string; // Estimated time (e.g., "15 mins")
  driver?: {
    name: string;
    rating: number;
    image: string; // URL for driver's profile picture
  };
}

// Define the props the OrderCard component expects
interface OrderCardProps {
  order: Order;
  onAccept?: () => void; // Function to call when "Accept" is pressed
  onReject?: () => void; // Function to call when "Reject" is pressed
  onReady?: () => void;  // Function to call when "Ready to Pickup" is pressed
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onAccept, onReject, onReady }) => {
  
  // Renders the correct action buttons based on the order's status
  const renderButtons = () => {
    switch (order.status) {
      case 'new':
        return (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={onReject}>
              <Text style={[styles.buttonText, styles.rejectButtonText]}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={onAccept}>
              <Text style={[styles.buttonText, styles.acceptButtonText]}>Accept</Text>
            </TouchableOpacity>
          </View>
        );
      case 'preparing':
        return (
          <TouchableOpacity style={[styles.button, styles.readyButton]} onPress={onReady}>
            <Text style={[styles.buttonText, styles.readyButtonText]}>Ready to Pickup</Text>
          </TouchableOpacity>
        );
      case 'ready':
         // If the order is ready and has driver info, display it
         return ( 
           order.driver ? (
             <View style={styles.driverInfo}>
                <Image source={{ uri: order.driver.image }} style={styles.driverImage} />
                <View style={styles.driverDetails}>
                    <Text style={styles.driverName}>{order.driver.name}</Text>
                    <View style={styles.driverRating}>
                        <Ionicons name="star" size={14} color="#fdc500" />
                        <Text style={styles.driverRatingText}>{order.driver.rating.toFixed(1)}</Text>
                    </View>
                </View>
                {/* Optional: Add Call/Message buttons for the driver here */}
             </View>
           ) : (
             // Fallback if no driver info is available for a ready order
             <View style={styles.readyStatus}>
               <Ionicons name="checkmark-circle" size={18} color="#28a745" />
               <Text style={styles.readyStatusText}>Ready for Pickup</Text>
             </View>
           )
         );
      default:
        // Should not happen, but return null for safety
        return null;
    }
  };

  // The main structure of the card
  return (
    <View style={styles.card}>
      {/* Top section: Order ID and ETA */}
      <View style={styles.header}>
        <Text style={styles.orderId}>Order #{order.id}</Text>
        {/* Only show ETA if it exists */}
        {order.eta && (
          <Text style={styles.etaText}>
            <Ionicons name="time-outline" size={14} color="#676767"/> {order.eta}
          </Text>
        )}
      </View>
      
      {/* Middle section: Customer Name and Item list */}
      <View style={styles.body}>
        <Text style={styles.customerName}>{order.customer}</Text>
        <Text style={styles.items} numberOfLines={2}>{order.items.join(' • ')}</Text>
      </View>
      
      {/* Price section */}
       <View style={styles.priceContainer}>
           <Text style={styles.totalLabel}>Total:</Text>
           <Text style={styles.total}>₹{order.total.toFixed(2)}</Text>
       </View>
       
      {/* Bottom section: Action buttons or Driver Info */}
      <View style={styles.footer}>
        {renderButtons()}
      </View>
    </View>
  );
};

// Stylesheet matching the design image
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16, // More rounded corners
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6, // Android shadow
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontFamily: 'Sen',
    fontWeight: '700',
    fontSize: 18,
    color: '#32343e',
  },
   etaText: {
    fontFamily: 'Sen',
    fontSize: 14,
    color: '#676767',
    textAlign: 'right',
  },
  body: {
    marginBottom: 15,
  },
  customerName: {
    fontFamily: 'Sen',
    fontSize: 16,
    color: '#555',
    marginBottom: 6,
    fontWeight: '600',
  },
  items: {
    fontFamily: 'Sen',
    fontSize: 14,
    color: '#838699',
    lineHeight: 20, // Adjust line height for better readability
  },
   priceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 5,
  },
  totalLabel: {
    fontFamily: 'Sen',
    fontSize: 15,
    color: '#838699',
    marginRight: 8,
  },
  total: {
    fontFamily: 'Sen',
    fontWeight: '700',
    fontSize: 18,
    color: '#32343e', // Changed color to dark for better contrast
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0', // Lighter separator line
    paddingTop: 15,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10, // Adds space between buttons
  },
  button: {
    flex: 1, // Make buttons take equal width
    paddingVertical: 14, // Slightly taller buttons
    borderRadius: 10, // More rounded buttons
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButton: {
    backgroundColor: '#fdc500', // Yellow accept button
  },
  acceptButtonText: {
    color: '#32343e', // Dark text on yellow
  },
  rejectButton: {
    backgroundColor: '#FFF0F0', // Light red background for reject
    borderColor: '#dc3545', // Red border
    borderWidth: 1,
  },
  rejectButtonText: {
    color: '#dc3545', // Red text
  },
  readyButton: {
    backgroundColor: '#32343e', // Dark grey/black for ready button
  },
  readyButtonText: {
    color: '#fff',
  },
  buttonText: {
    fontFamily: 'Sen',
    fontWeight: '700',
    fontSize: 15, // Slightly larger button text
  },
  readyStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  readyStatusText: {
    fontFamily: 'Sen',
    fontSize: 14,
    color: '#28a745', // Green color for ready status
    marginLeft: 8,
    fontWeight: '600',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5, // Add some padding around driver info
  },
  driverImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // Make it circular
    marginRight: 12,
    backgroundColor: '#eee', // Placeholder background
  },
  driverDetails:{
      flex: 1, // Allow text to take available space
  },
  driverName: {
    fontFamily: 'Sen',
    fontSize: 15,
    fontWeight: '600',
    color: '#32343e',
  },
  driverRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  driverRatingText: {
    fontFamily: 'Sen',
    fontSize: 13,
    color: '#676767',
    marginLeft: 4,
  },
});
