import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTotalCustomer = createAsyncThunk(
  "customer/fetchTotalCustomer",
  async () => {
    const res = await fetch("/api/totalCustomer.json");
    if (!res.ok) throw new Error("Failed to fetch totalCustomer.json");
    return await res.json();
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    data: null as any, // instead of `null`
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotalCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTotalCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching data";
      });
  },
});

export default customerSlice.reducer;
