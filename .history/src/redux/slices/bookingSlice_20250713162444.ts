import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define interfaces for the API response
interface BestBooking {
  month: string;
  booking: number;
}

interface BestCancel {
  month: string;
  cancel: number;
}

interface BookingYear {
  year: number;
  totalBookingPerYear: number;
  bestBooking: BestBooking;
  bestCancel: BestCancel;
  booking: {
    [key: string]: number;
  };
  cancel: {
    [key: string]: number;
  };
}

interface BookingData {
  totalBookingAllYear: number;
  perYear: BookingYear[];
  isSuccess: boolean;
  errorMessage: string;
}

interface BookingState {
  data: BookingData | null;
  loading: boolean;
  error: string | null;
}

export const fetchTotalBooking = createAsyncThunk(
  "booking/fetchTotalBooking",
  async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(
      "https://flawless-a2exc2hwcge8bbfz.canadacentral-01.azurewebsites.net/api/dashboard/total-booking",
      {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch total booking data");
    }

    const data = await response.json();
    return data;
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    data: null,
    loading: false,
    error: null,
  } as BookingState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotalBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTotalBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching booking data";
      });
  },
});

export default bookingSlice.reducer;
