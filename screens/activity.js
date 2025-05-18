// RecentActivity.js

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from '@react-native-vector-icons/evil-icons';
import { HStack, Pressable } from 'native-base';
import { navigate } from '../NavigationService';

const recentActivities = [
  { id: '1', title: 'Order from Resto Padang Gahar', distance: '0.5 km' },
  { id: '2', title: 'Order from Rumah Ale No. 23', distance: '2.8 km' },
];

const RecentActivity = ({navigation}) => {
  const renderActivityItem = ({ item }) => (
    <View style={styles.activityItem}>
      <Icon name="bell" size={20} color="#4CAF50" />
      <View style={styles.activityDetails}>
        <Text style={styles.activityTitle}>{item.title}</Text>
        <Text style={styles.activityDistance}>{item.distance}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
      <Text style={styles.header}>Recent Activity</Text>
      <Pressable bgColor={'teal.300'} p={3} onPress={() => navigate('Earnings',{ itemId: 42 })}>
        <Text style={{fontSize:14,color:'white'}}>Show More</Text></Pressable>
      </HStack>
      <FlatList
        data={recentActivities}
        renderItem={renderActivityItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  activityDetails: {
    marginLeft: 10,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  activityDistance: {
    fontSize: 14,
    color: '#888',
  },
});

export default RecentActivity;