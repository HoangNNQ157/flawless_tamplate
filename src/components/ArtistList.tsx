import { useState, useEffect } from "react";
import ArtistItem from "./ArtistItem";
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchArtistList } from "@/redux/slices/artistListSlice";

export default function ArtistList() {
	const dispatch = useDispatch<AppDispatch>();
	const { artistList: dataArtistList, totalCount, loading } = useSelector(
		(state: RootState) => state.artistList
	);
	const artistSearch = useSelector((state: RootState) => state.search.artistSearch);

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [statusFilter, setStatusFilter] = useState(0);

	// ✅ function reload danh sách
	const reloadList = () => {
		dispatch(
			fetchArtistList({
				page: currentPage - 1,
				pageSize: itemsPerPage,
				searchContent: artistSearch,
				requestStatus: statusFilter,
			})
		);
	};

	useEffect(() => {
		reloadList();
	}, [dispatch, currentPage, itemsPerPage, artistSearch, statusFilter]);

	useEffect(() => {
		setCurrentPage(1);
	}, [artistSearch, statusFilter]);

	const handlePageChange = (page: number) => setCurrentPage(page);

	const handleItemsPerPageChange = (newItemsPerPage: number) => {
		setItemsPerPage(newItemsPerPage);
		setCurrentPage(1);
	};

	return (
		<>
			<div className="flex justify-center gap-4 mb-6">
				<button
					className={`px-4 py-2 rounded ${statusFilter === 0 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
					onClick={() => setStatusFilter(0)}
				>
					Pending
				</button>
				<button
					className={`px-4 py-2 rounded ${statusFilter === 1 ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
					onClick={() => setStatusFilter(1)}
				>
					Accepted
				</button>
				<button
					className={`px-4 py-2 rounded ${statusFilter === 2 ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
					onClick={() => setStatusFilter(2)}
				>
					Rejected
				</button>
			</div>

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
							avatarUrl={artist.avatar || "/img/logo-flawless.png"}
							bgColor={"#fef2f2"}
							status={artist.status}
							onStatusChange={reloadList} 
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
