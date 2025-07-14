import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";
import type { ArtistList as ArtistListType } from "@/types/ArtistList";

interface ArtistListState {
	artistList: ArtistListType[];
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

interface FetchArtistListParams {
	page?: number;
	pageSize?: number;
	searchContent?: string;
	requestStatus?: number;
}

export const fetchArtistList = createAsyncThunk(
	"artistList/fetchArtistList",
	async (
		params: FetchArtistListParams = {},
		{ getState }
	) => {
		const state = getState() as RootState;
		const token = state.auth.token;

		if (!token) {
			throw new Error("No authentication token found");
		}

		const formData = new FormData();
		formData.append("RequestStatus", String(params.requestStatus ?? 0));
		formData.append("SearchContent", params.searchContent || "");
		formData.append("PageNumber", String(params.page ?? 0));
		formData.append("PageSize", String(params.pageSize ?? 10));

		const response = await axios.post(
			"https://flawless-a2exc2hwcge8bbfz.canadacentral-01.azurewebsites.net/api/artist-progress/search-artist",
			formData,
			{
				headers: {
					accept: "*/*",
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			}
		);

		if (!response.data.isSuccess) {
			throw new Error(response.data.errorMessage || "Failed to fetch artist list");
		}

		const rawArtists = response.data.artists || response.data.data || [];

		const users: ArtistListType[] = rawArtists.map((a: Record<string, unknown>) => ({
			idArtist: a.id as string,
			nameArtist: a.name as string,
			avatar: a.imageUrl as string,
			specialty: a.tagName as string,
			status: params.requestStatus ?? 0,
			gender: a.gender as number,
			phone: a.phoneNumber as string,
			email: a.email as string,
			dob: (a.dob as string) || "",
			bankAccount: { bank: "", stk: "", name: "" },
			address: a.address as string,
			areaBook: "",
			note: "",
			aboutArtist: "",
			timeJoin: "",
			services: [],
			certificateImg: [],
			reviewCount: 0,
			rating: 0,
			experience: "",
			schedule: [],
			totalIncome: 0,
			totalBooked: 0,
			totalCancel: 0,
			totalCustomer: 0,
			productUsed: [],
		}));

		return {
			users,
			totalCount: response.data.totalCount || 0,
		};
	}
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
