import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";

interface CustomerMonth {
  totalCustomer: number;
  newCustomer: number;
  returnCustomer: number;
  cancelCustomer: number;
}

interface CustomerYear {
  year: number;
  totalCustomerPerYear: number;
  months: {
    [key: string]: CustomerMonth;
  };
}

interface CustomerData {
  totalCustomerAllYear: number;
  perYear: CustomerYear[];
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
  async (_, { getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        throw new Error('No authentication token found');
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
      throw new Error(error.response?.data?.errorMessage || error.message || "Failed to fetch customer data");
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    data: null,
    loading: false,
    error: null,
  } as CustomerState,
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
        state.error = action.error.message || "Failed to fetch customer data";
      });
  },
});

export default customerSlice.reducer;
