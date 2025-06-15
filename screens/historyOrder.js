import React, { useState } from 'react';
import { FlatList, View, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Text, VStack, HStack, Divider, Button } from 'native-base';
import { useGetOrderHistoryQuery } from '../store/ordersApi';
import { useNavigation } from '@react-navigation/native';

const OrderHistoryItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Box borderWidth={1} borderColor="gray.300" borderRadius="md" p={4} mb={3} bg="white">
      <HStack justifyContent="space-between" alignItems="center">
        <VStack flex={1}>
          <Text fontWeight="bold" fontSize="md">Order ID: {item.reference_code || item.id}</Text>
          <Text color="gray.600">
            From: {item.pickup_address?.street || 'N/A'}
          </Text>
          <Text color="gray.600">
            To: {item.dropoff_address?.street || 'N/A'}
          </Text>
        </VStack>
        <VStack alignItems="flex-end">
            <Text color="gray.700" fontSize="sm">
                {new Date(item.created_at || Date.now()).toLocaleDateString()}
            </Text>
            <Text fontWeight="bold" color={item.status === 'delivered' ? 'green.500' : 'orange.500'}>
                {item.status?.toUpperCase() || 'N/A'}
            </Text>
            <Text fontSize="lg" fontWeight="bold" mt={1}>
                N{item.final_fare || item.estimated_fare || '0.00'}
            </Text>
        </VStack>
      </HStack>
    </Box>
  </TouchableOpacity>
);

const OrderHistoryScreen = () => {
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isFetching, refetch } = useGetOrderHistoryQuery({ page, limit: 10 });

  const orders = data?.results || data || []; // Adapt based on your API response for pagination
  const totalPages = data?.totalPages || 1; // Adapt if your API provides total pages

  const handleLoadMore = () => {
    if (page < totalPages && !isFetching) {
      setPage(page + 1); // RTK Query will fetch more if page changes, or you might need to manage data merging manually if not using infinite scroll setup
    }
  };
  
  const handleOrderItemPress = (orderId) => {
      console.log("Navigate to details for order:", orderId);
       navigation.navigate('OrderDetails', { orderId }); // If you have an OrderDetails screen
  };

  if (isLoading && page === 1) {
    return <Box flex={1} justifyContent="center" alignItems="center"><ActivityIndicator size="large" color="teal" /></Box>;
  }

  if (error) {
    return <Box flex={1} justifyContent="center" alignItems="center"><Text color="red.500">Error: {error.message}</Text></Box>;
  }

  return (
    <Box flex={1} bg="gray.100" p={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Order History</Text>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderHistoryItem item={item} onPress={() => handleOrderItemPress(item.id)} />}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={refetch}
        refreshing={isLoading && page === 1} // Show refresh indicator only on initial load/pull-to-refresh
        // For loading more, you could add a footer component
        // ListFooterComponent={isFetching && page > 1 ? <ActivityIndicator style={{marginVertical: 10}}/> : null}
        // onEndReached={handleLoadMore} // This is for infinite scroll
        // onEndReachedThreshold={0.5}
        ListEmptyComponent={<Text textAlign="center" mt={10}>No order history found.</Text>}
      />
       {/* Simple Pagination Example - For more complex needs, consider libraries */}
       <HStack justifyContent="space-between" alignItems="center" mt={4}>
        <Button onPress={() => setPage(p => Math.max(1, p - 1))} isDisabled={page === 1 || isFetching}>
          Previous
        </Button>
        <Text>Page {page} {totalPages > 1 ? `of ${totalPages}` : ''}</Text>
        <Button onPress={() => setPage(p => Math.min(totalPages, p + 1))} isDisabled={page === totalPages || isFetching}>
          Next
        </Button>
      </HStack>
    </Box>
  );
};

export default OrderHistoryScreen;