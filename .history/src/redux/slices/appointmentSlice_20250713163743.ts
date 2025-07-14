import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../store';

export interface AppointmentDetail {
  id: string;
  serviceOptionId: string;
  serviceOptionName: string;
  quantity: number;
  note: string;
  unitPrice: number;
}

export interface Appointment {
  id: string;
  customerId: string;
  customerName: string;
  imageUrlCustomer: string | null;
  artistMakeupId: string;
  artistMakeupName: string;
  appointmentDate: string;
  address: string;
  note: string;
  status: string;
  voucherId: string | null;
  totalAmount: number;
  totalDiscount: number;
  totalAmountAfterDiscount: number;
  depositForApp: number;
  amountToPayForArtist: number;
  appointmentDetails: AppointmentDetail[];
}

interface AppointmentResponse {
  appointments: Appointment[];
  isSuccess: boolean;
  errorMessage: string;
}

interface AppointmentState {
  data: AppointmentResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: AppointmentState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchAppointments = createAsyncThunk(
  'appointment/fetchAppointments',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        throw new Error('No authentication token found');
      }

      const formData = new FormData();
      formData.append('Id', '');
      formData.append('UserId', '');
      formData.append('Status', '');
      formData.append('ArtistId', '');

      const response = await axios.post(
        'https://flawless-a2exc2hwcge8bbfz.canadacentral-01.azurewebsites.net/api/appointment/get-appointment',
        formData,
        {
          headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`,
          }
        }
      );

      if (!response.data.isSuccess) {
        return rejectWithValue(response.data.errorMessage || 'Failed to fetch appointments');
      }

      return response.data as AppointmentResponse;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.errorMessage || error.message || 'Failed to fetch appointments'
      );
    }
  }
);

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch appointments.';
      });
  },
});

export default appointmentSlice.reducer;
