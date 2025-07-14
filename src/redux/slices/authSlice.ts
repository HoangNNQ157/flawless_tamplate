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

// Initialize state from localStorage
const initialState: AuthState = {
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken'),
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

// Configure axios to use token
export const setAuthToken = (token: string | null) => {
    if (token) {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
    }
};

// Set initial token if exists
if (initialState.token) {
    setAuthToken(initialState.token);
}

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
            setAuthToken(null);
            localStorage.removeItem('refreshToken');
            return initialState;
        },
        setCredentials: (state, action) => {
            const { token, refreshToken, isSuccess, errorMessage, email } = action.payload;
            if (token) {
                state.token = token;
                state.refreshToken = refreshToken;
                state.isSuccess = isSuccess;
                state.error = errorMessage || null;
                if (email) {
                    state.email = email;
                }
                // Set token in localStorage and axios defaults
                setAuthToken(token);
                if (refreshToken) {
                    localStorage.setItem('refreshToken', refreshToken);
                }
            }
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        logout: (state) => {
            setAuthToken(null);
            localStorage.removeItem('refreshToken');
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
                    setAuthToken(action.payload.token);
                    if (action.payload.refreshToken) {
                        localStorage.setItem('refreshToken', action.payload.refreshToken);
                    }
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.isSuccess = false;
            });
    },
});

export const { resetAuth, setCredentials, setEmail, logout } = authSlice.actions;
export default authSlice.reducer; 