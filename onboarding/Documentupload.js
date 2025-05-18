import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import { Box, Progress } from 'native-base';
import Icons from '@react-native-vector-icons/ant-design';

const DocumentUploadScreen = ({navigation}) => {
  const [imageUri, setImageUri] = useState(null);

  const handleImageUpload = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else if (response.assets) {
        setImageUri(response.assets[0].uri);
      }
    });
  };
  const [progress, setProgress] = useState(60);
  const handleUpload = () => {
    // Logic to upload the image (imageUri) to the server
    console.log("Uploading:", imageUri);
    // Handle the next action here (e.g., navigation)   
    setProgress(prev => Math.min(prev + 20, 100));
    navigation.navigate('VehicleSelectionScreen',{currentProgress:progress}); // Navigate to the next screen
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
         <Progress value={progress} colorScheme="teal" size="md" mb={4} /></Box>
         <View style={styles.content}>
        <Text style={styles.head}>Upload Your ID</Text>
      <Text style={styles.subHeader}>
        Photo of your ID (National ID, valid voter’s card, intl passport or rider's card)
      </Text>

      {/* Optional display of selected image */}
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
      <Button 
        mode="contained" 
        onPress={handleImageUpload} 
        style={styles.uploadButton}>
        Upload
      </Button>
      <Button 
        mode="contained" 
        onPress={handleUpload} 
        style={styles.uploadButton}>
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  }, title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
},
  subHeader: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  }, head: {
    marginVertical: 16,
  },
  uploadButton: {
    marginTop: 20,
    width: '100%', backgroundColor:'#28a745'
  },  content: {
    flex: 1,
   
    marginVertical: 30,
},
  image: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
});

export default DocumentUploadScreen;