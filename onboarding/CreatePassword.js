import React, { useState, useEffect } from 'react';
import { View, Alert, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
// Icon from 'react-native-vector-icons/FontAwesome6' is no longer needed for PaperTextInput's eye icon
import { Box } from 'native-base';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetAuthState, clearError, clearAuthError } from '../store/authSlice'; // Adjust path
import { TextInput as PaperTextInput } from 'react-native-paper'; // Import PaperTextInput

const CreatePasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisibility] = useState(false);
  const [validationResult, setValidationResult] = useState({ valid: false, reasons: {} });

  const dispatch = useDispatch();
  const { registrationForm, loading, error, isRegistered } = useSelector((state) => state.auth);

  useEffect(() => {
    // Reset auth state when component mounts
    dispatch(resetAuthState());
    // No need to return a cleanup function that does the same if you want it only on mount
  }, [dispatch]);

  useEffect(() => {
    if (isRegistered) {
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate('AccountCreatedScreen');
      dispatch(resetAuthState()); // Reset after navigation and success
    }
  }, [isRegistered, navigation, dispatch]);

  useEffect(() => {
    if (error) {
      Alert.alert("Registration Error", error.message || "An unknown error occurred.");
      dispatch( clearAuthError());
    }
  }, [error, dispatch]);
 const fcmToken = useSelector(state => state.auth.fcmToken)
  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility(!isConfirmPasswordVisible);
  };

  const validatePassword = (pass) => {
    const minLength = 10;
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);

    const isValid =
      pass.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar;

    return {
      valid: isValid,
      reasons: {
        length: pass.length >= minLength,
        upper: hasUpperCase,
        lower: hasLowerCase,
        number: hasNumber,
        special: hasSpecialChar
      }
    };
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setValidationResult(validatePassword(text));
    if (confirmPassword && text !== confirmPassword) {
      setConfirmPasswordMessage('Error: Passwords do not match');
    } else if (confirmPassword && text === confirmPassword) {
      setConfirmPasswordMessage('Passwords match');
    } else {
      setConfirmPasswordMessage('');
    }
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (password !== text) {
      setConfirmPasswordMessage('Error: Passwords do not match');
    } else {
      setConfirmPasswordMessage('Passwords match');
    }
  };

  const handleCreateAccount = () => {
    if (!validationResult.valid) {
      Alert.alert("Invalid Password", "Please ensure your password meets all criteria.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }

   const userData = {
      ...registrationForm,fcmToken,
      password,
    };
    dispatch(registerUser(userData));
  };

  const getValidationStyle = (isValid) => ({
    color: isValid ? 'green' : 'red',
    fontSize: 14,
    lineHeight: 20, // Added for better spacing in the list
  });

  // Common theme for PaperTextInput
  const paperInputTheme = { 
    roundness: 5, // Match button borderRadius
    colors: {
        // primary: 'teal', // Outline color when focused, can be set via activeOutlineColor prop too
        // placeholder: 'gray' // For the label when it's acting as placeholder
    }
  };
  const activeOutlineColor = 'teal'; // Consistent focus color

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Box flexDirection="row" justifyContent="flex-start" alignItems="center" marginBottom={20}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5 }}>
            <AntIcons name="arrowleft" size={30} color='teal' />
          </TouchableOpacity>
        </Box>
        <Text style={styles.header}>Create password</Text>

        <PaperTextInput
          label="Enter password"
          mode="outlined"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={handlePasswordChange}
          style={styles.paperInputStyle}
          theme={paperInputTheme}
          outlineColor="#ccc"
          activeOutlineColor={activeOutlineColor}
          right={
            <PaperTextInput.Icon
              icon={isPasswordVisible ? "eye-off" : "eye"}
              onPress={togglePasswordVisibility}
              color="gray"
            />
          }
        />

        <PaperTextInput
          label="Confirm password"
          mode="outlined"
          secureTextEntry={!isConfirmPasswordVisible}
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          style={styles.paperInputStyle}
          theme={paperInputTheme}
          outlineColor="#ccc"
          activeOutlineColor={activeOutlineColor}
        //  error={confirmPasswordMessage.startsWith('Error:')} 
          // Correct usage: returns true or false
          right={
            <PaperTextInput.Icon
              icon={isConfirmPasswordVisible ? "eye-off" : "eye"}
              onPress={toggleConfirmPasswordVisibility}
              color="gray"
            />
          }
        />
        
        {/* Password match message */}
        <View style={styles.confirmMessageContainer}>
            {isConfirmPasswordVisible? (
            <Text style={[
                styles.confirmMessageText,
                { color: isConfirmPasswordVisible? 'red' : 'green' }
            ]}>
                {confirmPasswordMessage}
            </Text>
            ) : null}
        </View>


        <Box flexDirection="column" justifyContent="space-between" marginBottom={20} marginTop={10}>
          <Text style={styles.validationHeader}>Password must contain:</Text>
          <View style={styles.validationList}>
            <Text style={getValidationStyle(validationResult.reasons.length)}>{validationResult.reasons.length ? '✔' : '✖'} Minimum 10 characters</Text>
            <Text style={getValidationStyle(validationResult.reasons.upper)}>{validationResult.reasons.upper ? '✔' : '✖'} 1 uppercase letter (A-Z)</Text>
            <Text style={getValidationStyle(validationResult.reasons.lower)}>{validationResult.reasons.lower ? '✔' : '✖'} 1 lowercase letter (a-z)</Text>
            <Text style={getValidationStyle(validationResult.reasons.number)}>{validationResult.reasons.number ? '✔' : '✖'} 1 number (0-9)</Text>
            <Text style={getValidationStyle(validationResult.reasons.special)}>{validationResult.reasons.special ? '✔' : '✖'} 1 special character (e.g. !@#$%^&*)</Text>
          </View>
        </Box>

        <Box mt={20}>
          <Text style={styles.privacyPolicy}>
            By continuing you agree to our{' '}
            <Text style={styles.link} onPress={() => Alert.alert("Info", "Navigate to Privacy Policy")}>privacy policy</Text> and cookies.
          </Text>

          <TouchableOpacity
            style={[styles.createButton, (loading =='pending' || !validationResult.valid || password !== confirmPassword) && styles.disabledButton]}
            onPress={handleCreateAccount}
            disabled={ !validationResult.valid || password !== confirmPassword}
          >
            {loading =='pending' ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Create account</Text>
            )}
          </TouchableOpacity>
        </Box>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    flex: 1, // Ensure container takes up available space for flexGrow to work well
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  paperInputStyle: {
    marginBottom: 10, // Spacing between inputs
    backgroundColor: '#fff', // Or a light gray like '#f9f9f9' if preferred
  },
  confirmMessageContainer: {
    minHeight: 20, // Reserve space for the message or keep consistent layout
    marginBottom: 10, // Space after the message
    justifyContent: 'flex-start',
  },
  confirmMessageText: {
    fontSize: 14,
    // color is set dynamically
  },
  validationHeader: {
    fontSize: 14,
    marginBottom: 8, // Adjusted margin
    color: '#555',
    fontWeight: '600', // Make it slightly bolder
  },
  validationList: {
    marginBottom: 10,
  },
  privacyPolicy: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  link: {
    color: 'teal',
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: '#28a745',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreatePasswordScreen;