import { createSlice } from '@reduxjs/toolkit';

interface SearchState {
  customerSearch: string;
  artistSearch: string;
  artistSearchReview: string;
  date: string;
}

// const today = new Date().toISOString().slice(0, 10);

const initialState: SearchState = {
  customerSearch: '',
  artistSearch: '',
  artistSearchReview: '',
  date: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setCustomerSearch(state, action: { payload: string }) {
      state.customerSearch = action.payload;
    },
    setArtistSearch(state, action: { payload: string }) {
      state.artistSearch = action.payload;
    },
    setArtistSearchReview(state, action: { payload: string }) {
      state.artistSearchReview = action.payload;
    },
    setDate(state, action: { payload: string }) {
      state.date = action.payload;
    },
  },
});

export const { setCustomerSearch, setArtistSearch, setArtistSearchReview, setDate } = searchSlice.actions;
export default searchSlice.reducer; 