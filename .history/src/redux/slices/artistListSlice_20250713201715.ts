import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
	async () => {
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
					'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMTZmYWUyNy0wYTE3LTQ5NTItYTY3NS03YzgwNTU2NDdiNWEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIxNmZhZTI3LTBhMTctNDk1Mi1hNjc1LTdjODA1NTY0N2I1YSIsImVtYWlsIjoiZmxhd2xlc3Ntb2JpbGUyMDI1QGdtYWlsLmNvbSIsIm5hbWUiOiJhZG1pbiIsInRhZ25hbWUiOiJhZG1pbiIsImp0aSI6ImQ3YjNmYTllLTI5NzgtNDVlYi04YTI2LTFlZmJhODYwNDU4ZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzUyNDE2MDUzLCJpc3MiOiJmbGF3bGVzcy1hcGkiLCJhdWQiOiJmbGF3bGVzcy1jbGllbnQifQ.FPlDlruD2VDNO64iZsTYlaNiquVMT8VOWcpyjKM-9TM',
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
