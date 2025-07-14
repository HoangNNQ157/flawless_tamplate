import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AppointmentDetail {
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

export const fetchTotalAppointment = createAsyncThunk(
  'appointment/fetchTotalAppointment',
  async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.post(
      'https://flawless-a2exc2hwcge8bbfz.canadacentral-01.azurewebsites.net/api/appointment/get-appointment',
      {
        Id: '',
        UserId: '',
        Status: '',
        ArtistId: ''
      },
      {
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return response.data as AppointmentResponse;
  }
);

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotalAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTotalAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch appointments.';
      });
  },
});

export default appointmentSlice.reducer;
