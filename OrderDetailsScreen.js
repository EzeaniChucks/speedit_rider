import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Text, Button, Box, VStack, HStack } from 'native-base';
import { useRoute } from '@react-navigation/native';

const OrderDetailsScreen = () => {
  const route = useRoute();
  const { order } = route.params; // Assuming order details are passed as params
console.log(order);
  const handleGetDirections = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const handleContact = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Order Details</Text>
      <Box borderWidth={1} borderColor="gray.300" borderRadius="md" p={4} mb={4}>
        <VStack space={2}>
          <Text fontSize="lg" fontWeight="bold">Customer Details</Text>
          <Text>Name: {order.customer.name||''}</Text>
          <Text>Phone: {order.customer.phone ||'80'}</Text>
          <Text>Address: {order.deliveryAddress||'add'}</Text>
        </VStack>
      </Box>
      <Box borderWidth={1} borderColor="gray.300" borderRadius="md" p={4} mb={4}>
        <VStack space={2}>
          <Text fontSize="lg" fontWeight="bold">Restaurant Details</Text>
          <Text>Name: {order.restaurant.name}</Text>
          <Text>Location: {order.restaurant.location}</Text>
          <Text>Phone: {order.restaurant.phone ||'80'}</Text>
          <Button onPress={() => handleContact(order.restaurant.phone)} colorScheme="blue">
            Contact Restaurant
          </Button>
          <Button onPress={() => handleGetDirections(order.restaurant.latitude, order.restaurant.longitude)} colorScheme="green" mt={2}>
            Get Directions to Restaurant
          </Button>
        </VStack>
      </Box>
      <Box borderWidth={1} borderColor="gray.300" borderRadius="md" p={4}>
        <VStack space={2}>
          <Text fontSize="lg" fontWeight="bold">Delivery Address</Text>
          <Text>{order.deliveryAddress}</Text>
          <Button onPress={() => console.log('Navigate to delivery address')}
          //handleGetDirections(order.customer.latitude, order.customer.longitude)

           colorScheme="green" mt={2}>
            Get Directions to Customer
          </Button>
        </VStack>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default OrderDetailsScreen;