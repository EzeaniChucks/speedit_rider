import { StackScreenProps } from '@react-navigation/stack';

export type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  VerifyOtp: { email?: string }; // Pass email or a temporary token if needed
  ResetPassword: { email?: string }; // Pass email or a temporary token if needed
};

export type AppStackParamList = {
  Home: undefined;
  Profile: undefined;
  // ... other authenticated screens
};

export type RootStackParamList = AuthStackParamList & AppStackParamList & {
    AuthLoading: undefined; // For initial check
};


// Screen specific prop types
export type LoginScreenProps = StackScreenProps<AuthStackParamList, 'Login'>;
export type ForgotPasswordScreenProps = StackScreenProps<AuthStackParamList, 'ForgotPassword'>;
export type VerifyOtpScreenProps = StackScreenProps<AuthStackParamList, 'VerifyOtp'>;
export type ResetPasswordScreenProps = StackScreenProps<AuthStackParamList, 'ResetPassword'>;

export type HomeScreenProps = StackScreenProps<AppStackParamList, 'Home'>;
export type ProfileScreenProps = StackScreenProps<AppStackParamList, 'Profile'>;