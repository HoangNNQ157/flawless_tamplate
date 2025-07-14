import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { CustomerItem, CustomerListState } from "../../types/CustomerItem";

const initialState: CustomerListState = {
	customerList: [],
	loading: false,
	error: null,
};

export const fetchCustomerList = createAsyncThunk(
	"customerList/fetchCustomerList",
	async () => {
		const response = await axios.get("/api/customerList.json");
        console.log("customerListSlice: " + response.data.customerList);
		return response.data.customerList as CustomerItem[];
	},
);

const customerListSlice = createSlice({
	name: "customerList",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCustomerList.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCustomerList.fulfilled, (state, action) => {
				state.loading = false;
				state.customerList = action.payload;
			})
			.addCase(fetchCustomerList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Failed to fetch customerList.";
			});
	},
});

export default customerListSlice.reducer;
