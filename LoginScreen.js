import { Box, Icon, Input, Pressable } from 'native-base';
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet, StatusBar } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/fontawesome6';
import Icons from '@react-native-vector-icons/ant-design';
const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userCompletedSetup, setUserCompletedSetup] = useState(true);// This should be set based on your app's logic to check if the user has completed setup

  const handleContinue = () => {
    // Handle sign-in logic here
    console.log('Email:', email);
    console.log('Password:', password);
    // navigation.navigate('BottomTabNavigator');
   userCompletedSetup?navigation.navigate('BottomTabNavigator'): navigation.navigate('BecomeRiderScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <Box flexDirection="row" justifyContent="space-between" alignItems="center" marginBottom={20}>
      <Icons name="arrow-left" size={30} color='teal' />
      </Box>
      <Text style={styles.title}>Sign in</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <View style={styles.passwordContainer}>
      <Input h={50} w={{ base: "100%", md: "300"}} borderRadius={8} borderWidth={1} borderColor="gray" value={password} onChangeText={setPassword} 
 paddingY={10} marginBottom={10}
  type={showPassword ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShowPassword(!showPassword)}>
            <Icon as={<MaterialIcons name={showPassword ? "eye" : "eye-slash"} />} size={5} mr="2" color="muted.400" />
          </Pressable>} placeholder="Password" />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
   
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',height:'100%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  inputpassword: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,width:300
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',width:'100%'
  },
  eyeIcon: {
    fontSize: 24,
    marginLeft: 10,
  },
  forgotPassword: {
    color: 'green',
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: 'lightgray',
    borderRadius: 8,
    alignItems: 'center',
    padding: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  version: {
    marginTop: 20,
    textAlign: 'center',
  },
});

export default SignInScreen;