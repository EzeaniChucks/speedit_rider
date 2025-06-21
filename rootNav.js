import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import OrderListScreen from './OrderListScreen';
import OrderDetailsScreen from './OrderDetailsScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import NotificationsScreen from './forgotPassword';
import ChatScreen from './verifyOtp';
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
import {setNavigator} from './NavigationService'; // Import the navigation service
import {PaperProvider} from 'react-native-paper';
import {NativeBaseProvider} from 'native-base';
import EarningsScreen from './screens/earnings';
import RiderActiveOrders from './screens/RiderActiveOrders';
import PickupScreen from './screens/pickup';
import OrderPicked from './screens/ConfirmOrder';
import TrackCustomer from './screens/TrackCustomer';
import DeliveryScreen from './screens/DeliveryScreen';
import {store} from './store/';
import {Alert, Platform, PermissionsAndroid} from 'react-native';
//import { PersistGate } from 'redux-persist/integration/react'; // If using redux-persist
import {Provider as ReduxProvider, useDispatch} from 'react-redux';
import {setFcmToken} from './store/authSlice';
import messaging, {firebase} from '@react-native-firebase/messaging';
import {firebaseConfig} from './firebaseCon';
import LicenseCollectionScreen from './onboarding/NinCollection ';
import AvailableOrdersScreen from './screens/avalOrders';
import AvailableRidersScreen from './screens/availDash';
import OrderProgressScreen from './screens/OrderProgressionScreen';
import DeliveryAcknowledgement from './screens/DeliveryAcknowledgement';
import EditProfileScreen from './screens/profile/userProfileEditScreen';
import InitiatePasswordResetScreen from './screens/profile/initiatePasswordResetScreen';
import VerifyPasswordResetScreen from './screens/profile/verifyPasswordResetScreen';
import PasswordResetSuccessScreen from './screens/profile/passwordResetSuccessScreen';

const Stack = createStackNavigator();

const RootNavigation = () => {
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);
  async function requestUserPermissionAndGetToken(dispatch) {
    // Pass dispatch if storing in Redux
    let fcmToken = null;
    // console.log('Requesting user permission for FCM...');

    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        // console.log('Authorization status (iOS):', authStatus);
        fcmToken = await getFcmTokenInternal(dispatch);
      } else {
        console.log(
          'User has not granted permission for push notifications (iOS).',
        );
        Alert.alert(
          'Permission Denied',
          'You will not receive notifications unless you enable them in settings.',
        );
      }
    } else if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        // Android 13+
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            {
              title: 'Notification Permission',
              message: 'This app needs permission to send you notifications.',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // console.log('Notification permission granted (Android 13+).');
            fcmToken = await getFcmTokenInternal(dispatch);
          } else {
            // console.log('Notification permission denied (Android 13+).');
            Alert.alert(
              'Permission Denied',
              'You will not receive notifications.',
            );
          }
        } catch (err) {
          console.warn('Error requesting POST_NOTIFICATIONS permission:', err);
        }
      } else {
        // Android 12 and below (permission usually granted by default)
        console.log('Android version < 13, attempting to get token directly.');
        fcmToken = await getFcmTokenInternal(dispatch);
      }
    }
    return fcmToken;
  }

  // Internal function to get the token
  async function getFcmTokenInternal(dispatch) {
    // Pass dispatch if storing in Redux
    try {
      const token = await messaging().getToken();
      if (token) {
        console.log('FCM Token Generated:', token);
        // **IMPORTANT: Send this token to your backend server and associate it with the user.**
        // Example: await api.sendFcmTokenToServer(token);

        // Optionally, store it in Redux state
        if (dispatch) {
          dispatch(setFcmToken(token));
        }
        return token;
      } else {
        // console.log(
        //   'Failed to get FCM token. messaging().getToken() returned null/undefined.',
        // );
        Alert.alert(
          'FCM Error',
          'Could not retrieve a messaging token. Notifications might not work.',
        );
        return null;
      }
    } catch (error) {
      // console.error('Error getting FCM token:', error);
      Alert.alert('FCM Error', `Error getting FCM token: ${error.message}`);
      return null;
    }
  }

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
                headerShown: false, // Hide default headers
              }}
              initialRouteName="Onboarding">
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
              <Stack.Screen
                name="CreateAccountScreen"
                component={CreateAccount}
              />
              <Stack.Screen
                name="AccountCreatedScreen"
                component={AccountCreatedScreen}
              />
              <Stack.Screen
                name="CreatePasswordScreen"
                component={CreatePasswordScreen}
              />
              <Stack.Screen
                name="BankCollectionScreen"
                component={BankCollectionScreen}
              />
              <Stack.Screen name="Login" component={LoginScreen} />
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
              {/* <Stack.Screen
                name="BottomTabNavigator"
                component={BottomTabNavigator}
              /> */}
              {/* Main App (With tabs) */}
              <Stack.Screen name="MainApp" component={BottomTabNavigator} />
              <Stack.Screen name="OrderList" component={OrderListScreen} />
              {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
              {/* <Stack.Screen name="OrderList" component={OrderListScreen} /> */}
              <Stack.Screen name="OrderPicked" component={OrderPicked} />
              <Stack.Screen
                name="OrderDetails"
                component={OrderDetailsScreen}
              />
              <Stack.Screen
                name="OrderProgress"
                component={OrderProgressScreen}
              />
              {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen
                name="Notifications"
                component={NotificationsScreen}
              />
              <Stack.Screen name="orders" component={AvailableOrdersScreen} />
              <Stack.Screen name="CustomerTrack" component={TrackCustomer} />
              <Stack.Screen name="PickupScreen" component={PickupScreen} />
              <Stack.Screen name="DeliveryScreen" component={DeliveryScreen} />
              <Stack.Screen
                name="DeliveryAcknowledgement"
                component={DeliveryAcknowledgement}
              />

              {/* Profile Management */}
              {/* NB: Profile view is added as a tab to bottomTabNavigation above */}

              <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{headerShown: false}}
              />
              
              {/* // In your navigation stack */}
              
              <Stack.Screen
                name="InitiatePasswordReset"
                component={InitiatePasswordResetScreen}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="VerifyPasswordReset"
                component={VerifyPasswordResetScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PasswordResetSuccess"
                component={PasswordResetSuccessScreen}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="avalRides"
                component={AvailableRidersScreen}
              />
              <Stack.Screen
                name="avalOrders"
                component={AvailableOrdersScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </NativeBaseProvider>
    </ReduxProvider>
  );
};

export default RootNavigation;
