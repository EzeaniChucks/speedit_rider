import { Box, Progress } from 'native-base';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icons from '@react-native-vector-icons/ant-design';

const NinCollectionScreen = ({route,navigation}) => {
    const { currentProgress } = route.params || {}; // Get progress from route params
  console.log(currentProgress)
  const [bankNumber, setBankNumber] = useState('');
    const [progress, setProgress] = useState(currentProgress || 100); // Initialize progress state
  const handleNext = () => {
    // Handle the next action here (e.g., navigation)
    console.log("Bank Name Submitted:", );
    setProgress(prev => Math.min(prev + 20, 100));
    navigation.navigate('BottomTabNavigator'); // Navigate to the next screen
  };

  return (
    <View style={styles.container}>
            <Box safeArea padding={4}>
           <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
           <Icons name="arrow-left" size={30} color='teal' />
</TouchableOpacity>
      <Text style={styles.title}>Document collection</Text>
         </View>
         <Progress value={progress} colorScheme="teal" size="md" mb={4} />
      
         </Box>
           <View style={styles.content}>
     
      <Box>
      <Text style={styles.subtitle}>
        Enter your Nin number (e.g National Identification Number)
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Number Here"
        value={bankNumber}
        onChangeText={setBankNumber}
      />
      </Box>
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
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    marginVertical: 10,
    fontSize: 16,
    color: '#555',
  },
  content: {
    flex: 1,
   
    marginVertical: 30,
},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
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
});

export default NinCollectionScreen;