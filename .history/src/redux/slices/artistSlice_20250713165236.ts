import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
  async () => {
    const response = await fetch(
      "https://flawless-a2exc2hwcge8bbfz.canadacentral-01.azurewebsites.net/api/dashboard/get-total-artist",
      {
        headers: {
          accept: "*/*",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzdhMmIzYS1lN2MxLTRiM2ItYjMxNy1kZDgwMTRiNjNmNDciLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjY3N2EyYjNhLWU3YzEtNGIzYi1iMzE3LWRkODAxNGI2M2Y0NyIsImVtYWlsIjoidGhhbmhkZXYzOEBnbWFpbC5jb20iLCJuYW1lIjoiaHJ0aHQgcsOoZ3JlZ2UiLCJ0YWduYW1lIjoiaHJ0aHQiLCJqdGkiOiI4N2JhYjY4Ni0yOWFlLTQyYmEtYjg3Mi04ZGM2NTRkMzY2NGYiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJDdXN0b21lciIsImV4cCI6MTc1MjQwMjAyNiwiaXNzIjoiZmxhd2xlc3MtYXBpIiwiYXVkIjoiZmxhd2xlc3MtY2xpZW50In0.GRu4q9oZIGqQvFnU-kIVO4JJ3q90tikKHGXhoYwSF7I",
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
        state.error = action.error.message || "Error fetching artist data";
      });
  },
});

export default artistSlice.reducer;
