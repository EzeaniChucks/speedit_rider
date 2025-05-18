import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Pressable, Slider, VStack ,Box, Icon as Icons, HStack, StatusBar} from 'native-base';
import Icon from '@react-native-vector-icons/entypo';
import RiderStatus from './DriverStatus';
import { navigate } from '../NavigationService';
const PickupScreen = () => {
    return (
        <Box bg={'teal.300'} style={styles.container}>
            <StatusBar barStyle={'default'} />
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
      <RiderStatus />
      <Box p={5}>
          
            <Text style={styles.title}>PICK UP</Text>
            <Text style={styles.restaurantName}>Tasty Dumplings</Text>
            <Text style={styles.address}>
                GE Leruf Square 1088 Arlegui St, Bgy 385, Zone 039 1001 Metro Manila, Philippines
            </Text>
            <VStack mb={4}>
            <Text style={styles.orderReference}>ORDER REFERENCE</Text>
            <Text style={styles.order}> 0002221111333</Text>
            </VStack>
            {/* <Slider w="3/4" maxW="300" defaultValue={70} minValue={0} maxValue={100} style={styles.slider} /> */}
            <Box mb={6}>
            <Text style={styles.title}>ROUTE</Text>
            <Text style={styles.route}> via Tomas Mapua St and Dasmariñas St</Text>
            </Box>
            <Box mb={6}>
            <Text style={styles.title}>ETA</Text>
            <Text style={styles.eta}> 10 mins</Text>
</Box>
            <View style={styles.buttonContainer}>
                <Pressable  onPress={() => console.log('Call pressed')} >
                <Icon name="phone" size={20} color="teal" style={{transform:[{rotateY:'180deg'}]}} />
                <Text style={styles.title}>Call</Text>
                </Pressable>
                <Pressable  onPress={() => console.log('Call pressed')} >
                <Icon name="chat" size={20} color="teal"  />
                <Text style={styles.title}>Message</Text>
                </Pressable>
            </View>
            
            <View style={styles.actionContainer}>
                <Button title="Cancel Job" onPress={() => console.log('Cancel Job pressed')} color="red" />
                <Button title="Go to Pick Up" onPress={() => navigate('OrderPicked',{name:'order'})} />
            </View>
            </Box>
        </Box>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        //backgroundColor:'teal'
      },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    title: {
        fontSize: 18,
        color: 'teal',
        marginVertical: 5,
    },
    restaurantName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
    },
    address: {
        fontSize: 16,
        color: '#FFF',marginBottom:10
    },
    map: {
        flex: 1,
      },
    orderReference: {
        fontSize: 16,
        color: 'teal',
        marginTop: 10,
    },
    slider: {
        marginVertical: 20,
    },
    route: {
        fontSize: 16,
        color: '#FFF',
    },  order: {
        fontSize: 20,
        color: '#FFF',
    },
    eta: {
        fontSize: 16,
        color: '#FFF',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default PickupScreen;