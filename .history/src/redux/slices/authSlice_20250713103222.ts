import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
    token: string | null;
    refreshToken: string | null;
    name: string | null;
    address: string | null;
    phoneNumber: string | null;
    email: string | null;
    role: string | null;
    requiresTwoFactor: boolean;
    isLoading: boolean;
    error: string | null;
    isSuccess: boolean;
    message: string | null;
}

const initialState: AuthState = {
    token: null,
    refreshToken: null,
    name: null,
    address: null,
    phoneNumber: null,
    email: null,
    role: null,
    requiresTwoFactor: false,
    isLoading: false,
    error: null,
    isSuccess: false,
    message: null
};

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('Email', credentials.email);
            formData.append('Password', credentials.password);

            const response = await axios.post(
                'https://flawless-a2exc2hwcge8bbfz.canadacentral-01.azurewebsites.net/api/user-account/login',
                formData,
                {
                    headers: {
                        'accept': '*/*',
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.errorMessage || 'Login failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuth: (state) => {
            return initialState;
        },
        setCredentials: (state, action) => {
            const { token, refreshToken, name, address, phoneNumber, email, role } = action.payload;
            state.token = token;
            state.refreshToken = refreshToken;
            state.name = name;
            state.address = address;
            state.phoneNumber = phoneNumber;
            state.email = email;
            state.role = role;
        },
        logout: (state) => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = action.payload.isSuccess;
                state.requiresTwoFactor = action.payload.requiresTwoFactor;
                state.message = action.payload.message;
                state.error = action.payload.errorMessage || null;

                if (action.payload.token) {
                    state.token = action.payload.token;
                    state.refreshToken = action.payload.refreshToken;
                    state.name = action.payload.name;
                    state.address = action.payload.address;
                    state.phoneNumber = action.payload.phoneNumber;
                    state.email = action.payload.email;
                    state.role = action.payload.role;
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.isSuccess = false;
            });
    },
});

export const { resetAuth, setCredentials, logout } = authSlice.actions;
export default authSlice.reducer; 