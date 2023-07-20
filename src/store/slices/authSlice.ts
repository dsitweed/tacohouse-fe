import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// Mọi các biến liên quan redux snake case

interface AuthState {
  user_id: string;
  personal_id: string;
  email: string;
  role: "MANAGER" | "TENANT" | "ADMIN" | "";
  access_token: string;
}

const initialState: AuthState = {
  user_id: "", // for user object in users tables
  personal_id: '', // for id in admins or tenants or manager tables
  email: "",
  role: "",
  access_token: "", // for storing the JWT
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<AuthState>) => {
      setCookie('access_token', action.payload.access_token);
      return { ...action.payload };
    },
  },
});

export const { signIn } = authSlice.actions;

export default authSlice;

export function getCookie(cookieName: string) {
  const name = cookieName + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1);
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return "";
}

export function setCookie(name: string, value: any, days = 1) {
  let expires;
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  } else {
    expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}
