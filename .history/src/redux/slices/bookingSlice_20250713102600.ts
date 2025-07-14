import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTotalBooking = createAsyncThunk(
  "booking/fetchTotalBooking",
  async () => {
    const res = await fetch("/api/totalBooking.json");
    if (!res.ok) throw new Error("Failed to fetch totalBooking.json");
    return await res.json();
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    data: null as any, // instead of `null`
    loading: false,
    error: null as string | null,
  },
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
        state.error = action.error.message || "Error fetching data";
      });
  },
});

export default bookingSlice.reducer;
