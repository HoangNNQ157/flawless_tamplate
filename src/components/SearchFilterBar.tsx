import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import {
	setCustomerSearch,
	setArtistSearch,
	setArtistSearchReview,
	setDate,
} from "../redux/slices/searchSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
interface SearchFilterBarProps {
  context: "customers" | "artists" | "reviews" | "appointments";
}
export default function SearchFilterBar({ context }: SearchFilterBarProps) {
	const dispatch = useDispatch();
	const customerSearch = useSelector(
		(state: RootState) => state.search.customerSearch,
	);
	const artistSearch = useSelector(
		(state: RootState) => state.search.artistSearch,
	);
  const artistSearchReview = useSelector(
		(state: RootState) => state.search.artistSearchReview,
	);
	const date = useSelector((state: RootState) => state.search.date);
	// const location = useLocation();
	// const pathname = location.pathname;
	// const isAppointmentsPage = pathname === "/appointments";
	// const isCustomersPage = pathname === "/customers";
	// const isArtistsPage = pathname === "/artists";
	// const isReviewPage = pathname == "/reviews";
  // Determine value
  // 1. local state để buffer text trước khi dispatch
  const reduxValue =
    context === "artists" ? artistSearch :
    context === "reviews" ? artistSearchReview :
    customerSearch;

  const [inputValue, setInputValue] = useState(reduxValue);

  // 2. sync Redux -> local state nếu Redux thay đổi từ nơi khác
  useEffect(() => {
    setInputValue(reduxValue);
  }, [reduxValue]);

  // 3. dispatch khi người dùng nhập
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    if (context === "artists") {
      dispatch(setArtistSearch(val));
    } else if (context === "reviews") {
      dispatch(setArtistSearchReview(val));
    } else {
      dispatch(setCustomerSearch(val));
    }
  };
	return (
		<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 mb-4">
			<input
				type="text"
				placeholder="Search customer, artist, etc"
				className="px-4 py-2 border rounded-2xl w-full sm:w-80 bg-gray-50"
				value={inputValue}
				onChange={onChange}
			/>
		
			<div className="sm:ml-auto flex items-center gap-2">
				{context === "appointments" && (
					<DatePicker
						selected={date ? new Date(date) : null}
						onChange={(dateObj: Date | null) => {
							if (dateObj) {
								const pad = (n: number) => n.toString().padStart(2, "0");
								const localDate = `${dateObj.getFullYear()}-${pad(
									dateObj.getMonth() + 1,
								)}-${pad(dateObj.getDate())}`;
								dispatch(setDate(localDate));
							} else {
								dispatch(setDate(""));
							}
						}}
						dateFormat="dd/MM/yyyy"
						placeholderText="Select date"
						className="border rounded-full px-4 py-2 bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-200 hover:bg-gray-100 transition-colors"
						isClearable
						showYearDropdown
						scrollableYearDropdown
					/>
				)}
			</div>
		</div>
	);
}
