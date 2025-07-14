import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import CustomerTableRow from "./CustomerTableRow";
import Pagination from "./Pagination";
import { fetchAppointments } from "@/redux/slices/appointmentSlice";
import type { Appointment, AppointmentSearchParams } from "@/redux/slices/appointmentSlice";

export default function CustomerTable() {
	// appointment data
	const dispatch = useDispatch<AppDispatch>();
	const { data: dataAppointment, loading, error } = useSelector(
		(state: RootState) => state.appointment,
	);

	// Search states
	const search = useSelector((state: RootState) => state.search.customerSearch);
	const date = useSelector((state: RootState) => state.search.date);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [searchParams, setSearchParams] = useState<AppointmentSearchParams>({});

	useEffect(() => {
		console.log("Fetching appointments...");
		dispatch(fetchAppointments(searchParams))
			.unwrap()
			.then(() => console.log("Appointments fetched successfully"))
			.catch((err) => console.error("Error fetching appointments:", err));
	}, [dispatch, searchParams]);

	// Log state changes
	useEffect(() => {
		console.log("Current appointment data:", dataAppointment);
		console.log("Loading state:", loading);
		if (error) console.error("Error state:", error);
	}, [dataAppointment, loading, error]);

	// Filter data by search (customer name or artist) and date
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
		setCurrentPage(1); 
	};

	
	const handleSearchParamChange = (params: Partial<AppointmentSearchParams>) => {
		setSearchParams(prev => ({
			...prev,
			...params
		}));
	};

	if (loading) {
		return (
			<div className="bg-white rounded-xl shadow-sm p-6 text-center">
				<p className="text-gray-500">Loading appointments...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="bg-white rounded-xl shadow-sm p-6 text-center">
				<p className="text-red-500">Error: {error}</p>
				<button
					onClick={() => dispatch(fetchAppointments(searchParams))}
					className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				>
					Try Again
				</button>
			</div>
		);
	}

	return (
		<>
			<div className="mb-4 flex gap-4">
				<select
					className="px-3 py-2 border rounded-lg"
					onChange={(e) => handleSearchParamChange({ Status: e.target.value })}
					value={searchParams.Status || ''}
				>
					<option value="">All Status</option>
					<option value="Pending">Pending</option>
					<option value="Confirmed">Confirmed</option>
					<option value="Completed">Completed</option>
					<option value="Canceled">Canceled</option>
					<option value="Rejected">Rejected</option>
					<option value="WaitRefund">Wait Refund</option>
					<option value="Refunded">Refunded</option>
				</select>
			</div>

			<div className="bg-white rounded-xl shadow-sm overflow-x-auto w-full max-w-[100vw]">
				<table className="w-full text-sm text-black">
					<thead>
						<tr className="text-gray-400 text-left border-b">
							<th className="py-3 px-4 font-normal">Customer ID</th>
							<th className="py-3 px-4 font-normal">Name</th>
							<th className="py-3 px-4 font-normal">Image</th>
							<th className="py-3 px-4 font-normal">Date & Time</th>
							<th className="py-3 px-4 font-normal">Address</th>
							<th className="py-3 px-4 font-normal">Artist</th>
							<th className="py-3 px-4 font-normal">Services</th>
							<th className="py-3 px-4 font-normal">Total Amount</th>
							<th className="py-3 px-4 font-normal">Discount</th>
							<th className="py-3 px-4 font-normal">Final Amount</th>
							<th className="py-3 px-4 font-normal">Deposit</th>
							<th className="py-3 px-4 font-normal">Artist Payment</th>
							<th className="py-3 px-4 font-normal">Status</th>
							<th className="py-3 px-4 font-normal">Note</th>
						</tr>
					</thead>
					<tbody>
						{currentItems.length === 0 ? (
							<tr>
								<td
									colSpan={14}
									className="text-center py-8 text-gray-400 font-semibold"
								>
									{loading ? "Loading..." : "No matching results found"}
								</td>
							</tr>
						) : (
							currentItems.map((appointment: Appointment) => (
								<CustomerTableRow
									key={appointment.id}
									{...appointment}
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
