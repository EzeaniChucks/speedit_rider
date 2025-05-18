import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Button, Box, VStack, HStack, Pressable } from 'native-base';

const OrderListScreen = ({navigation}) => {
  // Sample data for incoming delivery requests
  const [orders, setOrders] = useState([
    { id: '1', restaurant: [{ name: 'Pizza Place', location: '123 Main St' }], customer: 'John Doe', address: '123 Main St', status: 'pending' },
    { id: '2', restaurant: [{ name: 'Sushi Spot', location: '123 Main St' }], customer: 'Jane Smith', address: '456 Elm St', status: 'pending' },
    { id: '3', restaurant: [{ name: 'Burger Joint', location: '123 Main St' }], customer: 'Alice Johnson', address: '789 Oak St', status: 'pending' },
  ]);
const [selectedOrder, setSelectedOrder] = useState(null);
  const handleAccept = (id) => {
    // Logic to accept the order
    setOrders((prevOrders) => 
      prevOrders.map((order) => 
        order.id === id ? { ...order, status: 'accepted' } : order
      )
    );
  };

  const handleDecline = (id) => {
    // Logic to decline the order
    setOrders((prevOrders) => 
      prevOrders.filter((order) => order.id !== id)
    );
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={()=> navigation.navigate('OrderDetails',{order:item})} borderWidth={1} borderColor="gray.300" borderRadius="md" p={4} mb={4}>
      <VStack space={2}>
        <Text fontSize="lg" fontWeight="bold">{item.restaurant}</Text>
        <Text>Customer: {item.customer}</Text>
        <Text>Address: {item.address}</Text>
        <Text>Status: {item.status}</Text>
        <HStack space={2} mt={2}>
          <Button onPress={() => handleAccept(item.id)} colorScheme="green">
            Accept
          </Button>
          <Button onPress={() => handleDecline(item.id)} colorScheme="red">
            Decline
          </Button>
        </HStack>
      </VStack>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Incoming Delivery Requests</Text>
      {orders.length === 0 ? (
        <Text>No incoming delivery requests at the moment.</Text>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
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

export default OrderListScreen;