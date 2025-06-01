import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import StyledTextInput from './components/StyledTextInput';
import StyledButton from './components/StyledButton';
import LoadingOverlay from './components/LoadingOverlay';
import { ForgotPasswordScreenProps } from './nav.types';
import { useRequestPasswordResetOtpMutation } from './store/api';
import { setEmailForPasswordReset } from './store/profile';
import { colors } from './theme/colors';
import { globalStyles } from './theme/style';
import Card from './components/Cards';

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [requestOtp, { isLoading, error, isSuccess, data }] = useRequestPasswordResetOtpMutation();
  const dispatch = useDispatch();

  const handleRequestOtp = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }
    try {
      await requestOtp({ email }).unwrap();
      // Success handled by useEffect
    } catch (err) {
      // Error handled by `error` state
      console.error("OTP Request failed:", err)
    }
  };

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setEmailForPasswordReset(email));
      Alert.alert('Success', data.message || 'OTP sent to your email/phone.');
      navigation.navigate('VerifyOtp', { email });
    }
  }, [isSuccess, data, navigation, dispatch, email]);

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <LoadingOverlay visible={isLoading} text="Sending OTP..." />
      <Card>
        <Text style={globalStyles.title}>Reset Password</Text>
        <Text style={globalStyles.subtitle}>
          Enter your email address and we'll send you an OTP to reset your password.
        </Text>

        {error && (
          <Text style={globalStyles.errorText}>
            {/* @ts-ignore */}
            Error: {error.data?.message || 'Failed to send OTP.'}
          </Text>
        )}

        <StyledTextInput
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <StyledButton title="Send OTP" onPress={handleRequestOtp} loading={isLoading} />
      </Card>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;