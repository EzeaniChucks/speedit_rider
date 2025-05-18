import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Toast } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';

import { useSelector } from 'react-redux';



const NotifySwitch = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const translateX = useState(new Animated.Value(0))[0];
const [availabilityStatus, setAvailabilityStatus] = useState('busy'); // Initial status
  const  FCM  = useSelector(TOKEN);
   useEffect(() => {
    AsyncStorage.getItem("FCMStatus").then((data) => {
      if (data) {
        setIsEnabled(JSON.parse(data));
        console.log(isEnabled,'first',data)
      }
      Animated.timing(translateX, {
      toValue: isEnabled ? 0 : 17, // Adjust this value based on thumb size
      duration: 200,
      useNativeDriver: true,
    }).start();  
    });
  }, []);
  const toggleSwitch= async () => {
    setIsEnabled(previousState => !previousState);
    console.log(isEnabled)
    Animated.timing(translateX, {
      toValue: isEnabled ? 0 : 17, // Adjust this value based on thumb size
      duration: 200,
      useNativeDriver: true,
    }).start();   
    try {
        AsyncStorage.setItem("FCMStatus", JSON.stringify(!isEnabled));
          const token = await AsyncStorage.getItem('userToken');
            const FCMToken = await AsyncStorage.getItem('FCMToken');
         let parse = JSON.parse(token);
        
         console.log(FCM,'====',FCMToken)
         
      const response = await instance.patch('/notifications/activate-push-notification',{ "device_token": FCM,"status": isEnabled});
 
      if (response) {

         console.log(isEnabled,response.data)
        console.log('Availability status updated successfully!');
        if(isEnabled=== false)
     { 
        Toast.show({ render: () => {return <ToastSuccess  title='Status Updated' status={'success'}  message={'you have turned on notifictaions!'} /> }})
     } // navigation.navigate('bottomTab')
     else{
    Toast.show({ render: () => {return <ToastSuccess  title='Status Updated' status={'success'}  message={'you will no longer receive notifications!'} /> }})
    
     }
      } else {
        console.log('Failed to update availability status');
      }
    } catch (error) {
      console.error(error);
      console.log(error.response?.data?.message)
    }
  
  };

  return (
    <TouchableOpacity style={styles.switchContainer} onPress={()=>toggleSwitch()}>
      <Animated.View  style={[styles.track, isEnabled && styles.trackEnabled]}>
        <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: 40, // Width of the switch
    height: 25, // Height of the switch
    justifyContent: 'left',
    alignItems: 'center',marginBottom:5,marginTop:0,marginLeft:-10
  },
  track: {
    width: '100%',
    height: '100%',
    borderRadius: 17, // Half of the height for rounded corners
    backgroundColor: '#ccc',
    justifyContent: 'flex-start',
    padding: 5, // Padding to make track wider
  },
  trackEnabled: {
    backgroundColor: '#513DB0', // Color when enabled
  },
  thumb: {
    width: 22, // Width of the thumb
    height: 22, // Height of the thumb
    borderRadius: 12, // Half of the height for rounded shape
    backgroundColor: 'white',
    position: 'absolute',
    top: 2, // Center the thumb vertically
  },
});

export default NotifySwitch;