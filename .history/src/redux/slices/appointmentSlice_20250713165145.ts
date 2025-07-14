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
  async (params: AppointmentSearchParams = {}) => {
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
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzdhMmIzYS1lN2MxLTRiM2ItYjMxNy1kZDgwMTRiNjNmNDciLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjY3N2EyYjNhLWU3YzEtNGIzYi1iMzE3LWRkODAxNGI2M2Y0NyIsImVtYWlsIjoidGhhbmhkZXYzOEBnbWFpbC5jb20iLCJuYW1lIjoiaHJ0aHQgcsOoZ3JlZ2UiLCJ0YWduYW1lIjoiaHJ0aHQiLCJqdGkiOiI4N2JhYjY4Ni0yOWFlLTQyYmEtYjg3Mi04ZGM2NTRkMzY2NGYiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJDdXN0b21lciIsImV4cCI6MTc1MjQwMjAyNiwiaXNzIjoiZmxhd2xlc3MtYXBpIiwiYXVkIjoiZmxhd2xlc3MtY2xpZW50In0.GRu4q9oZIGqQvFnU-kIVO4JJ3q90tikKHGXhoYwSF7I',
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
