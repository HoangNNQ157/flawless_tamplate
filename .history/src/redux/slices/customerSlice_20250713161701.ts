import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";

export interface CustomerData {
  totalCustomerAllYear: number;
  perYear: Array<{
    year: number;
    totalPerYear: number;
    months: {
      [key: string]: {
        totalCustomer: number;
        newCustomer: number;
        returnCustomer: number;
        cancelCustomer: number;
      };
    };
  }>;
  isSuccess: boolean;
  errorMessage: string;
}

interface CustomerState {
  data: CustomerData | null;
  loading: boolean;
  error: string | null;
}

export const fetchTotalCustomer = createAsyncThunk(
  "customer/fetchTotalCustomer",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        throw new Error("No token available");
      }

      const response = await axios.get<CustomerData>(
        "https://flawless-a2exc2hwcge8bbfz.canadacentral-01.azurewebsites.net/api/dashboard/get-total-customer",
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
        error.response?.data?.errorMessage || error.message || "Failed to fetch customer data"
      );
    }
  }
);

const initialState: CustomerState = {
  data: null,
  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
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
        state.error = action.payload as string || "Failed to fetch customer data";
      });
  },
});

export default customerSlice.reducer;
