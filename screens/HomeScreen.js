import {Box, Icon as Icons, HStack} from 'native-base';
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Card} from 'react-native-paper';
import Icon from '@react-native-vector-icons/ionicons';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {navigate} from '../NavigationService';
import {updateAvailabilityStatus} from '../store/avail'; // Adjust path
import {
  useGetAvailableOrdersQuery,
  useGetWalletBalanceQuery,
} from '../store/ordersApi'; // Adjust pat

import {useDispatch, useSelector} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import {useGetRiderProfileQuery} from '../store/api';
import UserProfileCard from './components/userProfileCard';

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const {loading, error, isAuthenticated, user} = useSelector(
    state => state.auth,
  );
  const profile = user;
  // console.log('Profile Data:', profile);
  const {
    data: profileResponse,
    isLoading: isProfileLoading,
    error: profileError,
  } = useGetRiderProfileQuery();
  console.log('Profile Response:', profileResponse);
  const {data: balanceData, isLoading: isBalanceLoading} =
    useGetWalletBalanceQuery();
  console.log('Balance Data:', balanceData);

  const {
    isAvailable,
    updateStatus: availabilityUpdateStatus,
    getStatus: availabilityGetStatus,
  } = useSelector(state => state.availability);

  const handleToggleAvailability = newValue => {
    if (availabilityUpdateStatus === 'loading') return; // Prevent spamming
    dispatch(updateAvailabilityStatus(newValue));
    console.log('Toggling availability to:', newValue);
  };
  const rider = profileResponse?.data;
  const wallet = balanceData?.data;
  // const pendingRequestsCount = availableOrdersData?.data?.length || 0;
  return (
    <ScrollView
      contentContainerStyle={[styles.scrollContainer, {paddingBottom: 0}]}
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <UserProfileCard />

        {/* Stats Cards - Top Row */}
        <View style={styles.cardRow}>
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Balance</Text>
              <Text style={styles.cardAmount}>10,000 NGN</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Total Income</Text>
              <Text style={styles.cardAmount}>100,000 NGN</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Stats Cards - Bottom Row */}
        <View style={styles.cardRow}>
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Pending Requests</Text>
              <Text style={styles.cardAmount}>2</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Completed Requests</Text>
              <Text style={styles.cardAmount}>10</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Summary Section */}
      <View style={[styles.summaryContainer, {marginBottom: 0}]}>
        <Text style={styles.summaryHeader}>Yesterday</Text>

        <View style={styles.summaryGrid}>
          {/* First Row */}
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>MONEY EARNED</Text>
            <Text style={styles.summaryValue}>₦280</Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>HOURS ONLINE</Text>
            <Text style={styles.summaryValue}>8.5 hrs</Text>
          </View>

          {/* Second Row */}
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>TOTAL DISTANCE</Text>
            <Text style={styles.summaryValue}>24 km</Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>TOTAL JOBS</Text>
            <Text style={styles.summaryValue}>20</Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          onPress={() => navigate('RiderActiveOrders')}
          style={styles.primaryButton}>
          <Text style={styles.buttonText}>Get New Orders</Text>
          <Icon
            name="arrow-forward"
            size={20}
            color="white"
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: -1, // Counteracts any default margin
  },
  scrollContainer: {
    flexGrow: 1, // Ensures content fills available space
    justifyContent: 'space-between',
  },
  headerContainer: {
    backgroundColor: '#00897B',
    padding: 24,
    paddingTop: 120,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 16,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 14,
    color: '#616161',
    marginBottom: 8,
    fontFamily: 'Roboto-Medium',
  },
  cardAmount: {
    fontSize: 22,
    fontWeight: '700',
    color: '#00796B',
  },
  summaryContainer: {
    backgroundColor: '#00695C',
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 5,
  },
  summaryHeader: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    marginBottom: 24,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  summaryItem: {
    width: '48%',
    marginBottom: 20,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#B2DFDB',
    fontWeight: '500',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  primaryButton: {
    backgroundColor: '#00796B',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },
});

export default DashboardScreen;
