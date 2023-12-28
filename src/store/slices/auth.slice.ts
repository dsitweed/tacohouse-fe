import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { UserEntity } from '@/models';

interface AuthState {
  accessToken: string;
  refreshToken: string;
  user: UserEntity | null;
}

const initialState: AuthState = {
  accessToken: getAccessTokenFromStorage(), // for storing the JWT
  refreshToken: getRefreshTokenFromStorage(),
  user: getUserFromStorage(),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<AuthState>) => {
      const { payload } = action;
      localStorage.setItem('accessToken', payload.accessToken);
      localStorage.setItem('refreshToken', payload.refreshToken);
      localStorage.setItem('user', JSON.stringify(payload.user));
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.user = payload.user;
    },
    signOut: (state) => {
      localStorage.clear();
      state.accessToken = '';
      state.refreshToken = '';
      state.user = null;
    },
    updateProfile: (state, action: PayloadAction<UserEntity>) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
  },
});

export const authActions = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice;

// MANIPULATION WITH LOCAL STORAGE
function getUserFromStorage() {
  try {
    const user = localStorage.getItem('user');
    if (!user) return null;

    return JSON.parse(user) as UserEntity;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function getAccessTokenFromStorage() {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) return '';

    return token;
  } catch (error) {
    console.error(error);
    return '';
  }
}

export function getRefreshTokenFromStorage() {
  try {
    const token = localStorage.getItem('refreshToken');
    if (!token) return '';

    return token;
  } catch (error) {
    console.error(error);
    return '';
  }
}
