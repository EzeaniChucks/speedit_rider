import React, { useState } from 'react';
import { View, Alert,Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';
import {  Box } from 'native-base';
import Icons from '@react-native-vector-icons/ant-design';
import { navigate } from '../NavigationService';
const CreatePasswordScreen = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordTrue, setConfirmPasswordTrue] = useState('');
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisibility] = useState(false);
  const [validationResult, setValidationResult] = useState({ valid: false, reasons: {} });

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility(!isConfirmPasswordVisible);
  };
  const validatePassword = (password) => {
    const minLength = 10;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    const isValid = (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );

    return {
      valid: isValid,
      reasons: {
        length: password.length >= minLength,
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
      };
    
      const handleConfirmPasswordChange = (text) => {
        if(password !== text) {
            setConfirmPasswordTrue('Error,Passwords do not match');

        }
        else{ setConfirmPasswordTrue('Passwords match');}
        setConfirmPassword(text);
      };
      const handleLogin = () => {
        // Handle sign-in logic here
 
        navigation.navigate('AccountCreatedScreen');
      };

  return (
    <ScrollView contentContainerStyle={styles.container}>
                <Box flexDirection="row" justifyContent="space-between" alignItems="center" marginBottom={20}>
                    <TouchableOpacity onPress={() => navigation.goBack()} >
      <Icons name="arrow-left" size={30} color='teal' /></TouchableOpacity>
      </Box>
      <Text style={styles.header}>Create password</Text>
      
      <View style={styles.inputContainer}>
      <TextInput
          style={styles.input} placeholderTextColor={'gray'}
          placeholder="Enter password"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={handlePasswordChange}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Icon name={isPasswordVisible ? "eye-slash" : "eye"} size={20} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.inputContainer}>
      <TextInput
          style={styles.input} placeholderTextColor={'gray'}
          placeholder="Confirm password"
          secureTextEntry={!isConfirmPasswordVisible}
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
        />
        <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
          <Icon name={isConfirmPasswordVisible ? "eye-slash" : "eye"} size={20} />
        </TouchableOpacity>
      </View>
      <Text style={styles.validationHeader}>{confirmPasswordTrue}</Text>
      <Box flexDirection="column" justifyContent="space-between"  marginBottom={20}>
      <Text style={styles.validationHeader}>Password must contain:</Text>
      <View style={styles.validationList}>
        <Text style={styles.validationItem}>{validationResult.reasons.length ? '✔ Minimum 10 characters' : '✖ Minimum 10 characters'}</Text>
        <Text style={styles.validationItem}>{validationResult.reasons.upper ? '✔ 1 uppercase letter (A-Z)' : '✖ 1 uppercase letter (A-Z)'}</Text>
        <Text style={styles.validationItem}>{validationResult.reasons.lower ? '✔ 1 lowercase letter (a-z)' : '✖ 1 lowercase letter (a-z)'}</Text>
        <Text style={styles.validationItem}>{validationResult.reasons.number ? '✔ 1 number (0-9)' : '✖ 1 number (0-9)'}</Text>
        <Text style={styles.validationItem}>{validationResult.reasons.special ? '✔ 1 special character (!@#$%^&*)' : '✖ 1 special character (!@#$%^&*)'}</Text>
      </View>
      </Box>
      <Box mt={60}>
      <Text style={styles.privacyPolicy}>
        By continuing you agree to our {' '}
        <Text style={styles.link}>privacy policy</Text> and cookies.
      </Text>

      <TouchableOpacity style={styles.createButton} onPress={handleLogin}
    //   disabled={!validationResult.valid || password !== confirmPassword}
      >
        <Text style={styles.buttonText}>Create account</Text>
      </TouchableOpacity>
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,color:'black'
  },
  validationHeader: {
    fontSize: 16,
    marginBottom: 10,
  },
  validationList: {
    marginBottom: 20,
  },
  validationItem: {
    fontSize: 14,
  },
  privacyPolicy: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  link: {
    color: 'blue',
  },
  createButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CreatePasswordScreen;