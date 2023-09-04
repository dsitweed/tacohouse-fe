import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AuthState {
  userId: string;
  email: string;
  personalId: string;
  role: 'MANAGER' | 'TENANT' | 'ADMIN' | '';
  accessToken: string;
}

const initialState: AuthState = {
  userId: '', // for user object in users tables
  personalId: '', // for id in admins or tenants or manager tables
  email: '',
  role: '',
  accessToken: '', // for storing the JWT
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<AuthState>) => {
      setCookie('accessToken', action.payload.accessToken);
      state = action.payload;
      return { ...action.payload };
    },
  },
});

export const { signIn } = authSlice.actions;

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
