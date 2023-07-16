import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = "https://648c97238620b8bae7ed1cf5.mockapi.io";

interface AuthState {
    loading: boolean,
    userInfo: any,
    userToken: any,
    error: any,
    success: boolean,
}

const initialState: AuthState = {
    loading: false,
    userInfo: null, // for user object
    userToken: null, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
};

// Then, handle actions in your reducers:
export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const res = await axios.post(
                `${backendURL}/user`,
                {
                    email,
                    password,
                },
                config,
            );

            return res; // -> payload
        } catch (error: any) {
            // return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    },
);

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const res = await axios.post(
                `${backendURL}/api/user/login`,
                { email, password },
                config
            );

            return res.data;
        } catch (error: any) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        };
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logout: (state) => {
            state.loading = false;
            state.userInfo = null;
            state.userToken = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Register user
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                console.log({ payload });
                state.loading = false;
                state.success = true;
                state.userInfo = payload;
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            // Login user
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userLogin.fulfilled, (state, { payload }) => {
                state.loading = false
                state.userInfo = payload
            })
            .addCase(userLogin.rejected, (state, { payload }) => {
                state.loading = false
                state.userInfo = payload
            })
    },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
