import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type OrderStatus = 'new' | 'preparing' | 'ready';

export interface Order {
  id: string;
  customer: string;
  items: string[];
  total: number;
  status: OrderStatus;
}

interface OrderCardProps {
  order: Order;
  onAccept?: () => void;
  onReject?: () => void;
  onReady?: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onAccept, onReject, onReady }) => {
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
            <Text style={[styles.buttonText, styles.readyButtonText]}>Mark as Ready</Text>
          </TouchableOpacity>
        );
      case 'ready':
        return (
          <View style={styles.readyStatus}>
            <Ionicons name="checkmark-circle" size={18} color="#28a745" />
            <Text style={styles.readyStatusText}>Ready for Pickup</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.orderId}>Order #{order.id}</Text>
        <Text style={styles.total}>₹{order.total.toFixed(2)}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.customerName}>{order.customer}</Text>
        <Text style={styles.items}>{order.items.join(', ')}</Text>
      </View>
      <View style={styles.footer}>
        {renderButtons()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderId: {
    fontFamily: 'Sen',
    fontWeight: '700',
    fontSize: 16,
    color: '#32343e',
  },
  total: {
    fontFamily: 'Sen',
    fontWeight: '700',
    fontSize: 16,
    color: '#28a745',
  },
  body: {
    marginBottom: 15,
  },
  customerName: {
    fontFamily: 'Sen',
    fontSize: 15,
    color: '#555',
    marginBottom: 5,
  },
  items: {
    fontFamily: 'Sen',
    fontSize: 14,
    color: '#838699',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButton: {
    backgroundColor: '#28a745',
    marginLeft: 5,
  },
  acceptButtonText: {
    color: '#fff',
  },
  rejectButton: {
    backgroundColor: '#fff',
    borderColor: '#dc3545',
    borderWidth: 1,
    marginRight: 5,
  },
  rejectButtonText: {
    color: '#dc3545',
  },
  readyButton: {
    backgroundColor: '#007bff',
  },
  readyButtonText: {
    color: '#fff',
  },
  buttonText: {
    fontFamily: 'Sen',
    fontWeight: '700',
    fontSize: 14,
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
    color: '#28a745',
    marginLeft: 8,
  },
});
