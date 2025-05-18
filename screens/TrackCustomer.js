import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { navigate } from '../NavigationService';

const TrackCustomer = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 23.8103,
          longitude: 90.4125,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
      >
        {/* Markers */}
        <Marker coordinate={{ latitude: 23.8103, longitude: 90.4125 }} />
        <Marker coordinate={{ latitude: 23.8053, longitude: 90.4175 }} />

        {/* Polyline */}
        <Polyline
          coordinates={[
            { latitude: 23.8103, longitude: 90.4125 },
            { latitude: 23.8053, longitude: 90.4175 },
          ]}
          strokeColor="#000" // Customize the color
          strokeWidth={6} // Customize the width
        />
      </MapView>
      
      {/* Info Card */}
      <View style={styles.card}>
        <Text style={styles.name}>Bulbul Ahmed</Text>
        <Text style={styles.orderId}>Order ID #2152541</Text>
        <Text style={styles.addressTitle}>Deliver</Text>
        <Text style={styles.address}>2154 S. Maryland Pkwy Las Vegas, NV 25874</Text>
        
        <TouchableOpacity onPress={() => navigate('DeliveryScreen',{name:'order'})} style={styles.button}>
          <Text style={styles.buttonText}>Reached Customer Door Step</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  card: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    right: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderId: {
    color: '#888',
  },
  addressTitle: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  address: {
    marginTop: 5,
  },
  button: {
    marginTop: 15,
    backgroundColor: '#f00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TrackCustomer;