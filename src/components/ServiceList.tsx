import { useState, useEffect } from "react";
import ServiceItem from "./ServiceItem"
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchArtistList } from "@/redux/slices/artistListSlice";

export default function ArtistList() {
	// Artist List data
	const dispatch = useDispatch<AppDispatch>();
	const { artistList: dataArtistList } = useSelector(
		(state: RootState) => state.artistList,
	);
	// Kiểm tra toàn bộ state lưu trong Redux
	// const fullState = useSelector((state: RootState) => state);
	// console.log("Full redux state", fullState);
	
	useEffect(() => {
		dispatch(fetchArtistList());
	}, [dispatch]);

	// test đã fetch dữ liệu thành công chưa
	// useEffect(() => {
	// 	if (dataArtistList) {
	// 		console.log("Dữ liệu dataArtistList đã fetch:", dataArtistList);
	// 	}
	// }, [dataArtistList]);

	// Search
	const artistSearch = useSelector(
		(state: RootState) => state.search.artistSearch,
	);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	// Lọc dữ liệu theo search (tên customer hoặc artist) và ngày tháng năm
	const filteredArtists = Array.isArray(dataArtistList)
	? dataArtistList.filter((c) =>
		c.nameArtist.toLowerCase().includes(artistSearch.toLowerCase())
	  )
	: [];
  
	useEffect(() => {
		setCurrentPage(1);
	}, [artistSearch]);
	// Calculate pagination
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredArtists?.slice(indexOfFirstItem, indexOfLastItem);
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
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{currentItems.length === 0 ? (
					<p className="text-center text-gray-400 font-semibold py-8">
						No matching results found
					</p>
				) : (
					currentItems.map((artist) => (
                        artist?.services.map((service) => 
						<ServiceItem 
							key={service.id}
                            idSer={service.id}
							nameSer={service.name}
							nameAr={artist.nameArtist}
							price={service.price}
							description={service.description}
							status= {service.status}							
						/>
					)))
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
