import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RiderProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  vehicleDetails?: {
    model?: string;
    plateNumber?: string;
    color?: string;
  };
  // Add other profile fields as needed
}

interface ProfileState {
  token: string | null;
  user: RiderProfile | null;
  isAuthenticated: boolean;
  // temp state for password reset flow
  emailForPasswordReset: string | null;
  resetCodeVerified: boolean;
}

const initialState: ProfileState = {
  token: null,
  user: null,
  isAuthenticated: false,
  emailForPasswordReset: null,
  resetCodeVerified: false,
};


const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user?: RiderProfile }>
    ) => {
      state.token = action.payload.token;
      if (action.payload.user) {
        state.user = action.payload.user;
      }
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.emailForPasswordReset = null;
      state.resetCodeVerified = false;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<RiderProfile>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    setEmailForPasswordReset: (state, action: PayloadAction<string | null>) => {
      state.emailForPasswordReset = action.payload;
    },
    setResetCodeVerified: (state, action: PayloadAction<boolean>) => {
      state.resetCodeVerified = action.payload;
    },
  },
});

export const {
  setCredentials,
  logout,
  updateUserProfile,
  setEmailForPasswordReset,
  setResetCodeVerified,
} = profileSlice.actions;

export default profileSlice.reducer;