import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBestArtist = createAsyncThunk(
  "bestArtist/fetchBestArtist",
  async () => {
    const res = await fetch("/api/bestArtist.json");
    if (!res.ok) throw new Error("Failed to fetch bestArtist.json");
    return await res.json();
  }
);

const bestArtistSlice = createSlice({
  name: "bestArtist",
  initialState: {
    data: null as any, // instead of `null`
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBestArtist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBestArtist.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBestArtist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching data";
      });
  },
});

export default bestArtistSlice.reducer;
