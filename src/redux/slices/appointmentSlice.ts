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

export interface AppointmentResponse {
  appointments: Appointment[];
  totalAppointmentsAllYear: number;
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

export interface AppointmentSearchParams {
  Id?: string;
  UserId?: string;
  Status?: string;
  ArtistId?: string;
}

export const fetchAppointments = createAsyncThunk(
  'appointment/fetchAppointments',
  async (params: AppointmentSearchParams = {}, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;

    if (!token) {
      throw new Error('No authentication token found');
    }

    const formData = new FormData();
    if (params.Id) formData.append('Id', params.Id);
    if (params.UserId) formData.append('UserId', params.UserId);
    if (params.Status) formData.append('Status', params.Status);
    if (params.ArtistId) formData.append('ArtistId', params.ArtistId);

    const response = await axios.post(
      'https://flawless-a2exc2hwcge8bbfz.canadacentral-01.azurewebsites.net/api/appointment/get-appointment',
      formData,
      {
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const totalAppointments = response.data.appointments ? response.data.appointments.length : 0;
    return {
      appointments: response.data.appointments,
      totalAppointmentsAllYear: totalAppointments
    };
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
        state.error = action.error.message || 'Failed to fetch appointments';
      });
  },
});

export default appointmentSlice.reducer;
