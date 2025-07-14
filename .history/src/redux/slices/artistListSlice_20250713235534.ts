import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";

export interface ArtistList {
	id: string;
	name: string;
	tagName: string;
	gender: number;
	address: string | null;
	imageUrl: string | null;
	email: string;
	phoneNumber: string | null;
}

interface ArtistListState {
	artistList: ArtistList[];
	totalCount: number;
	loading: boolean;
	error: string | null;
}

const initialState: ArtistListState = {
	artistList: [],
	totalCount: 0,
	loading: false,
	error: null,
};

export const fetchArtistList = createAsyncThunk(
	"artistList/fetchArtistList",
	async (_, { getState }) => {
		const state = getState() as RootState;
		const token = state.auth.token;

		if (!token) {
			throw new Error('No authentication token found');
		}

		const formData = new FormData();
		formData.append('UserId', '');
		formData.append('Role', '1');
		formData.append('PageNumber', '2147483647');
		formData.append('PageSize', '2147483647');

		const response = await axios.post(
			'https://flawless-a2exc2hwcge8bbfz.canadacentral-01.azurewebsites.net/api/UserProgress/get-user',
			formData,
			{
				headers: {
					'accept': '*/*',
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			}
		);

		if (!response.data.isSuccess) {
			throw new Error(response.data.errorMessage || 'Failed to fetch artist list');
		}

		return {
			users: response.data.users,
			totalCount: response.data.totalCount
		};
	},
);

const artistListSlice = createSlice({
	name: "artistList",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchArtistList.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchArtistList.fulfilled, (state, action) => {
				state.loading = false;
				state.artistList = action.payload.users;
				state.totalCount = action.payload.totalCount;
			})
			.addCase(fetchArtistList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Failed to fetch artistList.";
			});
	},
});

export default artistListSlice.reducer;
