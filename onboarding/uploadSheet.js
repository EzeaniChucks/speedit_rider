import { Box } from 'native-base';
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';


const UploadBottomSheet = ({ onClose,takepic,onChoose }) => {
    const translateY = useRef(new Animated.Value(300)).current; // Start off-screen

    useEffect(() => {
      // Animate the bottom sheet into view
      Animated.spring(translateY, {
        toValue: 0, // Move to the original position
        useNativeDriver: true,
        bounciness: 10, // Add some springiness
      }).start();
    }, [translateY]);
    const handleClose = () => {
        Animated.spring(translateY, {
          toValue: 500, // Move off-screen
          useNativeDriver: true,
          bounciness: 10,
        }).start(() => {
          if (onClose) {
            onClose(); // Call the onClose callback after animation
          }
        });
      };
    const renderContent = () => (
        <View style={styles.sheetContent}>
            <Text style={styles.title}>Upload document</Text>
            <Text style={styles.instruction}>Make sure the photo you are uploading is the correct one.</Text>
            <Box pt={6}pb={6} borderBottomColor={'gray.500'} borderTopColor={'gray.500'} borderBottomWidth={1} borderTopWidth={1}>
            <Text style={styles.instruction}>Make sure the photo is taken in good light.</Text>
            </Box>
            <Text style={styles.instruction}>The photo should be max 10MP.</Text>

            <TouchableOpacity onPress={onChoose} style={styles.button}>
                <Text style={styles.buttonText}>Choose from library</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> takepic} style={styles.button}>
                <Text style={styles.buttonText}>Take a photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleClose()} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );

    return (
       
        <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
              {renderContent()}          
          </Animated.View>
    );
};

export default UploadBottomSheet;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 500,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
    sheetContent: {
        padding: 20,
        backgroundColor: 'white',
        height: 420,paddingTop: 50,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    instruction: {
        marginVertical: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        marginVertical: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    cancelButton: {
        marginTop: 20,
    },
    cancelButtonText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 16,
    },
    uploadButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 20,
        marginHorizontal: 10,
    },
    uploadButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});