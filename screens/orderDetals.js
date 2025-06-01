import React from 'react';
import { ScrollView, ActivityIndicator, StyleSheet, View } from 'react-native';
import { Box, Text, VStack, HStack, Divider, Button, Icon } from 'native-base';
import { useGetOrderDetailsQuery } from '../store/ordersApi';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // For icons

const DetailRow = ({ label, value, iconName }) => (
  <HStack alignItems="center" space={3} py={2}>
    {iconName && <Icon as={MaterialIcons} name={iconName} size="md" color="teal.600" />}
    <VStack flex={1}>
      <Text fontSize="sm" color="gray.500">{label}</Text>
      <Text fontSize="md" fontWeight="medium" color="gray.800">{value || 'N/A'}</Text>
    </VStack>
  </HStack>
);

const AddressCard = ({ title, address, iconName }) => {
  if (!address) return <DetailRow label={title} value="Not provided" iconName={iconName} />;
  return (
    <Box borderWidth={1} borderColor="gray.200" borderRadius="md" p={3} my={2}>
      <HStack alignItems="center" space={2} mb={1}>
        <Icon as={MaterialIcons} name={iconName} size="lg" color="teal.700" />
        <Text fontSize="lg" fontWeight="bold" color="teal.700">{title}</Text>
      </HStack>
      <Text>{address.full_address || `${address.street}, ${address.city}`}</Text>
      {address.details && <Text fontSize="sm" color="gray.600">Details: {address.details}</Text>}
      {address.contact_name && <Text fontSize="sm" color="gray.600">Contact: {address.contact_name} ({address.contact_phone})</Text>}
    </Box>
  );
};


const OrderDetailsScreen = ({ route, navigation }) => {
  const { orderId } = route.params;
  const { data: order, error, isLoading, refetch } = useGetOrderDetailsQuery(orderId);

  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="teal" />
        <Text mt={2}>Loading order details...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" p={4}>
        <Text color="red.500" textAlign="center">
          Error loading order details: {error.data?.message || error.message || 'Unknown error'}
        </Text>
        <Button onPress={refetch} mt={3} colorScheme="teal">Try Again</Button>
      </Box>
    );
  }

  if (!order) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>Order not found.</Text>
      </Box>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <Box flex={1} bg="white" p={4}>
        <Text fontSize="2xl" fontWeight="bold" mb={3} color="teal.700">
          Order #{order.reference_code || order.id}
        </Text>
        <Divider my={2} />

        <AddressCard title="Pickup Location" address={order.pickup_address} iconName="storefront" />
        <AddressCard title="Drop-off Location" address={order.dropoff_address} iconName="place" />

        <Divider my={3} />
        <Text fontSize="lg" fontWeight="semibold" mb={2} color="gray.700">Order Summary</Text>
        
        {/* Assuming order.items is an array. Adjust if structure is different */}
        {order.items && order.items.length > 0 && (
            <VStack space={1} mb={3} borderWidth={1} borderColor="gray.200" borderRadius="md" p={3}>
                <Text fontSize="md" fontWeight="medium" color="gray.600">Items:</Text>
                {order.items.map((item, index) => (
                    <HStack key={index} justifyContent="space-between">
                        <Text>{item.name} (x{item.quantity})</Text>
                        <Text>N{item.price}</Text>
                    </HStack>
                ))}
            </VStack>
        )}

        <DetailRow label="Current Status" value={order.status?.toUpperCase().replace('_', ' ') || 'N/A'} iconName="delivery-dining" />
        <DetailRow label="Estimated Fare" value={`N${order.estimated_fare || '0.00'}`} iconName="payments" />
        {order.final_fare && <DetailRow label="Final Fare" value={`N${order.final_fare}`} iconName="receipt-long" />}
        <DetailRow label="Distance" value={`${order.total_distance_km || 'N/A'} km`} iconName="directions-walk" />
        <DetailRow label="Order Placed" value={new Date(order.created_at).toLocaleString()} iconName="schedule" />
        {order.accepted_at && <DetailRow label="Accepted At" value={new Date(order.accepted_at).toLocaleString()} iconName="check-circle-outline" />}
        {order.delivered_at && <DetailRow label="Delivered At" value={new Date(order.delivered_at).toLocaleString()} iconName="done-all" />}

        {/* Add more details as needed based on your API response */}
        {/* e.g., order.notes, order.payment_method, etc. */}

        <VStack space={2} mt={5}>
            {order.cancellation_reason && (
                 <Box bg="red.100" p={3} borderRadius="md">
                    <Text fontWeight="bold" color="red.700">Cancellation Reason:</Text>
                    <Text color="red.600">{order.cancellation_reason}</Text>
                </Box>
            )}
        </VStack>


      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
});

export default OrderDetailsScreen;