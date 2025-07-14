import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import searchReducer from "./slices/searchSlice";
import revenueReducer from "./slices/revenueSlice";
import bookingReducer from "./slices/bookingSlice";
import bestArtistReducer from "./slices/bestArtistSlice";
import bestServiceReducer from "./slices/bestServiceSlice";
import customerReducer from "./slices/customerSlice";
import artistReducer from "./slices/artistSlice";
import reviewReducer from "./slices/reviewSlice";
import appointmentReducer from "./slices/appointmentSlice";
import artistListReducer from "./slices/artistListSlice";
import customerListReducer from "./slices/customerListSlice";
// import other reducers...

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["artistList"], // chỉ persist phần này
};
const persistedArtistReducer = persistReducer(persistConfig, artistListReducer);
export const store = configureStore({
	reducer: {
		search: searchReducer,
		revenue: revenueReducer,
		booking: bookingReducer,
		bestArtist: bestArtistReducer,
		bestService: bestServiceReducer,
		customer: customerReducer,
		artist: artistReducer,
		review: reviewReducer,
		appointment: appointmentReducer,
		artistList: persistedArtistReducer,
		customerList: customerListReducer,
		// other reducers...
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
