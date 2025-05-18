import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import OrderListScreen from './OrderListScreen';
import OrderDetailsScreen from './OrderDetailsScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import NotificationsScreen from './NotificationsScreen';
import ChatScreen from './ChatScreen';
import CreateAccount from './onboarding/index'; // Adjust the path 
import BottomTabNavigator from './nav/index'; // Adjust the path
import CreatePasswordScreen from './onboarding/CreatePassword'; 
import BecomeRiderScreen from './onboarding/becomeRider';
import BankCollectionScreen from './onboarding/BankCollectionScreen';
import BecomeRiderTwoScreen from './onboarding/becomeRiderStep_two';
import NinCollectionScreen from './onboarding/NinCollection ';
import DocumentCollectionScreen from './onboarding/setProfillePhoto';
import DocumentUploadScreen from './onboarding/Documentupload';
import VehicleSelectionScreen from './onboarding/VehicleSelectionScreen';
import AccountCreatedScreen from './onboarding/AccountCreatedScreen'; // Adjust the path 
import OnboardingScreen from './OnboardingScreen'; // Adjust the path as necessary
import { setNavigator } from './NavigationService'; // Import the navigation service
import { PaperProvider } from 'react-native-paper';
import { NativeBaseProvider } from 'native-base';
import EarningsScreen from './screens/earnings';
import RiderActive from './screens/RiderActive';
import PickupScreen from './screens/pickup';
import OrderPicked from './screens/ConfirmOrder';
import TrackCustomer from './screens/TrackCustomer';
import DeliveryScreen from './screens/DeliveryScreen';

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <PaperProvider>
      <NativeBaseProvider>
    <NavigationContainer ref={setNavigator}>
      
      <Stack.Navigator    screenOptions={{
          headerShown: false // Hide default headers
        }} initialRouteName="Onboarding">
             <Stack.Screen name="Onboarding" component={OnboardingScreen} />
             <Stack.Screen name="CreateAccountScreen" component={CreateAccount} />
             <Stack.Screen name="AccountCreatedScreen" component={AccountCreatedScreen } />
             <Stack.Screen name="CreatePasswordScreen" component={CreatePasswordScreen} />
             <Stack.Screen name="BankCollectionScreen" component={BankCollectionScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="BecomeRiderScreen" component={BecomeRiderScreen} />
              <Stack.Screen name="BecomeRiderTwoScreen" component={BecomeRiderTwoScreen} />
              <Stack.Screen name="DocumentCollectionScreen" component={DocumentCollectionScreen} />
              <Stack.Screen name="DocumentUploadScreen" component={DocumentUploadScreen} />
              <Stack.Screen name="VehicleSelectionScreen" component={VehicleSelectionScreen} />
              <Stack.Screen name="NinCollectionScreen" component={NinCollectionScreen} />
              <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
              <Stack.Screen name="RiderActive" component={RiderActive} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="OrderList" component={OrderListScreen} />
        <Stack.Screen name="OrderPicked" component={OrderPicked} />
        <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="CustomerTrack" component={TrackCustomer} />
        <Stack.Screen name="PickupScreen" component={PickupScreen} />
        <Stack.Screen name="DeliveryScreen" component={DeliveryScreen} />
        <Stack.Screen name="Earnings" component={EarningsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </NativeBaseProvider>
    </PaperProvider>
  );
};

export default RootNavigation;