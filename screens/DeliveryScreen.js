import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import  MaterialIcons  from '@react-native-vector-icons/ionicons'; // Ensure you have this package installed
import { HStack, Pressable } from 'native-base';
import Icon from '@react-native-vector-icons/ant-design';

const DeliveryScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
      <HStack justifyContent={'space-around'}>
        <Pressable onPress={()=>navigation.goBack()}>
         <Icon name="arrow-left" size={20} color="teal"  /></Pressable>
      <Text style={styles.header}>Deliver: 02165465-2115145=54485-5455c</Text></HStack>
        <Text style={styles.deliveryTitle}>Deliver:</Text>
        

        <View style={styles.card}>
          <Text style={styles.deliverName}>Bulbul Ahmed</Text>
          <View style={styles.contactContainer}>
            <MaterialIcons name="phone" size={24} color="black" />
          </View>
          <Text style={styles.address}>2154 S. Maryland Pkwy Las Vegas, NV 25874</Text>
        </View>

        <Text style={styles.itemsTitle}>Items</Text>

        {renderItem("Burger Meal", 2)}
        {renderItem("Pizza", 1)}
        {renderItem("Black Beans And Rice", 1)}

        <Text style={styles.greenText}>Given 3 items to customer</Text>
        <Text style={styles.infoText}>
          User didn't ask for a contactless delivery. Please handover the food to the customer in hand.
        </Text>
      </ScrollView>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Mark Order Deliver</Text>
      </TouchableOpacity>
    </View>
  );
};

const renderItem = (itemName, itemCount) => (
  <View style={styles.itemContainer}>
    <Text style={styles.itemName}>{itemName}</Text>
    <Text style={styles.itemCount}>Items: {itemCount}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 16,
  },
  timeStamp: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderID: {
    fontSize: 12,
    color: 'gray',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  deliverName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactContainer: {
    marginVertical: 4,
  },
  address: {
    fontSize: 14,
    color: 'gray',
  },
  itemsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 8,
  },
  itemName: {
    fontSize: 14,
  },
  itemCount: {
    fontSize: 14,
    color: 'gray',
  },
  greenText: {
    color: 'green',
    marginVertical: 8,
  },
  infoText: {
    fontSize: 12,
    color: 'gray',
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#FF3D00',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DeliveryScreen;