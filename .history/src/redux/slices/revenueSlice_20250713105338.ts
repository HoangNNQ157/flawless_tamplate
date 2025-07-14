// src/redux/slices/revenueSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";

export interface RevenueData {
  totalIncomeAllYear: number;
  perYear: Array<{
    year: number;
    totalIncomePerYear: number;
    totalNetProfitPerYear: number;
    totalRefundPerYear: number;
    totalPayoutForArtist: number;
    bestIncome: {
      month: string;
      value: number;
    };
    bestNetProfit: {
      month: string;
      value: number;
    };
    bestRefund: {
      month: string;
      value: number;
    };
    income: Record<string, number>;
    refund: Record<string, number>;
    netProfit: Record<string, number>;
  }>;
  isSuccess: boolean;
  errorMessage: string;
}

interface RevenueState {
  data: RevenueData | null;
  loading: boolean;
  error: string | null;
}

export const fetchTotalRevenue = createAsyncThunk(
  "revenue/fetchTotalRevenue",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        throw new Error("No token available");
      }

      const response = await axios.get<RevenueData>(
        "https://flawless-a2exc2hwcge8bbfz.canadacentral-01.azurewebsites.net/api/dashboard/tota-revenue",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.errorMessage || error.message || "Failed to fetch revenue data"
      );
    }
  }
);

const initialState: RevenueState = {
  data: null,
  loading: false,
  error: null,
};

const revenueSlice = createSlice({
  name: "revenue",
  initialState,
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
        state.error = action.payload as string || "Failed to fetch revenue data";
      });
  },
});

export default revenueSlice.reducer;
