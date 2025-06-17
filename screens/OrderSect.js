// components/services/offerSection.js
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Button,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {Box, Text, Image, HStack, Pressable, VStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {RadioButton} from 'react-native-paper'; // Correct import
import Icons from '@react-native-vector-icons/ant-design';
const OrderCard = ({offer, onPress, onAccept}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const handleSelection = vehicle => {
    setSelectedReason(vehicle);
    // setModalVisible(false);
  };
  const vehicleOptions = [
    'Distance is too far',
    'The Order is too small',
    "I don't want to place this order",
    "i don't want to go to ths store",
    'I have too many orders',
  ];
  return (
    <Pressable
      bgColor={'teal.300'}
      style={[styles.offerCard]}
      onPress={onPress}>
      <HStack space={4} justifyContent={'space-between'} marginBottom={10}>
        <VStack pl={2} width={'50%'}>
          <Text style={styles.label}>PICK UP</Text>
          <Text style={styles.address}>Arlegui St </Text>
          <Text style={styles.addresslower}>at 1066 Zone 039</Text>
        </VStack>
        <VStack width={'40%'}>
          <Text style={styles.label}>EST. FARE</Text>
          <Text style={styles.fare}> N14</Text>{' '}
        </VStack>
      </HStack>
      <HStack space={2} justifyContent={'space-between'} alignItems="center">
        <VStack pl={2} width={'50%'}>
          <Text style={styles.label}>DROP OFF</Text>
          <Text style={styles.address}>Loyola St </Text>
          <Text style={styles.addresslower}>at 1200 Sampaloc</Text>
        </VStack>
        <VStack width={'40%'}>
          <Text style={styles.label}>TOTAL DISTANCE</Text>
          <Text style={styles.distance}>5.4 km</Text>
          <Box h={4} />
        </VStack>
      </HStack>
      <View style={styles.buttonContainer}>
        <Button
          title="Ignore"
          color="#ff4d4d"
          onPress={() => setModalVisible(true)}
        />
        <Button title="Accept" color="teal" onPress={onPress} />
      </View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Tell us Why?</Text>
          <FlatList
            data={vehicleOptions}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelection(item)}>
                <Text style={styles.optionText}>{item}</Text>
                <RadioButton
                  value={item}
                  status={selectedReason === item ? 'checked' : 'unchecked'}
                  onPress={() => handleSelection(item)}
                />
              </TouchableOpacity>
            )}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text style={styles.backButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text style={styles.closeButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Pressable>
  );
};

const OrderSection = ({offers}) => {
  //   if (!offers || offers.length === 0) {
  //     return null;
  //   }
  const navigation = useNavigation();

  const handlePress = (item) => {
    navigation.navigate('PickupScreen', {order: item});
  };
  return (
    <Box style={styles.container}>
      <FlatList
        data={offers}
        renderItem={({item}) => (
          <OrderCard
            offer={item}
            onPress={() => handlePress(item)}
          />
        )}
        keyExtractor={item => item?.id?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.offerList}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 330,
    backgroundColor: 'white',
    marginTop: 30,
    width: '98%',
    left: 4,
    flex: 1,
    paddingTop: 11,
    paddingLeft: 2,
    paddingBottom: 20,
    justifyContent: 'center',
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    marginTop: 20,
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
  },
  viewAll: {
    fontSize: 14,
    color: '#513DB0',
    fontFamily: 'Inter-SemiBold',
  },
  offerList: {
    paddingRight: 16, // Add some padding to the end of the list
  },
  offerCard: {
    width: "auto",
    height: 450,
    // backgroundColor: 'blue',
    borderRadius: 12,
    marginRight: 16,
    marginTop: 10,
    overflow: 'hidden',
    padding: 10,
  },
  label: {
    fontSize: 14,
    color: 'teal',
    marginTop: 10,
  },
  address: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  addresslower: {
    fontSize: 14,
    color: '#f4f4f4',
  },
  distance: {
    fontSize: 20,
    color: '#f4f4f4',
    fontWeight: 'bold',
  },
  fare: {
    fontSize: 18,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    borderTopColor: 'teal',
    borderTopWidth: 1,
    paddingTop: 10,
  },
  offerImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  offerContent: {
    padding: 12,
  },
  offerTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#333',
    marginBottom: 4,
  },
  offerDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 8,
  },
  offerFooter: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  offerDiscount: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#513DB0',
  },
  offerValidity: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  title: {
    fontSize: 48,
    textAlign: 'left',
    fontFamily: 'Inter-Bold',
    color: 'rgba(51, 56, 63, 1)',
    paddingLeft: 15,
    marginBottom: 15,
    paddingTop: 50,
  },
  head: {
    fontSize: 13,
    textAlign: 'left',
    fontFamily: 'Inter-SemiBold',
    color: 'rgba(51, 56, 63, 1)',
    paddingLeft: 15,
    paddingTop: 10,
    letterSpacing: -1,
  },
  buttonText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(106, 155, 126, 1)',
  },
  chevronIcon: {
    marginTop: 3,
    color: 'rgba(106, 155, 126, 1)',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 9,
    width: 120,
    height: 40,
    justifyContent: 'center',
    marginLeft: 13,
  },
  icon: {
    marginTop: 8,
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
  backButton: {
    marginTop: 20,
    width: '40%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#007AFF',
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    width: '40%',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderSection;
