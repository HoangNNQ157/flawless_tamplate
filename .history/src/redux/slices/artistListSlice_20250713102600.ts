import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface ArtistList {
	idArtist: string;
	nameArtist: string;
	avatar: string;
	role: string;
	specialty: string;
	status: number;
	gender: number;
	phone: string;
	email: string;
	dob: string;
	bankAccount: {
		bank: string;
		stk: string;
		name: string;
	};
	address: string;
	areaBook: string;
	note: string;
	aboutArtist: string;
	timeJoin: string;
	services: {
		id: string;
		name: string;
		price: number;
		description: string;
		status: number;
	}[];
	certificateImg: string[];
	reviewCount: number;
	rating: number;
	experience: string;
	schedule: {
		id: string;
		customer: {
			id: string;
			name: string;
			avatar: string;
			phone: string;
			note: string;
			address: string;
		};
		service: string;
		date: string;
		time: string;
		duration: string;
		status: number;
	}[];
	totalIncome: number;
	totalBooked: number;
	totalCancel: number;
	totalCustomer: number;
	productUsed: string[];
}

interface ArtistListState {
	artistList: ArtistList[];
	totalCount: number;
	loading: boolean;
	error: string | null;
}


interface FetchArtistListPayload {
	page?: number;
	pageSize?: number;
	searchContent?: string;
	requestStatus?: number;
}

const initialState: ArtistListState = {
	artistList: [],
	totalCount: 0,
	loading: false,
	error: null,
};


export const fetchArtistList = createAsyncThunk(
	"artistList/fetchArtistList",
	async (payload: FetchArtistListPayload) => {
		const { page = 0, pageSize = 10, searchContent = "", requestStatus = 0 } = payload;

		const response = await axios.post("/api/artist-progress/search-artist", {
			PageNumber: page,
			PageSize: pageSize,
			SearchContent: searchContent,
			RequestStatus: requestStatus,
		});

		
		return {
			artistList: response.data.data,
			totalCount: response.data.totalCount,
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
				state.artistList = action.payload.artistList;
				state.totalCount = action.payload.totalCount;
			})
			.addCase(fetchArtistList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Failed to fetch artistList.";
			});
	},
});

export default artistListSlice.reducer;
