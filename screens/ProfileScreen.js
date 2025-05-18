// DriverProfile.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import  Ionicons from '@react-native-vector-icons/ionicons';
import { Box, ScrollView } from 'native-base';

const DriverProfile = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
         source={require('../assests/avatar.jpg')} // Replace with your image URL
          style={styles.profileImage}
        />
        <Text style={styles.name}>Bob M.Con</Text>
        <Text style={styles.email}>info@gmail.com</Text>
      </View>

      <Box bgColor={'teal.100'} pt={8} pb={8} style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>950</Text>
          <Text style={styles.statLabel}>Rides</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>5.0</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>6</Text>
          <Text style={styles.statLabel}>Dist</Text>
        </View>
      </Box>

      <View style={styles.menuContainer}>
        <MenuItem icon="person" label="Edit Profile" />
        <MenuItem icon="notifications" label="Notification" />
        <MenuItem icon="location" label="My Location" />
        <MenuItem icon="analytics" label="Wallet" />
        <MenuItem icon="analytics" label="Wallet" />
        <MenuItem icon="analytics" label="Logout" />
      </View>

      <TouchableOpacity style={styles.navButton}>
        <Ionicons name="person-outline" size={24} color="white" />
        <Text style={styles.navButtonText}>Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const MenuItem = ({ icon, label }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Box ml={5}  justifyContent={'center'} alignItems={'center'} w={45} h={45} borderRadius={10} shadow={0.7} style={{shadowColor:'#E9E9E940'}} borderColor={'#EEEEEE'} borderWidth={1} onPress={()=>Linking.openURL(item.link)}>
    <Ionicons name={icon} size={24} color="#963f8a" />
    </Box>
    <Text style={styles.menuItemText}>{label}</Text>
    <Ionicons name="chevron-forward-outline" size={24} color="#963f8a" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 0,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,padding:20
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'grey',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,padding:10
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: 'grey',
  },
  menuContainer: {
    marginBottom: 20,padding:20
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderWidth: 1,
   marginBottom: 10,
        borderColor: '#EEEEEE',
        shadowColor:'#E9E9E940',shadowOpacity:1,borderRadius:10,
  },
  menuItemText: {
    fontSize: 18,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#963f8a',
    padding: 15,
    borderRadius: 5,
  },
  navButtonText: {
    color: 'white',
    marginLeft: 5,
  },
});

export default DriverProfile;