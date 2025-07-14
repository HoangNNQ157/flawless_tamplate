import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define interfaces for the API response
interface ArtistMonth {
  totalArtist: number;
  newArtist: number;
  banArtist: number;
}

interface ArtistYear {
  year: number;
  totalArtistPerYear: number;
  months: {
    [key: string]: ArtistMonth;
  };
}

interface ArtistData {
  totalArtistAllYear: number;
  perYear: ArtistYear[];
  isSuccess: boolean;
  errorMessage: string;
}

interface ArtistState {
  data: ArtistData | null;
  loading: boolean;
  error: string | null;
}

export const fetchTotalArtist = createAsyncThunk(
  "artist/fetchTotalArtist",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(
      "https://flawless-a2exc2hwcge8bbfz.canadacentral-01.azurewebsites.net/api/dashboard/get-total-artist",
      {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch total artist data");
    }

    const data = await response.json();
    return data;
  }
);

const artistSlice = createSlice({
  name: "artist",
  initialState: {
    data: null,
    loading: false,
    error: null,
  } as ArtistState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalArtist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotalArtist.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTotalArtist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch total artist data";
      });
  },
});

export default artistSlice.reducer;
