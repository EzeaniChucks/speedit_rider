import React, {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator, Image, Text} from 'react-native';
import {Box, useTheme} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  const {colors} = useTheme();

  useEffect(() => {
    const checkUserState = async () => {
      try {
        // Check all relevant user states
        const [hasOnboarded, authToken, isRider, onboardingStep] =
          await Promise.all([
            AsyncStorage.getItem('@user_has_onboarded'),
            AsyncStorage.getItem('@auth_token'),
            AsyncStorage.getItem('@user_is_rider'),
            AsyncStorage.getItem('@rider_onboarding_step'),
          ]);

        // Give the splash screen some minimum display time (optional)
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Navigation logic
        if (hasOnboarded !== 'true') {
          // New user flow
          navigation.replace('Onboarding');
        } else if (!authToken) {
          // Return user but not logged in
          navigation.replace('Login');
        } else if (
          isRider === 'true' &&
          onboardingStep &&
          onboardingStep !== 'completed'
        ) {
          // Rider onboarding in progress
          handleRiderOnboardingNavigation(onboardingStep);
        } else {
          // Fully onboarded user (customer or rider)
          navigation.replace('MainApp');
        }
      } catch (error) {
        console.error('Error checking user state:', error);
        // Fallback to onboarding if something fails
        navigation.replace('Onboarding');
      }
    };

    checkUserState();
  }, [navigation]);

  const handleRiderOnboardingNavigation = step => {
    const stepMap = {
      basic_info: 'BecomeRiderScreen',
      documents: 'DocumentCollectionScreen',
      vehicle: 'VehicleSelectionScreen',
      bank: 'BankCollectionScreen',
      // Add other steps as needed
    };
    navigation.replace(stepMap[step] || 'BecomeRiderScreen');
  };

  return (
    <Box style={styles.container} bg="teal.500">
      {/* Add your logo or other splash elements here */}
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assests/logo.png')}
          style={styles.logo}
          width={210}
          height={210}
          resizeMode="contain"
        />
        {/* <Text style={{color: 'orange', }}>Rider</Text> */}
        {/* <ActivityIndicator size="small" color={colors.teal} /> */}
      </View>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 270,
    height: 270,
  },
});

export default SplashScreen;
