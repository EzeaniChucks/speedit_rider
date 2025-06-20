import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {RootState} from './store';
import {
  RootStackParamList,
  AuthStackParamList,
  AppStackParamList,
} from './nav.types';

// Screens
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import LoginScreen from './LoginScreen';
import ForgotPasswordScreen from './forgotPassword';
import VerifyOtpScreen from './verifyOtp';
import ResetPasswordScreen from './screens/restpassword';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './profile';

import {colors} from './theme/colors';
import CreatePasswordScreen from './onboarding/CreatePassword';
import AccountCreatedScreen from './onboarding/AccountCreatedScreen';
import CreateAccountScreen from './onboarding';
import OnboardingScreen from './OnboardingScreen';
import DocumentUploadScreen from './onboarding/Documentupload';
import LicenseCollectionScreen from './onboarding/NinCollection ';
import VehicleIdUploadScreen from './onboarding/VehicleSelectionScreen';
import EarningsScreen from './screens/EarningsScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import PickupScreen from './screens/pickup';
import OrderListScreen from './OrderListScreen';
import OrderDetailsScreen from './OrderDetailsScreen';
import TrackCustomer from './screens/TrackCustomer';
import SettingsScreen from './SettingsScreen';
import MessagesScreen from './screens/MessagesScreen';
import OrderPickedScreen from './screens/ConfirmOrder';

const AuthStack = createStackNavigator<AuthStackParamList>();
const AppStack = createStackNavigator<AppStackParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: colors.primary},
      headerTintColor: colors.onPrimary,
      headerTitleStyle: {fontWeight: 'bold'},
    }}>
    <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
    <AuthStack.Screen
      name="Login"
      component={LoginScreen}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="ForgotPassword"
      component={ForgotPasswordScreen}
      options={{title: 'Forgot Password'}}
    />
    <AuthStack.Screen
      name="VerifyOtp"
      component={VerifyOtpScreen}
      options={{title: 'Verify Code'}}
    />
    <AuthStack.Screen
      name="ResetPassword"
      component={ResetPasswordScreen}
      options={{title: 'Reset Password'}}
    />
    <AuthStack.Screen
      name="CreateAccountScreen"
      component={CreateAccountScreen}
    />
    <AuthStack.Screen
      name="AccountCreatedScreen"
      component={AccountCreatedScreen}
    />
    <AuthStack.Screen
      name="CreatePasswordScreen"
      component={CreatePasswordScreen}
    />
    <AuthStack.Screen
      name="DocumentUploadScreen"
      component={DocumentUploadScreen}
    />
    <AuthStack.Screen
      name="VehicleSelectionScreen"
      component={VehicleIdUploadScreen}
    />
    <AuthStack.Screen
      name="LicenseCollectionScreen"
      component={LicenseCollectionScreen}
    />
  </AuthStack.Navigator>
);

const AppNavigatorInternal = () => (
  <AppStack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: colors.primary},
      headerTintColor: colors.onPrimary,
      headerTitleStyle: {fontWeight: 'bold'},
      cardStyle: {backgroundColor: colors.background},
    }}>
    <AppStack.Screen
      name="Home"
      component={HomeScreen}
      options={{title: 'Dashboard'}}
    />
    <AppStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{title: 'My Profile'}}
    />
    <AppStack.Screen name="OrderList" component={OrderListScreen} />
    <AppStack.Screen name="OrderPicked" component={OrderPickedScreen} />
    <AppStack.Screen name="OrderDetails" component={OrderDetailsScreen} />
    <AppStack.Screen name="Settings" component={SettingsScreen} />
    <AppStack.Screen name="Notifications" component={NotificationsScreen} />
    <AppStack.Screen name="Chat" component={MessagesScreen} />
    <AppStack.Screen name="CustomerTrack" component={TrackCustomer} />
    <AppStack.Screen name="PickupScreen" component={PickupScreen} />
    <AppStack.Screen name="DeliveryScreen" component={DeliveryScreen} />
    <AppStack.Screen name="Earnings" component={EarningsScreen} />
  </AppStack.Navigator>
);

const AppNavigator: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {isAuthenticated ? (
          <RootStack.Screen
            name="MainAppFlow"
            component={AppNavigatorInternal}
          />
        ) : (
          <RootStack.Screen name="AuthFlow" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
// Note: The above navigator logic is basic. For a better UX on app start,
// you'd usually have an AuthLoadingScreen that checks token validity from AsyncStorage.
// I'll skip that for brevity here but it's a common pattern.

// To handle the initial check properly, we can do this:
const RootAppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="AuthLoading" component={AuthLoadingScreen} />
        <RootStack.Screen name="AuthFlow" component={AuthNavigator} />
        <RootStack.Screen name="MainAppFlow" component={AppNavigatorInternal} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootAppNavigator; // Use this one
