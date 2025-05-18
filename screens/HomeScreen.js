import { Button, Pressable, VStack ,Box, Icon as Icons, HStack} from 'native-base';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image,Modal, } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from '@react-native-vector-icons/ionicons';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import { navigate } from '../NavigationService';
const DashboardScreen = () => {
  const NewOrderModal = ({ visible, onClose }) => {
    return (
      <Modal 
        transparent={true} 
        animationType="slide" 
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={style.overlay}>
          <View style={style.modalContainer}>
            <Text style={style.title}>New Orders</Text>
            <Text style={style.earnings}>Earnings: $12.00</Text>
            <View style={style.orderDetails}>
              <Text style={style.orderText}>Resto Padang Gahar</Text>
              <Text style={style.distance}>0.5 km</Text>
            </View>
            <View style={style.orderDetails}>
              <Text style={style.orderText}>Rumah Ale No. 23</Text>
              <Text style={style.distance}>2.8 km</Text>
            </View>
            <Button title="Accept Order (20s)" onPress={onClose} color="#4CAF50" />
          </View>
        </View>
      </Modal>
    );
  };
  const style = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      elevation: 5,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    earnings: {
      fontSize: 18,
      color: '#FFA500',
      marginBottom: 20,
    },
    orderDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    orderText: {
      fontSize: 16,
    },
    distance: {
      fontSize: 16,
      color: '#888',
    },
  });  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
      <Box style={styles.header}>

      </Box>
      <View style={styles.profileContainer}>
        <Image
          source={require('../assests/avatar.jpg')} // Placeholder for user image
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Ahmad F W</Text>
          <Text style={styles.userPhone}>+629 5371 7526 86</Text>
         
        </View>
        <Pressable p={3} borderRadius={'20'} bgColor={'#FFA500'} style={styles.onlineStatus}>
            <Icon name="radio-button-on" size={20} color="white" />
            <Text style={styles.onlineText}>Offline</Text>
          </Pressable>
      </View>
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Balance</Text>
          <Text style={styles.cardAmount}>10,000 NGN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Total Income</Text>
          <Text style={styles.cardAmount}>100,000 NGN</Text>
        </TouchableOpacity>
</View>
<View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card}>
      
          <Text style={styles.cardTitle}>Pending Requests</Text>
          <Text style={styles.cardAmount}>2</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
       
          <Text style={styles.cardTitle}>Completed Requests</Text>
          <Text style={styles.cardAmount}>10</Text>
        </TouchableOpacity>
      </View>
</View>
<Box   height={400} />
<Box bgColor={'teal.300'} style={styles.summaryContainer}>
  
        <Text style={styles.header}>Yesterday</Text>
        <HStack justifyContent={'space-between'} mt={5} alignItems={'center'}>
        <Box  width={'50%'}>
        <Text style={styles.text}>MONEY EARNED</Text>
        <Text style={styles.amount}>N 280</Text></Box>
        <Box  width={'40%'}>
        <Text style={styles.text}>HOURS ONLINE</Text>
        <Text style={styles.amount}>8.5 hrs</Text></Box></HStack>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
        <Box  width={'50%'}>
        <Text style={styles.text}>TOTAL DISTANCE</Text>
        <Text style={styles.amount}>24 km</Text></Box>
        <Box  width={'40%'}>
        <Text style={styles.text}>TOTAL JOBS</Text>
        <Text style={styles.amount}>20</Text></Box></HStack>
        <Box height={100}/>
        {/* Go Online Button */}
        <TouchableOpacity onPress={()=> navigate('RiderActive')} style={styles.button}>
          <Text style={styles.buttonText}>Go online</Text>
        </TouchableOpacity>
      </Box>
      {/* <Card style={styles.ordersCard}>
        <Card.Content>
          
          <Text style={styles.title}>New Orders</Text>
          <Box flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <VStack>
          <Text style={styles.earningstitle}>Earnings: </Text>
          <Text style={styles.earnings}> $12.00</Text>
          </VStack>
          <Pressable p={3} borderRadius={10} flexDir={'row'} justifyContent={'space-evenly'} backgroundColor={'#F0F8FF'}borderColor={'teal.300'} borderWidth={1}>
            
            <Text style={styles.earningspaid}>Already Paid</Text>
            </Pressable>
          </Box>
          <View style={styles.orderItem}>
            <Text style={styles.orderName}>Resto Padang Gahar</Text>
            <Text style={styles.orderDistance}>0.5 km</Text>
          </View>
          <Text style={styles.orderDetail}>
            Jl. Jendral Ahmad Yani No.20, Pengkol IV, Pengkol, Kec. Jepara, Kabupaten Jepara
          </Text>
          <View style={styles.orderItem}>
            <Text style={styles.orderName}>Rumah Ale No. 23</Text>
            <Text style={styles.orderDistance}>2.8 km</Text>
          </View>
          <Text style={styles.orderDetail}>
            Jl. Pancoran Timur No.18, RT.8/RW.9, Kec. Jepara, Kabupaten Jepara
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button title="Accept Order (20s)" color="#28A745" onPress={() => alert('Order Accepted')} />
        </Card.Actions>
      </Card> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
  backgroundColor:'white',
   // backgroundColor: '#F0F8FF',
    padding: 0,
  },
  headerContainer:{
    flex: 1,
    padding: 20,backgroundColor:'teal',borderBottomLeftRadius: '5%',borderBottomRightRadius:'5%',
  },
    button: {
    backgroundColor: 'teal',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    borderColor:'#F5F7F5',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    flex: 0.45,
    alignItems: 'flex-end',
  },
  cardTitle: {
    fontSize: 15,
    color: 'black',fontFamily:'Sans-Serif'
  },
  cardAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'teal',
    marginTop: 5,
  },
  footer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#F0F8FF',
    borderRadius: 10,
    alignItems: 'center',
  },
  
  profileContainer: {
    flexDirection: 'row',
    padding: 16,
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
  mapContainer: {
    height: 200,
   
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
   
  },
  ordersCard: {
    borderRadius: 12,
    padding: 20,
   borderTopLeftRadius:20,borderTopRightRadius:20,backgroundColor:'white'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  earnings: {
    fontSize: 18,
    color: '#FFD700',
  },
  earningstitle: {
    fontSize: 18,
    color: 'black',
  },
  earningspaid: {
    fontSize: 14,
    color: 'teal',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  orderName: {
    fontSize: 16,
  },
  orderDistance: {
    fontSize: 14,
    color: '#666',
  },
  orderDetail: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerDetails: {
    fontSize: 14,
    color: '#808080',
  },
  dateContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  
  summaryContainer: {
   // backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,color:'white'
  },
  text: {
    fontSize: 16,
    marginBottom: 5,color:'teal'
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,color:'white'
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateInfo: {
    fontSize: 14,
    color: '#808080',
  },
});

export default DashboardScreen;