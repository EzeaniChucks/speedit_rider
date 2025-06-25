import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import AntDesign from '@react-native-vector-icons/ant-design';
import {useDispatch, useSelector} from 'react-redux';
import {
  loginUser,
  clearAuthError,
  resetAuthState,
  setAuthStateFromPersisted,
} from '../../store/authSlice';
import {TextInput} from 'react-native-paper';
import {AppDispatch} from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const {loading, error, isAuthenticated, user} = useSelector(
    (state: any) => state.auth,
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(resetAuthState());
    });
    return unsubscribe;
  }, [navigation, dispatch]);

  useEffect(() => {
    if (isAuthenticated && user) {
      const isProfileComplete =
        user.verificationStatus === 'verified' ||
        user.verificationStatus === 'approved';

      if (isProfileComplete) {
        AsyncStorage.setItem('@user_has_onboarded', 'true');
        AsyncStorage.setItem('user_is_rider', 'true');
        navigation.replace('MainApp');
      } else {
        navigation.replace('DocumentUploadScreen');
      }
    }
  }, [isAuthenticated, user, navigation]);

  useEffect(() => {
    if (error) {
      Alert.alert(
        'Login Error',
        error.error || error.data || 'An unexpected error occurred.',
      );
      dispatch(clearAuthError());
    }
  }, [error, dispatch]);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Validation Error', 'Email and password are required.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }
    const result = await dispatch(loginUser({email, password}));
  };

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('RegisterPersonalInfo');
    }
  };

  const isButtonDisabled = !email.trim() || !password.trim();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor="#E0F2F1" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
              <AntDesign name="left-circle" size={24} color="#008080" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Sign In</Text>
          </View>

          <View style={styles.illustrationContainer}>
            <AntDesign
              name="user"
              size={72}
              color="#008080"
              style={styles.icon}
            />
            <Text style={styles.subtitle}>
              Welcome back! Please sign in to continue
            </Text>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              mode="outlined"
              style={styles.input}
              theme={{
                colors: {
                  primary: '#008080',
                  placeholder: '#999',
                },
              }}
              left={<TextInput.Icon icon="email" color="#999" />}
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              mode="outlined"
              style={styles.input}
              theme={{
                colors: {
                  primary: '#008080',
                  placeholder: '#999',
                },
              }}
              left={<TextInput.Icon icon="lock" color="#999" />}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                  color="#999"
                />
              }
            />

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPasswordInitiate')}
              style={styles.forgotPasswordButton}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isButtonDisabled || loading === 'pending'}>
              {loading === 'pending' ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.buttonText}>Sign In</Text>
              )}
            </TouchableOpacity>

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('RegisterPersonalInfo')}>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#008080',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  icon: {
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#5F9EA0',
    textAlign: 'center',
    marginTop: 8,
  },
  formContainer: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#FFF',
    marginBottom: 20,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#008080',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#008080',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signUpText: {
    color: '#666',
    fontSize: 14,
  },
  signUpLink: {
    color: '#008080',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SignInScreen;
