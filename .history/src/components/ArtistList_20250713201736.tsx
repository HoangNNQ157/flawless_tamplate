import { useState, useEffect } from "react";
import ArtistItem from "./ArtistItem";
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchArtistList } from "@/redux/slices/artistListSlice";

export default function ArtistList() {
	// Artist List data
	const dispatch = useDispatch<AppDispatch>();
	const { artistList: dataArtistList, totalCount } = useSelector(
		(state: RootState) => state.artistList,
	);

	useEffect(() => {
		dispatch(fetchArtistList());
	}, [dispatch]);

	// Search
	const artistSearch = useSelector(
		(state: RootState) => state.search.artistSearch,
	);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	// Filter data based on search
	const filteredArtists = Array.isArray(dataArtistList)
		? dataArtistList.filter((artist) =>
			artist.name.toLowerCase().includes(artistSearch.toLowerCase()) ||
			artist.tagName.toLowerCase().includes(artistSearch.toLowerCase())
		)
		: [];

	useEffect(() => {
		setCurrentPage(1);
	}, [artistSearch]);

	// Calculate pagination
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredArtists?.slice(indexOfFirstItem, indexOfLastItem);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleItemsPerPageChange = (newItemsPerPage: number) => {
		setItemsPerPage(newItemsPerPage);
		setCurrentPage(1); // Reset to first page when changing items per page
	};

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{currentItems.length === 0 ? (
					<p className="text-center text-gray-400 font-semibold py-8">
						No matching results found
					</p>
				) : (
					currentItems.map((artist) => (
						<ArtistItem
							key={artist.id}
							name={artist.name}
							code={artist.id}
							specialty={artist.tagName}
							phone={artist.phoneNumber || 'N/A'}
							rating={0}
							reviewCount={0}
							avatarUrl={artist.imageUrl || '/img/logo-flawless.png'}
							bgColor={"#fef2f2"}
						/>
					))
				)}
			</div>
			<Pagination
				currentPage={currentPage}
				totalItems={filteredArtists.length}
				itemsPerPage={itemsPerPage}
				onPageChange={handlePageChange}
				onItemsPerPageChange={handleItemsPerPageChange}
			/>
		</>
	);
}
