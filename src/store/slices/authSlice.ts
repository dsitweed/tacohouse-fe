import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// Mọi các biến liên quan redux snake case

interface AuthState {
  user_id: string;
  email: string;
  role: string;
  access_token: string;
}

const initialState: AuthState = {
  user_id: "", // for user object
  email: "",
  role: "",
  access_token: "", // for storing the JWT
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<AuthState>) => {
      return { ...action.payload };
    },
  },
});

export const { signIn } = authSlice.actions;

export default authSlice;
