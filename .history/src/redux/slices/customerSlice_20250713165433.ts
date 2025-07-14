import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
  async () => {
    try {
      const response = await axios.get<CustomerData>(
        "https://flawless-a2exc2hwcge8bbfz.canadacentral-01.azurewebsites.net/api/dashboard/get-total-customer",
        {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzdhMmIzYS1lN2MxLTRiM2ItYjMxNy1kZDgwMTRiNjNmNDciLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjY3N2EyYjNhLWU3YzEtNGIzYi1iMzE3LWRkODAxNGI2M2Y0NyIsImVtYWlsIjoidGhhbmhkZXYzOEBnbWFpbC5jb20iLCJuYW1lIjoiaHJ0aHQgcsOoZ3JlZ2UiLCJ0YWduYW1lIjoiaHJ0aHQiLCJqdGkiOiI4N2JhYjY4Ni0yOWFlLTQyYmEtYjg3Mi04ZGM2NTRkMzY2NGYiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJDdXN0b21lciIsImV4cCI6MTc1MjQwMjAyNiwiaXNzIjoiZmxhd2xlc3MtYXBpIiwiYXVkIjoiZmxhd2xlc3MtY2xpZW50In0.GRu4q9oZIGqQvFnU-kIVO4JJ3q90tikKHGXhoYwSF7I",
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
        state.error = action.error.message || "Failed to fetch customer data";
      });
  },
});

export default customerSlice.reducer;
