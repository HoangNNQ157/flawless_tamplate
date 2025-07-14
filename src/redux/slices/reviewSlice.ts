// src/redux/slices/reviewSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Review {
  id: string;
  customer: {
    idCu: string;
    nameCu: string;
    avatar: string;
  };
  artist: {
    idAr: string;
    nameAr: string;
  };
  service: string;
  message: string;
  rating: number;
  datetime: string;
}

interface ReviewState {
  totalReview: Review[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  totalReview: [],
  loading: false,
  error: null,
};

export const fetchTotalReview = createAsyncThunk("review/fetchTotalReview", async () => {
  const response = await axios.get("/api/totalReview.json");
  return response.data.totalReview as Review[];
});

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotalReview.fulfilled, (state, action) => {
        state.loading = false;
        state.totalReview = action.payload;
      })
      .addCase(fetchTotalReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch reviews.";
      });
  },
});

export default reviewSlice.reducer;
