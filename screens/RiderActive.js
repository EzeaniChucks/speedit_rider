import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Icon from '@react-native-vector-icons/ionicons';
import { Pressable, VStack ,Box, Icon as Icons, HStack} from 'native-base';
import OrderSection from './OrderSect';
const RiderActive = () => {
  const Orders =[
    { id: '1', restaurant: [{ name: 'Pizza Place', location: '123 Main St' }], customer: [{ name:  'John Doe' }], address: '123 Main St', status: 'pending' },
    { id: '2', restaurant: [{ name: 'Sushi Spot', location: '123 Main St' }], customer: [{ name:  'Jane Smith' }], address: '456 Elm St', status: 'pending' },
    { id: '3', restaurant: [{ name: 'Burger Joint', location: '123 Main St' }], customer: [{ name:  'Alice Johnson' }], address: '789 Oak St', status: 'pending' },

  ]
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 14.6183,
          longitude: 121.0541,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude: 14.6183, longitude: 121.0541 }} />
        <Marker coordinate={{ latitude: 14.6200, longitude: 121.0585 }} />
        <Polyline 
          coordinates={[
            { latitude: 14.6183, longitude: 121.0541 },
            { latitude: 14.6200, longitude: 121.0585 },
          ]}
          strokeColor="#000" // Customize the path color
          strokeWidth={3}
        />
      </MapView>
      <View style={styles.profileContainer}>
        <Image
          source={require('../assests/avatar.jpg')} // Placeholder for user image
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Ahmad F W</Text>
          <Text style={styles.userPhone}>+629 5371 7526 86</Text>
         
        </View>
        <Pressable p={3} borderRadius={'20'} bgColor={'green.500'} style={styles.onlineStatus}>
            <Icon name="radio-button-on" size={20} color="white" />
            <Text style={styles.onlineText}>Online</Text>
          </Pressable>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../assests/avatar.jpg')} // Replace with your image URL
            style={styles.profilePicture}
          />
          <Text style={styles.headerText}>Restaurant Name/Address</Text>
        </View>

   <OrderSection offers={Orders} />

      
        
        <Text style={styles.notification}>You have 3 new notifications.</Text>
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
  infoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  label: {
    fontSize: 12,
    color: '#999',
    marginTop: 10,
  },
  address: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fare: {
    fontSize: 18,
    color: '#007AFF',
  },
  profileContainer: {
    flexDirection: 'row',
    padding: 16,position:'absolute',top:10,width:'90%', left:20,
   justifyContent:'space-between', backgroundColor:'white',borderRadius:20,marginBottom:20,alignItems:'center',borderColor:'teal',borderWidth:1
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
    alignItems: 'center',justifyContent:'flex-end'
  },
  onlineText: {
    marginLeft: 5,
    color: 'white',
  },
  distance: {
    fontSize: 16,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  notification: {
    marginTop: 20,
    textAlign: 'center',
    color: '#999',
  },
});

export default RiderActive;