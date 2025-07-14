import { useState, useEffect } from "react";
import ArtistItem from "./ArtistItem";
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchArtistList } from "@/redux/slices/artistListSlice";

export default function ArtistList() {
	const dispatch = useDispatch<AppDispatch>();
	const { artistList: dataArtistList, totalCount, loading } = useSelector(
		(state: RootState) => state.artistList,
	);

	const artistSearch = useSelector(
		(state: RootState) => state.search.artistSearch,
	);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	useEffect(() => {
		dispatch(
			fetchArtistList({
				page: currentPage - 1,
				pageSize: itemsPerPage,
				searchContent: artistSearch,
			})
		);
	}, [dispatch, currentPage, itemsPerPage, artistSearch]);

	useEffect(() => {
		setCurrentPage(1);
	}, [artistSearch]);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleItemsPerPageChange = (newItemsPerPage: number) => {
		setItemsPerPage(newItemsPerPage);
		setCurrentPage(1);
	};

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{loading ? (
					<p className="text-center text-gray-400 font-semibold py-8">Loading...</p>
				) : dataArtistList.length === 0 ? (
					<p className="text-center text-gray-400 font-semibold py-8">
						No matching results found
					</p>
				) : (
					dataArtistList.map((artist) => (
						<ArtistItem
							key={artist.idArtist}
							name={artist.nameArtist}
							code={artist.idArtist}
							specialty={artist.specialty}
							phone={artist.phone}
							rating={artist.rating || 0}
							reviewCount={artist.reviewCount || 0}
							avatarUrl={artist.avatar || '/img/logo-flawless.png'}
							bgColor={"#fef2f2"}
						/>
					))
				)}
			</div>
			<Pagination
				currentPage={currentPage}
				totalItems={totalCount}
				itemsPerPage={itemsPerPage}
				onPageChange={handlePageChange}
				onItemsPerPageChange={handleItemsPerPageChange}
			/>
		</>
	);
}
