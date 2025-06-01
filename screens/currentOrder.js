import React, { useState } from 'react';
import { View, StyleSheet, Button as RNButton, ActivityIndicator, Alert, ScrollView } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Box, Text, VStack, HStack, Button, Select, CheckIcon, Icon as NBIcon } from 'native-base';
import EntypoIcon from '@react-native-vector-icons/entypo'; // Corrected import
import { useNavigation } from '@react-navigation/native';
import {
  useGetCurrentOrderQuery,
  useUpdateOrderStatusMutation,
  useCancelOrderMutation,
  useConfirmVendorPaymentMutation,
} from '../features/orders/ordersApi';

// Assuming RiderStatus is a simple component, let's define a placeholder
const RiderStatusPlaceholder = ({ status }) => (
  <Box bg="blue.500" p={2} alignItems="center">
    <Text color="white" fontWeight="bold">Rider Status: {status || 'Online'}</Text>
  </Box>
);

const CurrentOrderScreen = () => {
  const navigation = useNavigation();
  const { data: currentOrder, error, isLoading, refetch } = useGetCurrentOrderQuery();
  
  const [updateOrderStatus, { isLoading: isUpdatingStatus }] = useUpdateOrderStatusMutation();
  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();
  const [confirmPayment, { isLoading: isConfirmingPayment }] = useConfirmVendorPaymentMutation();

  const [selectedStatus, setSelectedStatus] = useState('');

  const orderStatuses = [
    "pending", "accepted", "preparing", "ready", "picked_up", 
    "in_transit", "delivered", "cancelled"
  ];

  React.useEffect(() => {
    if (currentOrder && currentOrder.status) {
      setSelectedStatus(currentOrder.status);
    }
  }, [currentOrder]);

  const handleUpdateStatus = async () => {
    if (!currentOrder?.id || !selectedStatus) {
      Alert.alert("Error", "No order or status selected.");
      return;
    }
    try {
      await updateOrderStatus({ orderId: currentOrder.id, status: selectedStatus }).unwrap();
      Alert.alert("Success", "Order status updated!");
      refetch(); // Refetch to get the latest order state
    } catch (err) {
      Alert.alert("Error", err.data?.message || "Failed to update status.");
    }
  };

  const handleCancelOrder = async () => {
    if (!currentOrder?.id) return;
    Alert.alert(
      "Cancel Order",
      "Are you sure you want to cancel this order? You might need to provide a reason.",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: async () => {
            try {
              // For simplicity, not adding reason input here, but API supports it.
              await cancelOrder({ orderId: currentOrder.id /*, reason: "Optional reason" */ }).unwrap();
              Alert.alert("Success", "Order cancelled.");
              navigation.navigate('AvailableOrders'); // Go back to available orders
            } catch (err) {
              Alert.alert("Error", err.data?.message || "Failed to cancel order.");
            }
          }
        }
      ]
    );
  };

  const handleConfirmPayment = async () => {
    if (!currentOrder?.id) return;
    try {
      await confirmPayment(currentOrder.id).unwrap();
      Alert.alert("Success", "Vendor payment confirmed!");
      refetch();
    } catch (err) {
      Alert.alert("Error", err.data?.message || "Failed to confirm payment.");
    }
  };


  if (isLoading) {
    return <Box flex={1} justifyContent="center" alignItems="center"><ActivityIndicator size="large" color="teal" /><Text>Loading current order...</Text></Box>;
  }

  if (error || !currentOrder || !currentOrder.id) { // Check for currentOrder.id to ensure it's a valid order object
    return (
      <Box flex={1} justifyContent="center" alignItems="center" p={4}>
        <Text color="gray.500" textAlign="center" fontSize="lg">
          {error ? (error.data?.message || error.message || 'Error loading order.') : 'No active order found.'}
        </Text>
        <Button mt={4} onPress={() => navigation.navigate('AvailableOrders')} colorScheme="teal">
          Find Orders
        </Button>
         <Button mt={2} onPress={refetch} variant="outline" colorScheme="teal">
          Refresh
        </Button>
      </Box>
    );
  }
  
  // Dummy coordinates - replace with actual order coordinates
  const pickupCoords = currentOrder.pickup_location || { latitude: 14.6183, longitude: 121.0541 };
  const dropoffCoords = currentOrder.dropoff_location || { latitude: 14.6200, longitude: 121.0585 };

  return (
    <ScrollView style={{flex:1}}>
    <Box flex={1} bg={'white'}>
      <MapView
        style={styles.map}
        initialRegion={{
          ...pickupCoords,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Marker coordinate={pickupCoords} title="Pick Up" pinColor="blue" />
        <Marker coordinate={dropoffCoords} title="Drop Off" pinColor="green" />
        {pickupCoords && dropoffCoords && (
          <Polyline
            coordinates={[pickupCoords, dropoffCoords]}
            strokeColor="teal"
            strokeWidth={4}
          />
        )}
      </MapView>

      {/* <RiderStatusPlaceholder status={currentOrder.rider_status || 'Active'} /> */}
      
      <Box p={5} bg="teal.600">
        <Text style={styles.title} color="whiteAlpha.800">PICK UP</Text>
        <Text style={styles.restaurantName}>{currentOrder.vendor_name || 'Vendor Name N/A'}</Text>
        <Text style={styles.address}>{currentOrder.pickup_address?.full_address || 'Pickup Address N/A'}</Text>
        
        <VStack mb={4} mt={2}>
          <Text style={styles.orderReference}>ORDER REFERENCE</Text>
          <Text style={styles.orderId}>{currentOrder.reference_code || currentOrder.id}</Text>
        </VStack>
        
        <Text style={styles.title} color="whiteAlpha.800">CURRENT STATUS</Text>
        <Text style={styles.orderId} mb={2}>{currentOrder.status ? currentOrder.status.toUpperCase() : 'N/A'}</Text>

      </Box>
      <Box p={5}>
        <Text style={styles.sectionTitle}>UPDATE ORDER STATUS</Text>
        <Select
            selectedValue={selectedStatus}
            minWidth="200"
            accessibilityLabel="Choose Status"
            placeholder="Choose Status"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" color="white"/>
            }}
            mt={1}
            onValueChange={itemValue => setSelectedStatus(itemValue)}
          >
            {orderStatuses.map(status => (
              <Select.Item key={status} label={status.toUpperCase().replace('_', ' ')} value={status} />
            ))}
        </Select>
        <Button 
            mt={3} 
            onPress={handleUpdateStatus} 
            isLoading={isUpdatingStatus}
            colorScheme="teal"
            isDisabled={!selectedStatus || selectedStatus === currentOrder.status}
        >
            Update Status
        </Button>

        {currentOrder.status === 'picked_up' && ( /* Example condition for showing confirm payment */
            <Button
                mt={4}
                colorScheme="green"
                onPress={handleConfirmPayment}
                isLoading={isConfirmingPayment}
            >
                Confirm Vendor Payment
            </Button>
        )}

        <HStack justifyContent="space-between" my={5}>
            <Pressable onPress={() => Alert.alert("Call Vendor", "Calling vendor...")} alignItems="center">
                <EntypoIcon name="phone" size={24} color="teal" style={{transform:[{rotateY:'180deg'}]}} />
                <Text style={styles.iconText}>Call Vendor</Text>
            </Pressable>
            <Pressable onPress={() => Alert.alert("Message Vendor", "Messaging vendor...")} alignItems="center">
                <EntypoIcon name="chat" size={24} color="teal"  />
                <Text style={styles.iconText}>Message Vendor</Text>
            </Pressable>
        </HStack>
        
        <RNButton
          title="Cancel Current Order"
          onPress={handleCancelOrder}
          color="red"
          disabled={isCancelling || ['delivered', 'cancelled'].includes(currentOrder.status)}
        />
        {isCancelling && <ActivityIndicator style={{marginTop: 5}} color="red"/>}
      </Box>
    </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  map: { height: 250, width: '100%' },
  title: { fontSize: 14, color: 'teal', marginVertical: 2, fontWeight: '500' },
  sectionTitle: { fontSize: 16, color: 'black', marginVertical: 8, fontWeight: '600' },
  restaurantName: { fontSize: 22, fontWeight: 'bold', color: '#FFF' },
  address: { fontSize: 15, color: '#FFF', marginBottom:10, lineHeight: 20 },
  orderReference: { fontSize: 14, color: 'whiteAlpha.800', marginTop: 5, fontWeight: '500' },
  orderId: { fontSize: 20, color: '#FFF', fontWeight: 'bold'},
  iconText: { fontSize: 13, color: 'teal', marginTop: 3 },
});

export default CurrentOrderScreen;