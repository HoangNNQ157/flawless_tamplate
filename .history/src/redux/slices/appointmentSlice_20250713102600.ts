import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export interface Appointment {
    idCus: string,
    nameCus: string,
    avatarCus: string,
    datetime: string,
    nameAr: string,
    service: string,
    status: string
  }
interface AppointmentState {
    totalAppointment: Appointment[];
    loading: boolean;
    error: string | null;
  }
const initialState: AppointmentState = {
    totalAppointment: [],
    loading: false,
    error: null,
  };
// Giả lập API call
export const fetchTotalAppointment = createAsyncThunk(
  'appointment/fetchTotalAppointment',
  async () => {
    const response = await axios.get('/api/totalAppointment.json'); // Đảm bảo file này nằm trong public/
    return response.data.totalAppointment as Appointment[];
  }
);

const totalAppointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    // Thêm reducer tùy chỉnh nếu cần
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotalAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.totalAppointment = action.payload;
      })
      .addCase(fetchTotalAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch reviews.";
      });
  },
});

export default totalAppointmentSlice.reducer;
