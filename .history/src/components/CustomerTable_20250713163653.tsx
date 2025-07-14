import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import CustomerTableRow from "./CustomerTableRow";
import Pagination from "./Pagination";
import { fetchAppointments } from "@/redux/slices/appointmentSlice";
import type { Appointment } from "@/redux/slices/appointmentSlice";

export default function CustomerTable() {
	// appointment data
	const dispatch = useDispatch<AppDispatch>();
	const { data: dataAppointment, loading, error } = useSelector(
		(state: RootState) => state.appointment,
	);

	useEffect(() => {
		console.log("Fetching appointments...");
		dispatch(fetchAppointments())
			.unwrap()
			.then(() => console.log("Appointments fetched successfully"))
			.catch((err) => console.error("Error fetching appointments:", err));
	}, [dispatch]);

	// Log state changes
	useEffect(() => {
		console.log("Current appointment data:", dataAppointment);
		console.log("Loading state:", loading);
		if (error) console.error("Error state:", error);
	}, [dataAppointment, loading, error]);

	// Search
	const search = useSelector((state: RootState) => state.search.customerSearch);
	const date = useSelector((state: RootState) => state.search.date);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	// Lọc dữ liệu theo search (tên customer hoặc artist) và ngày tháng năm
	const filteredCustomers = dataAppointment?.appointments?.filter(
		(c: Appointment) =>
			(c.customerName.toLowerCase().includes(search.toLowerCase()) ||
				c.artistMakeupName.toLowerCase().includes(search.toLowerCase())) &&
			(date === "" || c.appointmentDate.slice(0, 10) === date),
	) || [];

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
							currentItems.map((appointment: Appointment) => (
								<CustomerTableRow
									key={appointment.id}
									id={appointment.id}
									customerId={appointment.customerId}
									customerName={appointment.customerName}
									appointmentDate={appointment.appointmentDate}
									artistMakeupId={appointment.artistMakeupId}
									artistMakeupName={appointment.artistMakeupName}
									status={appointment.status}
									appointmentDetails={appointment.appointmentDetails}
								/>
							))
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
