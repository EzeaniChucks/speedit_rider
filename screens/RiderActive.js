import React from 'react';
import { View, Text, StyleSheet, Button, Image,  ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Icon from '@react-native-vector-icons/ionicons';
import { Pressable, VStack ,Box, Icon as Icons, HStack} from 'native-base';
import OrderSection from './OrderSect';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAvailableOrdersQuery } from '../store/ordersApi';
const RiderActive = () => {
  const profile= useSelector((state) => state.auth.user);
 const riderLocation = [7.54, 6.4499834];
 
   // Fetch available orders using the RTK Query hook
   const {
     data: ordersResponse,
     error,
     isLoading,
   } = useGetAvailableOrdersQuery({
     radius: 10000, // Example radius in meters
     riderLocation,
   });
  console.log('error:', error);
   const availableOrders = ordersResponse?.data || [];
   console.log("Available Orders:", availableOrders);
   const notificationCount = availableOrders.length;
 
   const renderOrderSection = () => {
     if (isLoading) {
       return <ActivityIndicator size="large" color="teal" style={{ marginTop: 40 }} />;
     }
 
     if (error) {
       return <Text style={styles.errorText}>Failed to load orders. Please try again.</Text>;
     }
 
     if (notificationCount === 0) {
       return <Text style={styles.notification}>No new orders available right now.</Text>;
     }
 
     return <OrderSection offers={availableOrders} />;
   };
  return (
    <View style={styles.container}>
      <MapView
             style={styles.map}
             initialRegion={{
               latitude: riderLocation[0],
               longitude: riderLocation[1],
               latitudeDelta: 0.01,
               longitudeDelta: 0.01,
             }}
           >
             <Marker coordinate={{ latitude: riderLocation[0], longitude: riderLocation[1] }} />
           </MapView>
      <View style={styles.profileContainer}>
        <Image
          source={require('../assests/avatar.jpg')} // Placeholder for user image
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{profile.firstName+' '+profile.lastName}</Text>
          <Text style={styles.userPhone}>{profile.phone}</Text>
         
        </View>
        <Pressable p={3} borderRadius={'20'} bgColor={'green.500'} style={styles.onlineStatus}>
            <Icon name="radio-button-on" size={20} color="white" />
            <Text style={styles.onlineText}>Online</Text>
          </Pressable>
      </View>
     <View style={styles.infoContainer}>
             <View style={styles.headerContainer}>
               <Image
                 source={require('../assests/avatar.jpg')}
                 style={styles.profilePicture}
               />
               <Text style={styles.headerText}>New Orders Near You</Text>
             </View>
     
             {renderOrderSection()}
     
             {notificationCount > 0 && (
               <Text style={styles.notification}>
                 You have {notificationCount} new notification{notificationCount > 1 ? 's' : ''}.
               </Text>
             )}
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