import { useEffect } from "react";
import { useState } from "react";
import ReviewItem from "./ReviewItem";
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchTotalReview } from "@/redux/slices/reviewSlice";
export default function ReviewList() {
	// review data
	const dispatch = useDispatch<AppDispatch>();
	const { totalReview: dataReview } = useSelector(
		(state: RootState) => state.review,
	);

	useEffect(() => {
		dispatch(fetchTotalReview());
	}, [dispatch]);

	// test đã fetch dữ liệu thành công chưa
	// useEffect(() => {
	// 	if (dataReview) {
	// 		console.log("Dữ liệu dataReview đã fetch:", dataReview);
	// 	}
	// }, [dataReview]);
	// Search
	const artistSearchReview = useSelector(
		(state: RootState) => state.search.artistSearchReview,
	);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	// Lọc dữ liệu theo search (tên customer hoặc artist) và ngày tháng năm
	const filteredArtists = dataReview?.filter((review) =>
		review.artist.nameAr
			.toLowerCase()
			.includes(artistSearchReview.toLowerCase()),
	);

	useEffect(() => {
		setCurrentPage(1);
	}, [artistSearchReview]);
	// Calculate pagination
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredArtists.slice(indexOfFirstItem, indexOfLastItem);
	const totalItems = filteredArtists.length;

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleItemsPerPageChange = (newItemsPerPage: number) => {
		setItemsPerPage(newItemsPerPage);
		setCurrentPage(1); // Reset to first page when changing items per page
	};
	return (
		<>
			<div className="space-y-4">
				{currentItems.length === 0 ? (
					<p className="text-center text-gray-400 font-semibold py-8">
						No matching results found
					</p>
				) : (
					currentItems.map((review, index) => (
						<ReviewItem
							key={index}
							nameCus={review.customer.nameCu}
							avatarCus={review.customer.avatar}
							nameAr={review.artist.nameAr}
							message={review.message}
							rating={review.rating}
							datetime={review.datetime}
						/>
					))
				)}
			</div>
			<Pagination
				currentPage={currentPage}
				totalItems={totalItems}
				itemsPerPage={itemsPerPage}
				onPageChange={handlePageChange}
				onItemsPerPageChange={handleItemsPerPageChange}
			/>
		</>
	);
}
