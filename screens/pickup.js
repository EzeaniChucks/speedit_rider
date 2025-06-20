import React from 'react';
import {View, Text, Image, StyleSheet, Button, Alert} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {
  Pressable,
  Slider,
  VStack,
  Box,
  Icon as Icons,
  HStack,
  StatusBar,
} from 'native-base';
import Icon from '@react-native-vector-icons/entypo';
import RiderStatus from './DriverStatus';
import {navigate} from '../NavigationService';

import {
  useCancelOrderMutation,
  useUpdateOrderStatusMutation,
} from '../store/ordersApi'; // Adjust path
import {useNavigation, useRoute} from '@react-navigation/native';
import UserProfileCard from './components/userProfileCard';

const PickupScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {order} = route.params; // Get the order details from navigation

  console.log("from pickup screen" ,order)

  const [cancelOrder, {isLoading: isCancelling}] = useCancelOrderMutation();
  const [updateStatus, {isLoading: isUpdatingStatus}] =
    useUpdateOrderStatusMutation();

  // In a real app, geocode addresses to get coordinates
  const pickupCoords = {latitude: 6.4238, longitude: 7.4238}; // Placeholder for Enugu
  const deliveryCoords = {latitude: 6.43, longitude: 7.43}; // Placeholder

  const handleCancelJob = () => {
    Alert.alert('Cancel Job', 'Are you sure you want to cancel this job?', [
      {text: 'No', style: 'cancel'},
      {
        text: 'Yes, Cancel',
        style: 'destructive',
        onPress: async () => {
          try {
            await cancelOrder({orderId: order?.id}).unwrap();
            Alert.alert('Success', 'The job has been cancelled.');
            navigation.goBack();
          } catch (err) {
            Alert.alert('Error', 'Failed to cancel the job.');
          }
        },
      },
    ]);
  };

  const handleGoToPickup = async () => {
    try {
      // Replace with your app's actual status string
      await updateStatus({
        orderId: order?.id,
        status: 'EN_ROUTE_TO_PICKUP',
      }).unwrap();
      // Navigate to the next screen in the flow, e.g., OrderPicked
      navigation.navigate('OrderPicked', {order});
      Alert.alert('Status Updated', 'You are now en route to pickup.');
    } catch (err) {
      console.log(err);
      Alert.alert(
        'Error',
        err?.data?.error || err?.data?.data || 'Could not update status.',
      );
    }
  };
  return (
    <Box style={styles.container}>
      <StatusBar barStyle={'default'} />
      <MapView
        style={styles.map}
        initialRegion={{
          ...pickupCoords,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}>
        <Marker coordinate={pickupCoords} title="Pickup" pinColor="blue" />
        <Marker coordinate={deliveryCoords} title="Delivery" />
        <Polyline
          coordinates={[pickupCoords, deliveryCoords]}
          strokeColor="#000"
          strokeWidth={3}
        />
      </MapView>
      <UserProfileCard />
      <Box bg={'teal.500'} p={5}>
        <Text style={styles.title}>PICK UP</Text>
        <Text style={styles.restaurantName}>Restaurant at Location</Text>
        <Text style={styles.address}>{order.pickupAddress}</Text>
        <VStack mb={4}>
          <Text style={styles.orderReference}>ORDER REFERENCE</Text>
          <Text style={styles.order}> {order?.id?.substring(0, 18)}...</Text>
        </VStack>
        {/* <Slider w="3/4" maxW="300" defaultValue={70} minValue={0} maxValue={100} style={styles.slider} /> */}
        <Box mb={6}>
          <Text style={styles.title}>ROUTE</Text>
          <Text style={styles.route}>
            {' '}
            via Tomas Mapua St and Dasmariñas St
          </Text>
        </Box>
        <Box mb={6}>
          <Text style={styles.title}>ETA</Text>
          <Text style={styles.eta}> 10 mins</Text>
        </Box>
        <View style={styles.buttonContainer}>
          <Pressable onPress={() => console.log('Call pressed')}>
            <Icon
              name="phone"
              size={20}
              color="teal"
              style={{transform: [{rotateY: '180deg'}]}}
            />
            <Text style={styles.title}>Call</Text>
          </Pressable>
          <Pressable onPress={() => console.log('Call pressed')}>
            <Icon name="chat" size={20} color="teal" />
            <Text style={styles.title}>Message</Text>
          </Pressable>
        </View>

        <View style={styles.actionContainer}>
          <Button
            title={isCancelling ? 'Cancelling...' : 'Cancel Job'}
            onPress={handleCancelJob}
            color="red"
            disabled={isCancelling || isUpdatingStatus}
          />
          <Button
            title={isUpdatingStatus ? 'Updating...' : 'Go to Pick Up'}
            onPress={handleGoToPickup}
            color="green"
            disabled={isCancelling || isUpdatingStatus}
          />
        </View>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center"
    //backgroundColor:'teal'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: 'white',
    marginVertical: 5,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'teal',
  },
  address: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 10,
  },
  map: {
    flex: 1,
  },
  orderReference: {
    fontSize: 16,
    color: 'teal',
    marginTop: 10,
  },
  slider: {
    marginVertical: 20,
  },
  route: {
    fontSize: 16,
    color: '#FFF',
  },
  order: {
    fontSize: 20,
    color: '#FFF',
  },
  eta: {
    fontSize: 16,
    color: '#FFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PickupScreen;
