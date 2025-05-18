import { Box, Input } from 'native-base';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icons from '@react-native-vector-icons/ant-design';


const CreateAccountScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const handleContinue = () => {
        // Handle sign-in logic here
 
        navigation.navigate('CreatePasswordScreen');
      };
      const handleLogin = () => {
        // Handle sign-in logic here
 
        navigation.navigate('Login');
      };
    return (
        <View style={styles.container}>
             <Box flexDirection="row" justifyContent="space-between" alignItems="center" marginBottom={20}>
                 <TouchableOpacity onPress={() => navigation.goBack()} >
      <Icons name="arrow-left" size={30} color='blue' />
      </TouchableOpacity>
      </Box>
            <Text style={styles.title}>We’re excited to have you on board with Speedit!</Text>
            <Text style={styles.subtitle}>Enter your email and phone number to create account</Text>

            <Input
                style={styles.input} value={email} onChangeText={setEmail}
                placeholder="xxxx@gmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <View style={styles.phoneContainer}>
                <TextInput
                    style={styles.phoneCode}
                    value="+234"
                    keyboardType="phone-pad"
                    editable={false}
                />
                <Input
                    style={styles.number} value={phone} onChangeText={setPhone}
                    placeholder="7035397136"
                    keyboardType="phone-pad"
                />
            </View>

            <TouchableOpacity  onPress={()=>handleContinue()} style={styles.button}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>

            <Text onPress={()=>handleLogin()} style={styles.signInText}>
                Already a rider? <Text style={styles.link}>Sign In</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        
        
    },
    number: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        width:'70%'
        
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',marginTop:20,
        marginBottom: 20,alignContent:'center'
    },
    phoneCode: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: 80,
        marginRight: 10,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#28a745',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    signInText: {
        textAlign: 'center',
        marginTop: 20,
    },
    link: {
        color: '#28a745',
        fontWeight: 'bold',
    }
});

export default CreateAccountScreen;