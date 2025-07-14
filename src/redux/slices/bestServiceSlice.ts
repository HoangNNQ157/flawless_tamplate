import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBestService = createAsyncThunk(
  "bestService/fetchBestService",
  async () => {
    const res = await fetch("/api/bestService.json");
    if (!res.ok) throw new Error("Failed to fetch bestService.json");
    return await res.json();
  }
);

const bestServiceSlice = createSlice({
  name: "bestService",
  initialState: {
    data: null as any, // instead of `null`
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBestService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBestService.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBestService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching data";
      });
  },
});

export default bestServiceSlice.reducer;
