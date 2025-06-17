import {
  Button,
  Pressable,
  VStack,
  Box,
  Icon as Icons,
  HStack,
  Switch,
} from 'native-base';
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import {Card} from 'react-native-paper';
import Icon from '@react-native-vector-icons/ionicons';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {navigate} from '../NavigationService';
import {
  fetchAvailabilityStatus,
  // fetchAvailabilityStatus,
  updateAvailabilityStatus,
} from '../store/avail'; // Adjust path
import {
  useGetAvailableOrdersQuery,
  useGetWalletBalanceQuery,
} from '../store/ordersApi'; // Adjust pat

import {useDispatch, useSelector} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import NotifySwitch from './availabiltyStatus';
import {useGetRiderProfileQuery} from '../store/api';

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const {loading, error, isAuthenticated, user} = useSelector(
    state => state.auth,
  );
  const profile = user;
  console.log('Profile Data:', profile);
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

  useEffect(() => {
    dispatch(fetchAvailabilityStatus());
    console.log(
      'Availability Status:',
      isAvailable,
      'Update Status:',
      availabilityUpdateStatus,
      'Get Status:',
      availabilityGetStatus,
    );
  }, [dispatch]);
  const handleToggleAvailability = newValue => {
    if (availabilityUpdateStatus === 'loading') return; // Prevent spamming
    dispatch(updateAvailabilityStatus(newValue));
    console.log('Toggling availability to:', newValue);
  };
  const rider = profileResponse?.data;
  const wallet = balanceData?.data;
  // const pendingRequestsCount = availableOrdersData?.data?.length || 0;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Box style={styles.header}></Box>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assests/avatar.jpg')} // Placeholder for user image
            style={styles.profileImage}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {profile?.firstName + ' ' + profile?.lastName}
            </Text>
            <Text style={styles.userPhone}>{profile?.phone}</Text>
          </View>

          <View style={styles.headertop}>
            <Text style={styles.headerText}>
              {isAvailable ? 'You are Online' : 'You are Offline'}
            </Text>
            <NotifySwitch />
          </View>
        </View>
        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Balance</Text>
            <Text style={styles.cardAmount}>10,000 NGN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Total Income</Text>
            <Text style={styles.cardAmount}>100,000 NGN</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Pending Requests</Text>
            <Text style={styles.cardAmount}>2</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Completed Requests</Text>
            <Text style={styles.cardAmount}>10</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Box height={400} />
      <Box bgColor={'teal.300'} style={styles.summaryContainer}>
        <Text style={styles.header}>Yesterday</Text>
        <HStack justifyContent={'space-between'} mt={5} alignItems={'center'}>
          <Box width={'50%'}>
            <Text style={styles.text}>MONEY EARNED</Text>
            {
              //fetching the amount for transactions yesterday
              // This is a placeholder, replace with actual data fetching logic
              // For example, you might fetch this from your Redux store or API
            }
            <Text style={styles.amount}>N 280</Text>
          </Box>
          <Box width={'40%'}>
            <Text style={styles.text}>HOURS ONLINE</Text>
            <Text style={styles.amount}>8.5 hrs</Text>
          </Box>
        </HStack>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          <Box width={'50%'}>
            <Text style={styles.text}>TOTAL DISTANCE</Text>
            <Text style={styles.amount}>24 km</Text>
          </Box>
          <Box width={'40%'}>
            <Text style={styles.text}>TOTAL JOBS</Text>
            <Text style={styles.amount}>20</Text>
          </Box>
        </HStack>
        <Box height={100} />
        {/* Go Online Button */}
        <TouchableOpacity
          onPress={() => navigate('RiderActive')}
          style={styles.button}>
          <Text style={styles.buttonText}>Go online</Text>
        </TouchableOpacity>
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // backgroundColor: '#F0F8FF',
    padding: 0,
  },
  headerContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'teal',
    borderBottomLeftRadius: '5%',
    borderBottomRightRadius: '5%',
  },
  button: {
    backgroundColor: 'teal',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    borderColor: '#F5F7F5',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    flex: 0.45,
    alignItems: 'flex-end',
  },
  cardTitle: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'Sans-Serif',
  },
  cardAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'teal',
    marginTop: 5,
  },
  footer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#F0F8FF',
    borderRadius: 10,
    alignItems: 'center',
  },

  profileContainer: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 20,
    alignItems: 'center',
    borderColor: 'teal',
    borderWidth: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userPhone: {
    fontSize: 14,
    color: '#666',
  },
  onlineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  onlineText: {
    marginLeft: 5,
    color: 'white',
  },
  mapContainer: {
    height: 200,

    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  ordersCard: {
    borderRadius: 12,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  earnings: {
    fontSize: 18,
    color: '#FFD700',
  },
  earningstitle: {
    fontSize: 18,
    color: 'black',
  },
  earningspaid: {
    fontSize: 14,
    color: 'teal',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  orderName: {
    fontSize: 16,
  },
  orderDistance: {
    fontSize: 14,
    color: '#666',
  },
  orderDetail: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerDetails: {
    fontSize: 14,
    color: '#808080',
  },
  dateContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  headertop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  summaryContainer: {
    // backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: 'teal',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'white',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateInfo: {
    fontSize: 14,
    color: '#808080',
  },
});

export default DashboardScreen;
