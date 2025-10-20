// FILE: app/(tabs)/dashboard.tsx
// UPDATED: All <Image> components have been replaced with <Ionicons> for a cleaner, more efficient design.

import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const timeLabels = ['10AM', '11AM', '12PM', '01PM', '02PM', '03PM', '04PM'];

export default function SellerDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('daily');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="menu" size={32} color="#32343e" />
          </TouchableOpacity>

          <View style={styles.locationContainer}>
            <Text style={styles.deliverText}>Deliver to</Text>
            <View style={styles.locationRow}>
              <Text style={styles.locationText}>Vadodara, Gujarat</Text>
              <Ionicons name="chevron-down" size={12} color="#676767" />
            </View>
          </View>

          <TouchableOpacity style={styles.profileImage}>
             <Ionicons name="person-circle-outline" size={45} color="#32343e" />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>20</Text>
            <Text style={styles.statLabel}>RUNNING ORDERS</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>05</Text>
            <Text style={styles.statLabel}>ORDER REQUEST</Text>
          </View>
        </View>

        {/* Revenue Card */}
        <View style={styles.revenueCard}>
          <View style={styles.revenueHeader}>
            <View>
              <Text style={styles.revenueTitle}>TOTAL REVENUE</Text>
              <Text style={styles.revenueAmount}>₹2,241</Text>
            </View>
            <View style={styles.revenueControls}>
              <TouchableOpacity style={styles.periodSelector}>
                <Text style={styles.periodText}>
                  {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}
                </Text>
                <Ionicons name="chevron-down" size={12} color="#9b9ba5" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.linkText}>See Details</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.chartContainer}>
             <Ionicons name="stats-chart" size={80} color="#fdc500" />
          </View>

          <View style={styles.timeLabelsContainer}>
            {timeLabels.map((time, index) => (
              <Text key={index} style={styles.timeLabel}>
                {time}
              </Text>
            ))}
          </View>
        </View>

        {/* Reviews Card */}
        <View style={styles.reviewsCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Reviews</Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>See All Reviews</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reviewsContent}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={24} color="#fdc500" />
              <Text style={styles.ratingNumber}>4.9</Text>
            </View>
            <Text style={styles.reviewsCount}>Total 20 Reviews</Text>
          </View>
        </View>

        {/* Popular Items Card */}
        <View style={styles.popularCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Popular Items This Week</Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.popularItemsContainer}>
            <View style={styles.popularItemImage}>
                <Ionicons name="fast-food-outline" size={60} color="#fdc500" />
            </View>
             <View style={styles.popularItemImage}>
                <Ionicons name="pizza-outline" size={60} color="#32343e" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8f9',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 120, // Space for the nav bar
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  menuButton: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationContainer: {
    alignItems: 'center',
  },
  deliverText: {
    fontFamily: 'Sen',
    fontWeight: '700',
    fontSize: 12,
    color: '#fdc500',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontFamily: 'Sen',
    fontSize: 12,
    color: '#676767',
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 24,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    height: 114,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  statNumber: {
    fontFamily: 'Sen',
    fontWeight: '700',
    fontSize: 52,
    color: '#32343e',
  },
  statLabel: {
    fontFamily: 'Sen',
    fontWeight: '700',
    fontSize: 13,
    color: '#838699',
    marginTop: 8,
  },
  revenueCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginHorizontal: 24,
    marginBottom: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  revenueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  revenueTitle: {
    fontFamily: 'Sen',
    fontSize: 14,
    color: '#32343e',
  },
  revenueAmount: {
    fontFamily: 'Sen',
    fontWeight: '700',
    fontSize: 22,
    color: '#32343e',
    marginTop: 4,
  },
  revenueControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  periodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#e8e9ec',
    borderRadius: 7,
    gap: 4,
  },
  periodText: {
    fontFamily: 'Sen',
    fontSize: 12,
    color: '#9b9ba5',
  },
  linkText: {
    fontFamily: 'Sen',
    fontSize: 14,
    color: '#fdc500',
    textDecorationLine: 'underline',
  },
  chartContainer: {
    height: 78,
    marginTop: 16,
    marginBottom: 16,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeLabel: {
    fontFamily: 'Sen',
    fontSize: 9,
    color: '#9b9ba5',
  },
  reviewsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginHorizontal: 24,
    marginBottom: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontFamily: 'Sen',
    fontSize: 14,
    color: '#32343e',
  },
  reviewsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingNumber: {
    fontFamily: 'Sen',
    fontWeight: '600',
    fontSize: 14,
    color: '#000000',
  },
  reviewsCount: {
    fontFamily: 'Sen',
    fontSize: 11,
    color: '#32343e',
  },
  popularCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginHorizontal: 24,
    marginBottom: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  popularItemsContainer: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
  },
  popularItemImage: {
    width: (width - 48 - 24 - 16) / 2,
    height: 154,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

