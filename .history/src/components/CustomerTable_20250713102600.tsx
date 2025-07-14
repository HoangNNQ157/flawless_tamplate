import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import CustomerTableRow from "./CustomerTableRow";
import Pagination from "./Pagination";
import { fetchTotalAppointment } from "@/redux/slices/appointmentSlice";

export default function CustomerTable() {
	// appointment data
	const dispatch = useDispatch<AppDispatch>();
	const { totalAppointment: dataAppointment } = useSelector(
		(state: RootState) => state.appointment,
	);

	useEffect(() => {
		dispatch(fetchTotalAppointment());
	}, [dispatch]);

	// test đã fetch dữ liệu thành công chưa
	// useEffect(() => {
	// 	if (dataAppointment) {
	// 		console.log("Dữ liệu dataAppointment đã fetch:", dataAppointment);
	// 	}
	// }, [dataAppointment]);

	// Search
	const search = useSelector((state: RootState) => state.search.customerSearch);
	const date = useSelector((state: RootState) => state.search.date);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	// Lọc dữ liệu theo search (tên customer hoặc artist) và ngày tháng năm
	const filteredCustomers = dataAppointment?.filter(
		(c) =>
			(c.nameCus.toLowerCase().includes(search.toLowerCase()) ||
				c.nameAr.toLowerCase().includes(search.toLowerCase())) &&
			(date === "" || c.datetime.slice(0, 10) === date),
	);

	// Calculate pagination
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredCustomers.slice(
		indexOfFirstItem,
		indexOfLastItem,
	);
	const totalItems = filteredCustomers.length;

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleItemsPerPageChange = (newItemsPerPage: number) => {
		setItemsPerPage(newItemsPerPage);
		setCurrentPage(1); // Reset to first page when changing items per page
	};

	return (
		<>
			<div className="bg-white rounded-xl shadow-sm overflow-x-auto w-full max-w-[100vw]">
				<table className="w-full text-sm">
					<thead>
						<tr className="text-gray-400 text-left border-b">
							<th className="py-3 px-4 font-normal">Customer ID</th>
							<th className="py-3 px-4 font-normal">Name</th>
							<th className="py-3 px-4 font-normal">Date & Time</th>
							<th className="py-3 px-4 font-normal">Artist</th>
							<th className="py-3 px-4 font-normal">Service</th>
							<th className="py-3 px-4 font-normal">Status</th>
						</tr>
					</thead>
					<tbody>
						{currentItems.length === 0 ? (
							<tr>
								<td
									colSpan={6}
									className="text-center py-8 text-gray-400 font-semibold"
								>
									No matching results found
								</td>
							</tr>
						) : (
							currentItems.map((c) => <CustomerTableRow key={c.idCus} {...c} />)
						)}
					</tbody>
				</table>
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
