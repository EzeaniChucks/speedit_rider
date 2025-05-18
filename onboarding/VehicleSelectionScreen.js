import { Box, Progress } from 'native-base';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList } from 'react-native';
import Icons from '@react-native-vector-icons/ant-design';
import { RadioButton } from 'react-native-paper'; // Correct import

const VehicleSelectionScreen = ({route,navigation}) => {
    const { currentProgress } = route.params || {}; // Get progress from route params
    console.log(currentProgress,'pro')
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  
  const vehicleOptions = [
    'Motorbike',
    'Electric motorbike',
    'Bicycle',
    'Electric bicycle',
    'Walker',
  ];
  const [progress, setProgress] = useState(80);
  const handleSelection = (vehicle) => {
    setSelectedVehicle(vehicle);
    setModalVisible(false);
  };
  const handleNext = () => {
    // Logic to 
    console.log("Uploading:", selectedVehicle);
    // Handle the next action here (e.g., navigation)   
    setProgress(prev => Math.min(prev + 20, 100));
    navigation.navigate('NinCollectionScreen',{currentProgress:progress}); // Navigate to the next screen
  };
  return (
    <View style={styles.container}>
       <Box safeArea padding={4}>
         <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
           <Icons name="arrow-left" size={30} color='teal' />
</TouchableOpacity>
      <Text style={styles.head}>Document collection</Text>
         </View>
         <Progress value={progress} colorScheme="teal" size="md" mb={4} /></Box>
         <View style={styles.content}>
      <Text style={styles.question}>Which type of vehicle are you going to use for your deliveries?</Text>
      <TouchableOpacity style={styles.dropdown} onPress={() => setModalVisible(true)}>
        <Text style={styles.dropdownText}>{selectedVehicle || 'Select an option'}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Select option</Text>
          <FlatList
            data={vehicleOptions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelection(item)}
              >
                <Text style={styles.optionText}>{item}</Text>
                <RadioButton
                  value={item}
                  status={selectedVehicle === item ? 'checked' : 'unchecked'}
                  onPress={() => handleSelection(item)}
                />
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  head: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  }, header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
}, content: {
    flex: 1,
   
    marginVertical: 30,
},
  question: {
    fontSize: 16,
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: '#eaeaea',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
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
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VehicleSelectionScreen;