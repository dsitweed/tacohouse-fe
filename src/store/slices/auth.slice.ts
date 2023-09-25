import { UserRole } from '@/shared/constants';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AuthUser {
  personalId: number; // for id in admins or tenants or manager tables
  userId: number; // for user object in users tables
  email: string;
  role: UserRole;
}

interface AuthState {
  accessToken: string;
  refreshToken: string;
  user: AuthUser | null;
}

const initialState: AuthState = {
  accessToken: getCookie('accessToken'), // for storing the JWT
  refreshToken: getCookie('refreshToken'),
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<AuthState>) => {
      const { payload } = action;
      setCookie('accessToken', payload.accessToken);
      setCookie('refreshToken', payload.refreshToken);
      state.user = payload.user;
    },
  },
});

export const authActions = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice;

// MANIPULATION WITH COOKIE
export function getCookie(cookieName: string) {
  const name = cookieName + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setCookie(name: string, value: any, hours = 1) {
  let expires;
  if (hours) {
    const date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  } else {
    expires = '';
  }
  document.cookie = name + '=' + value + expires + '; path=/';
}
