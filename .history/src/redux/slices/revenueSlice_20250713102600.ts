// src/redux/slices/revenueSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTotalRevenue = createAsyncThunk(
  "revenue/fetchTotalRevenue",
  async () => {
    const res = await fetch("/api/totalRevenue.json");
    if (!res.ok) throw new Error("Failed to fetch totalRevenue.json");
    return await res.json();
  }
);

const revenueSlice = createSlice({
  name: "revenue",
  initialState: {
    data: null as any, // instead of `null`
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalRevenue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotalRevenue.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTotalRevenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching data";
      });
  },
});

export default revenueSlice.reducer;
