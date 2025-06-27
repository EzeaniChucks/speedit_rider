import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/onboarding/LoginScreen';
// import OrderListScreen from './screens/OrderHistoryScreen';
import OrderDetailsScreen from './screens/order/OrderDetailsScreen';
import SettingsScreen from './SettingsScreen';
// import CreateAccount from './screens/onboarding/index'; // Adjust the path
import BottomTabNavigator from './nav/index'; // Adjust the path
import CreatePasswordScreen from './screens/onboarding/CreatePassword';
import BecomeRiderScreen from './screens/onboarding/becomeRider';
import BankCollectionScreen from './screens/onboarding/BankCollectionScreen';
import BecomeRiderTwoScreen from './screens/onboarding/becomeRiderStep_two';
import DocumentCollectionScreen from './screens/onboarding/setProfillePhoto';
import DocumentUploadScreen from './screens/onboarding/Documentupload';
import VehicleSelectionScreen from './screens/onboarding/VehicleSelectionScreen';
import AccountCreatedScreen from './screens/onboarding/AccountCreatedScreen'; // Adjust the path
import OnboardingScreen from './screens/onboarding/OnboardingScreen'; // Adjust the path as necessary
import {setNavigator} from './NavigationService'; // Import the navigation service
import {PaperProvider} from 'react-native-paper';
import {NativeBaseProvider} from 'native-base';
import PickupScreen from './screens/pickup';
import OrderPicked from './screens/ConfirmOrder';
import TrackCustomer from './screens/TrackCustomer';
import DeliveryScreen from './screens/DeliveryScreen';
import {store} from './store';
import {Alert, Platform, PermissionsAndroid} from 'react-native';
//import { PersistGate } from 'redux-persist/integration/react'; // If using redux-persist
import {Provider as ReduxProvider, useDispatch} from 'react-redux';
import {setFcmToken} from './store/authSlice';
import messaging, {firebase} from '@react-native-firebase/messaging';
import {firebaseConfig} from './firebaseCon';
import LicenseCollectionScreen from './screens/onboarding/LicenseCollection ';
import AvailableOrdersScreen from './screens/avalOrders';
import AvailableRidersScreen from './screens/availDash';
import OrderProgressScreen from './screens/order/OrderProgressionScreen';
import DeliveryAcknowledgement from './screens/DeliveryAcknowledgement';
import TransactionHistoryScreen from './screens/transactionsHistory';
import ForgotPasswordScreen from './screens/onboarding/forgotPassword/forgotPasswordScreen';
import ForgotPasswordCompleteScreen from './screens/onboarding/forgotPassword/resetPasswordScreen';
import SplashScreen from './screens/onboarding/splash';
import RegistrationPersonalInformationScreen from './screens/onboarding/Registration_Personal_Info';
import RegistrationVehicleInformationScreen from './screens/onboarding/Registration_Vehicle_Info';
import WithdrawalScreen from './screens/mainScreens/fundingAndWithdrawal/walletWithdrawalScreen';
import WalletFundScreen from './screens/mainScreens/fundingAndWithdrawal/walletFundScreen';
import PaymentSuccessScreen from './screens/mainScreens/fundingAndWithdrawal/walletFundSuccessScreen';
import WithdrawalOTPScreen from './screens/mainScreens/fundingAndWithdrawal/walletWithdrawalOTPscreen';
import WithdrawalSuccessScreen from './screens/mainScreens/fundingAndWithdrawal/walletWithdrawalSuccess';
import EditProfileScreen from './screens/mainScreens/bottomTabs/profileManagement/userProfileEditScreen';
import InitiatePasswordResetScreen from './screens/mainScreens/bottomTabs/profileManagement/initiatePasswordResetScreen';
import VerifyPasswordResetScreen from './screens/mainScreens/bottomTabs/profileManagement/verifyPasswordResetScreen';
import PasswordResetSuccessScreen from './screens/mainScreens/bottomTabs/profileManagement/passwordResetSuccessScreen';
import OrderHistoryScreen from './screens/order/OrderHistoryScreen';
import {requestUserPermissionAndGetToken} from './firbaseSetup';

const Stack = createStackNavigator();

const RootNavigation = () => {
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);

  // Component to handle FCM setup (can be inside App or a child)
  const FcmHandler = () => {
    const dispatch = useDispatch(); // Get dispatch hook

    useEffect(() => {
      // 1. Request permission and get initial token
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      requestUserPermissionAndGetToken(dispatch);

      // 2. Listen for token refresh (FCM tokens can change)
      const unsubscribeTokenRefresh = messaging().onTokenRefresh(newToken => {
        console.log('FCM Token Refreshed:', newToken);
        // **IMPORTANT: Send this NEW token to your backend server.**
        // Example: await api.sendFcmTokenToServer(newToken);

        // Optionally, update it in Redux state
        dispatch(setFcmToken(newToken));
      });

      // 3. (Optional) Listen for foreground messages
      const unsubscribeOnMessage = messaging().onMessage(
        async remoteMessage => {
          console.log(
            'FCM Message Received in Foreground:',
            JSON.stringify(remoteMessage),
          );
          Alert.alert(
            remoteMessage.notification?.title || 'New Message',
            remoteMessage.notification?.body || 'You have a new message.',
          );
        },
      );

      // 4. (Optional) Handle notification press when app is in background/quit
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background:',
          remoteMessage,
        );
        // e.g., navigate to a specific screen based on remoteMessage.data
      });

      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage,
            );
            // e.g., navigate to a specific screen based on remoteMessage.data
          }
        });

      return () => {
        unsubscribeTokenRefresh();
        unsubscribeOnMessage();
      };
    }, [dispatch]);

    return null; // This component doesn't render anything visible
  };

  return (
    <ReduxProvider store={store}>
      <NativeBaseProvider>
        <PaperProvider>
          <FcmHandler />
          <NavigationContainer ref={setNavigator}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName="Splash">
              {/* Changed initial route */}
              {/* Splash Screen - First screen users see */}
              <Stack.Screen name="Splash" component={SplashScreen} />
              {/* Auth Screens */}
              <Stack.Group>
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                {/* <Stack.Screen
                  name="CreateAccountScreen"
                  component={CreateAccount}
                /> */}
                <Stack.Screen
                  name="RegisterPersonalInfo"
                  component={RegistrationPersonalInformationScreen}
                />
                <Stack.Screen
                  name="RegisterVehicleInfo"
                  component={RegistrationVehicleInformationScreen}
                />

                <Stack.Screen
                  name="AccountCreatedScreen"
                  component={AccountCreatedScreen}
                />
                <Stack.Screen
                  name="CreatePasswordScreen"
                  component={CreatePasswordScreen}
                />

                {/* Password Reset Flow */}
                <Stack.Screen
                  name="ForgotPasswordInitiate"
                  component={ForgotPasswordScreen}
                />
                <Stack.Screen
                  name="ForgotPasswordComplete"
                  component={ForgotPasswordCompleteScreen}
                />
                <Stack.Screen
                  name="InitiatePasswordReset"
                  component={InitiatePasswordResetScreen}
                />
                <Stack.Screen
                  name="VerifyPasswordReset"
                  component={VerifyPasswordResetScreen}
                />
                <Stack.Screen
                  name="PasswordResetSuccess"
                  component={PasswordResetSuccessScreen}
                />
              </Stack.Group>
              {/* Rider Onboarding Flow */}
              <Stack.Group>
                <Stack.Screen
                  name="BecomeRiderScreen"
                  component={BecomeRiderScreen}
                />
                <Stack.Screen
                  name="BecomeRiderTwoScreen"
                  component={BecomeRiderTwoScreen}
                />

                <Stack.Screen
                  name="DocumentCollectionScreen"
                  component={DocumentCollectionScreen}
                />
                <Stack.Screen
                  name="DocumentUploadScreen"
                  component={DocumentUploadScreen}
                />
                <Stack.Screen
                  name="VehicleSelectionScreen"
                  component={VehicleSelectionScreen}
                />
                <Stack.Screen
                  name="LicenseCollectionScreen"
                  component={LicenseCollectionScreen}
                />
                <Stack.Screen
                  name="BankCollectionScreen"
                  component={BankCollectionScreen}
                />
              </Stack.Group>
              {/* Main App */}
              <Stack.Screen name="MainApp" component={BottomTabNavigator} />
              {/* Order Management */}
              <Stack.Group>
                <Stack.Screen name="OrderList" component={OrderHistoryScreen} />
                <Stack.Screen name="OrderPicked" component={OrderPicked} />
                <Stack.Screen
                  name="OrderDetails"
                  component={OrderDetailsScreen}
                />
                <Stack.Screen
                  name="OrderProgress"
                  component={OrderProgressScreen}
                />
                <Stack.Screen name="PickupScreen" component={PickupScreen} />
                <Stack.Screen
                  name="DeliveryScreen"
                  component={DeliveryScreen}
                />
                <Stack.Screen
                  name="DeliveryAcknowledgement"
                  component={DeliveryAcknowledgement}
                />
                <Stack.Screen
                  name="avalRides"
                  component={AvailableRidersScreen}
                />
                <Stack.Screen
                  name="avalOrders"
                  component={AvailableOrdersScreen}
                />
              </Stack.Group>
              {/* Wallet & Transactions */}
              <Stack.Group>
                <Stack.Screen
                  name="TransactionHistory"
                  component={TransactionHistoryScreen}
                />
                <Stack.Screen name="WalletFund" component={WalletFundScreen} />
                <Stack.Screen
                  name="PaymentSuccess"
                  component={PaymentSuccessScreen}
                />
                <Stack.Screen
                  name="WithdrawalOTP"
                  component={WithdrawalOTPScreen}
                />
                <Stack.Screen
                  name="WalletWithdrawal"
                  component={WithdrawalScreen}
                />
                <Stack.Screen
                  name="WithdrawalSuccess"
                  component={WithdrawalSuccessScreen}
                />
              </Stack.Group>
              {/* Profile & Settings */}
              <Stack.Group>
                <Stack.Screen name="Settings" component={SettingsScreen} />
                {/* <Stack.Screen
                  name="Notifications"
                  component={NotificationsScreen}
                /> */}
                <Stack.Screen
                  name="EditProfile"
                  component={EditProfileScreen}
                />
                <Stack.Screen name="CustomerTrack" component={TrackCustomer} />
              </Stack.Group>
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </NativeBaseProvider>
    </ReduxProvider>
  );
};

export default RootNavigation;
