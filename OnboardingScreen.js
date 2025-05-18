import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { Text, Button, Box } from 'native-base';

const { width } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    title: 'Welcome to Speedit Delivery',
    description: 'Deliver food from your favorite restaurants to customers.',
    image: require('./assests/onboarding1.jpg'), // Replace with your image path
  },
  {
    key: '2',
    title: 'Easy Navigation',
    description: 'Navigate easily to pick up and drop off locations.',
    image: require('./assests/onboarding2.jpg'), // Replace with your image path
  },
  {
    key: '3',
    title: 'Track Your Earnings',
    description: 'Keep track of your earnings and tips in real-time.',
    image: require('./assests/onboarding3.jpg'), // Replace with your image path
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigation.navigate('Login'); // Navigate to the login screen or home screen
    }
  };
const SignUp = () => {
  navigation.navigate('CreateAccountScreen');
}
  return (
    <Box flex={1} backgroundColor="white">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const contentOffsetX = event.nativeEvent.contentOffset.x;
          const index = Math.floor(contentOffsetX / width);
          setCurrentSlide(index);
        }}
      >
        {slides.map((slide) => (
          <View key={slide.key} style={styles.slide}>
            <Image source={slide.image} style={styles.image} />
            <Text fontSize="2xl" fontWeight="bold" mt={4}>
              {slide.title}
            </Text>
            <Text fontSize="md" textAlign="center" mt={2}>
              {slide.description}
            </Text>
          </View>
        ))}
      </ScrollView>
      <Box style={styles.buttonGroup}>
      <Button 
        onPress={handleNext}
        style={styles.button}
        backgroundColor="teal.500"
        _text={{ color: 'white' }}
      >
        {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
      </Button>
      <Button
        onPress={SignUp}
        style={styles.buttons}
        backgroundColor="teal.800"
        _text={{ color: 'white' }}
      >
        Sign Up
      </Button> </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  slide: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  buttonGroup: {
    position: 'absolute',
    bottom: 40,flexDirection:'column',width:'90%',justifyContent:'space-evenly',  right: 40,
  },
  button: {
   top:10,
    left: 20,
    right: 20,
  },
  buttons: {marginTop:20,
    top:10,
     left: 20,
     right: 20,
   },
});

export default OnboardingScreen;