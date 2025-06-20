import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Text, Box, VStack, HStack, Pressable, Badge} from 'native-base';
import Icon from '@react-native-vector-icons/ionicons';

const OrderHistoryScreen = ({navigation}) => {
  // Sample historical order data
  const [orders] = React.useState([
    {
      id: '1',
      restaurant: 'Pizza Palace',
      customer: 'John Doe',
      address: '123 Main St',
      date: '2023-05-15',
      status: 'completed',
      amount: '₦2,800',
      items: ['Large Pepperoni Pizza', '2x Coke']
    },
    {
      id: '2',
      restaurant: 'Sushi Spot',
      customer: 'Jane Smith',
      address: '456 Elm St',
      date: '2023-05-14',
      status: 'cancelled',
      amount: '₦4,500',
      items: ['Salmon Roll', 'Tuna Nigiri']
    },
    {
      id: '3',
      restaurant: 'Burger Joint',
      customer: 'Alice Johnson',
      address: '789 Oak St',
      date: '2023-05-13',
      status: 'completed',
      amount: '₦3,200',
      items: ['Cheeseburger', 'Fries']
    },
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      default: return 'info';
    }
  };

  const renderItem = ({item}) => (
    <Pressable
      onPress={() => navigation.navigate('OrderDetails', {order: item})}
      borderWidth={1}
      borderColor="gray.200"
      borderRadius="lg"
      p={4}
      mb={3}
      bg="white"
      shadow={1}
    >
      <VStack space={2}>
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="lg" fontWeight="bold" color="primary.600">
            {item.restaurant}
          </Text>
          <Badge colorScheme={getStatusColor(item.status)}>
            {item.status.toUpperCase()}
          </Badge>
        </HStack>
        
        <HStack space={2} alignItems="center">
          <Icon name="person-outline" size={16} color="#666" />
          <Text color="gray.600">{item.customer}</Text>
        </HStack>
        
        <HStack space={2} alignItems="center">
          <Icon name="location-outline" size={16} color="#666" />
          <Text color="gray.600">{item.address}</Text>
        </HStack>
        
        <HStack space={2} alignItems="center">
          <Icon name="calendar-outline" size={16} color="#666" />
          <Text color="gray.600">{item.date}</Text>
        </HStack>
        
        <HStack justifyContent="space-between" mt={2}>
          <Box>
            <Text fontSize="sm" color="gray.500">Items:</Text>
            <Text fontSize="sm">{item.items.join(', ')}</Text>
          </Box>
          <Text fontSize="lg" fontWeight="bold">{item.amount}</Text>
        </HStack>
      </VStack>
    </Pressable>
  );

  return (
    <Box flex={1} p={4} bg="gray.50">
      <Text fontSize="2xl" fontWeight="bold" mb={4} color="primary.800">
        Order History
      </Text>
      
      {orders.length === 0 ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Icon name="time-outline" size={48} color="#ccc" />
          <Text mt={4} color="gray.500">No order history yet</Text>
        </Box>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20}}
        />
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});

export default OrderHistoryScreen;