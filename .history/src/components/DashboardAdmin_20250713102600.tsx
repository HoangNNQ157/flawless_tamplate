import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalRevenue } from "../redux/slices/revenueSlice";
import { fetchTotalBooking } from "../redux/slices/bookingSlice";
import { fetchBestService } from "@/redux/slices/bestServiceSlice";
import { fetchBestArtist } from "@/redux/slices/bestArtistSlice";
import { fetchTotalCustomer } from "@/redux/slices/customerSlice";
import { fetchTotalArtist } from "@/redux/slices/artistSlice";
import type { RootState, AppDispatch } from "../redux/store";
import {
	FaStar,
	FaRegStar,
	FaStarHalfAlt,
	FaSortUp,
	FaSortDown,
	FaSort,
	FaUsers,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faDollarSign,
	faUser,
	faCalendarCheck,
	faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import {
	LineChart,
	Line,
	BarChart,
	Bar,
	PieChart,
	Pie,
	Cell,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	CartesianGrid,
	ResponsiveContainer,
	ReferenceDot,
	Label,
} from "recharts";

interface bestArtistInMonth {
	idAr: string;
	nameAr: string;
	avatarAr: string;
	status: number;
	avgRating: number;
	totalRevenueInMonth: number;
	totalBookingInMonth: number;
	totalCancelInMonth: number;
}
interface bestServicetInMonth {
	idSer: string;
	nameSer: string;
	avgRating: number;
}

interface customerInMonth {
	totalCustomer: number;
	newCustomer: number;
	returnCustomer: number;
	cancelCustomer: number;
}

interface artistInMonth {
	totalArtist: number;
	newArtist: number;
	banArtist: number;
}
export default function DashboardAdmin() {
	// 1. API totalRevenue
	const dispatch = useDispatch<AppDispatch>();
	const { data: dataRevenue } = useSelector(
		(state: RootState) => state.revenue,
	);

	useEffect(() => {
		dispatch(fetchTotalRevenue());
	}, [dispatch]);

	const [year, setYear] = useState("2025");
	const selectedYearDataRevenue = dataRevenue?.totalRevenue?.perYear.find(
		(y: { year: number }) => y.year === Number(year),
	);

	const chartDataRevenue = selectedYearDataRevenue
		? Object.keys(selectedYearDataRevenue.income).map((monthKey) => ({
				month: monthKey.charAt(0).toUpperCase() + monthKey.slice(1), // ví dụ: jan -> Jan
				income: selectedYearDataRevenue.income[monthKey],
				refund: selectedYearDataRevenue.refund[monthKey],
				netProfit: selectedYearDataRevenue.netProfit[monthKey],
		  }))
		: [];
	const bestIncome = selectedYearDataRevenue?.bestIcome ?? {
		month: "",
		income: 0,
	};
	const bestRefund = selectedYearDataRevenue?.bestRefund ?? {
		month: "",
		refund: 0,
	};
	const bestNetProfit = selectedYearDataRevenue?.bestNetProfit ?? {
		month: "",
		netProfit: 0,
	};
	const incomeYear = selectedYearDataRevenue?.totalIcomePerYear || 0;
	const refundYear = selectedYearDataRevenue?.totalRefundPerYear || 0;
	const profitYear = selectedYearDataRevenue?.totalNetProfitPerYear || 0;

	// 2. API totalBooking
	const { data: dataBooking } = useSelector(
		(state: RootState) => state.booking,
	);

	useEffect(() => {
		dispatch(fetchTotalBooking());
	}, [dispatch]);
	const [yearBooking, setYearBooking] = useState("2023");
	const selectedYearDataBooking = dataBooking?.totalBooking?.perYear.find(
		(y: { year: number }) => y.year === Number(yearBooking),
	);
	const chartDataBooking = selectedYearDataBooking
		? Object.keys(selectedYearDataBooking.booking).map((monthKey) => ({
				month: monthKey.charAt(0).toUpperCase() + monthKey.slice(1), // jan -> Jan
				booking: selectedYearDataBooking.booking[monthKey],
				cancel: selectedYearDataBooking.cancel[monthKey],
		  }))
		: [];

	const bestBookingYear = selectedYearDataBooking?.bestBooking || 0;
	const bestCancelYear = selectedYearDataBooking?.bestCancel || 0;

	// 3. API bestArtist
	const { data: dataBestArtist } = useSelector(
		(state: RootState) => state.bestArtist,
	);

	useEffect(() => {
		dispatch(fetchBestArtist());
	}, [dispatch]);

	const [yearBestArtist, setYearBestArtist] = useState("2025");
	const currentMonthBestArtist = monthNames[new Date().getMonth()];
	const [monthBestArtist, setMonthBestArtist] = useState(
		currentMonthBestArtist,
	);
	const bestArtistRaw: bestArtistInMonth[] =
		dataBestArtist?.bestArist?.find(
			(y: { year: number }) => y.year === Number(yearBestArtist),
		)?.months[monthBestArtist] ?? [];
	const [sortBy, setSortBy] = useState<
		"revenue" | "bookings" | "cancels" | "rating"
	>("revenue");
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
	const handleSort = (column: typeof sortBy) => {
		if (sortBy === column) {
			setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
		} else {
			setSortBy(column);
			setSortDirection("desc");
		}
	};
	const bestArtistData = [...bestArtistRaw].sort((a, b) => {
		const multiplier = sortDirection === "asc" ? 1 : -1;
		switch (sortBy) {
			case "revenue":
				return (a.totalRevenueInMonth - b.totalRevenueInMonth) * multiplier;
			case "bookings":
				return (a.totalBookingInMonth - b.totalBookingInMonth) * multiplier;
			case "cancels":
				return (a.totalCancelInMonth - b.totalCancelInMonth) * multiplier;
			case "rating":
				return (a.avgRating - b.avgRating) * multiplier;
			default:
				return 0;
		}
	});

	// 4. API bestService
	const { data: dataBestService } = useSelector(
		(state: RootState) => state.bestService,
	);

	useEffect(() => {
		dispatch(fetchBestService());
	}, [dispatch]);

	const [yearBestService, setYearBestService] = useState("2025");
	const currentMonthBestService = monthNames[new Date().getMonth()];
	const [monthBestService, setMonthBestService] = useState(
		currentMonthBestService,
	);
	const bestServiceData: bestServicetInMonth[] = [
		...(dataBestService?.bestService?.find(
			(y: { year: number }) => y.year === Number(yearBestService),
		)?.months[monthBestService] ?? []),
	].sort((a, b) => b.avgRating - a.avgRating);

	// 5. API totalCustomer
	const { data: dataCustomer } = useSelector(
		(state: RootState) => state.customer,
	);

	useEffect(() => {
		dispatch(fetchTotalCustomer());
	}, [dispatch]);

	const [yearCustomer, setYearCustomer] = useState("2025");
	const currentMonthCustomer = monthNames[new Date().getMonth()];
	const [monthCustomer, setMonthCustomer] = useState(currentMonthCustomer);
	const customerData: customerInMonth =
		dataCustomer?.totalCustomer?.perYear.find(
			(y: { year: number }) => y.year === Number(yearCustomer),
		)?.months[monthCustomer] ?? {
			totalCustomer: 0,
			newCustomer: 0,
			returnCustomer: 0,
			cancelCustomer: 0,
		};
	// Lấy dữ liệu từ customerData
	const totalCus = customerData.totalCustomer;
	const newCus = customerData.newCustomer;
	const returnCus = customerData.returnCustomer;
	const cancelCus = customerData.cancelCustomer;
	// Dữ liệu cho PieChart
	const chartDataCustomer = [
		{ name: "New", value: newCus },
		{ name: "Returning", value: returnCus },
		{ name: "Canceled", value: cancelCus },
	];

	// 6. API totalArtist
	const { data: dataArtist } = useSelector((state: RootState) => state.artist);

	useEffect(() => {
		dispatch(fetchTotalArtist());
	}, [dispatch]);

	const [yearArtist, setYearArtist] = useState("2025");
	const currentMonthArtist = monthNames[new Date().getMonth()];
	const [monthArtist, setMonthArtist] = useState(currentMonthArtist);
	const artistData: artistInMonth = dataArtist?.totalArtist?.perYear.find(
		(y: { year: number }) => y.year === Number(yearArtist),
	)?.months[monthArtist] ?? {
		totalArtist: 0,
		newArtist: 0,
		banArtist: 0,
	};
	// Lấy dữ liệu từ artistData
	const totalAr = artistData.totalArtist;
	const newAr = artistData.newArtist;
	const banAr = artistData.banArtist;
	// Dữ liệu cho PieChart
	const chartDataArtist = [
		{ name: "New", value: newAr },
		{ name: "Ban", value: banAr },
	];

	// *** Kiểm tra đã fetch data từ api chưa
	// useEffect(() => {
	// 	if (dataArtist) {
	// 		console.log("Dữ liệu dataArtist đã fetch:", dataArtist);
	// 	}
	// }, [dataArtist]);
	return (
		<div className="flex flex-col gap-4 bg-gray-50 min-h-screen">
			<div className="flex flex-row gap-4">
				{/* A. Left Side - 2/3 */}
				<div className="w-2/3 space-y-4">
					{/* 1. Card to show the total earnings, total customers, total appointments, and total artists */}
					<div className="grid grid-cols-2 gap-4">
						<Card
							className="p-4 rounded-2xl shadow-lg bg-gradient-to-r from-pink-100 to-red-100 text-gray-800 flex items-center gap-4 hover:shadow-2xl hover:scale-105 hover:cursor-pointer hover:text-orange-900 hover:shadow-red-300 hover:bg-gradient-to-r hover:from-pink-200 hover:to-red-200 hover:border-2 hover:border-red-300 hover:border-solid transition-shadow duration-300"
							title="Earnings"
							value={
								dataRevenue?.totalRevenue?.totalIcomeAllYear
									? formatCurrencyVND(
											dataRevenue?.totalRevenue?.totalIcomeAllYear,
									  )
									: "Loading..."
							}
							icon={faDollarSign}
						/>
						<Card
							className="p-4 rounded-2xl shadow-lg bg-gradient-to-r from-green-100 to-emerald-100 text-gray-800 flex items-center gap-4 hover:shadow-2xl hover:scale-105 hover:cursor-pointer hover:text-emerald-950 hover:shadow-emerald-300 hover:bg-gradient-to-r hover:from-green-200 hover:to-emerald-200 hover:border-2 hover:border-emerald-300 hover:border-solid transition-shadow duration-300"
							title="Total Customers"
							value={
								dataCustomer?.totalCustomer?.totalCustomerAllYear ??
								"Loading..."
							} //(nullish coalescing)
							icon={faUser}
						/>
						<Card
							className="p-4 rounded-2xl shadow-lg bg-gradient-to-r from-green-100 to-emerald-100 text-gray-800 flex items-center gap-4 hover:shadow-2xl hover:scale-105 hover:cursor-pointer hover:text-emerald-950 hover:shadow-emerald-300 hover:bg-gradient-to-r hover:from-green-200 hover:to-emerald-200 hover:border-2 hover:border-emerald-300 hover:border-solid transition-shadow duration-300"
							title="Total Artists"
							value={
								dataArtist?.totalArtist?.totalArtistAllYear ?? "Loading..."
							} //(nullish coalescing)
							icon={faUserTie}
						/>{" "}
						<Card
							className="p-4 rounded-2xl shadow-lg bg-gradient-to-r from-pink-100 to-red-100 text-gray-800 flex items-center gap-4 hover:shadow-2xl hover:scale-105 hover:cursor-pointer hover:text-orange-900 hover:shadow-red-300 hover:bg-gradient-to-r hover:from-pink-200 hover:to-red-200 hover:border-2 hover:border-red-300 hover:border-solid transition-shadow duration-300"
							title="Appointments"
							value={
								dataBooking?.totalBooking?.totalBookingAllYear
									? formatCurrency(
											dataBooking?.totalBooking?.totalBookingAllYear,
									  )
									: "Loading..."
							}
							icon={faCalendarCheck}
						/>
					</div>
					{/* 2. Revenue */}
					<div className="bg-white p-4 rounded-2xl shadow-xl">
						<div className="flex justify-between items-center mb-2">
							<h2 className="text-lg font-semibold">Revenue</h2>
							<select
								value={year}
								onChange={(e) => setYear(e.target.value)}
								className="bg-gradient-to-r from-green-100 to-emerald-100 text-sm px-3 py-1 rounded-xl text-gray-700 outline-none"
							>
								{Array.isArray(dataRevenue?.totalRevenue?.perYear) &&
									dataRevenue.totalRevenue.perYear.map(
										(y: { year: number }) => (
											<option key={y.year} value={y.year}>
												{y.year}
											</option>
										),
									)}
							</select>
						</div>
						<div className="h-72 -mx-2 bg-red-50 rounded-2xl shadow-xl hover:scale-105 hover:shadow-rose-200 hover:cursor-pointer">
							{chartDataRevenue.length > 0 && (
								<ResponsiveContainer width="100%" height="100%">
									<LineChart
										data={chartDataRevenue}
										margin={{ left: 10, right: 20 }}
									>
										<CartesianGrid strokeDasharray="3 3" vertical={false} />
										<XAxis dataKey="month" />
										<YAxis />
										<Tooltip formatter={formatCurrencyVND} />
										<Legend verticalAlign="top" height={36} />
										{/* Line Income */}
										<Line
											type="monotone"
											dataKey="income"
											stroke="#34d399"
											strokeWidth={2}
											dot={{ r: 4 }}
											activeDot={{ r: 6 }}
											name="Income"
										/>
										{/* Best Income */}
										{renderBestDot({
											month: bestIncome.month,
											value: bestIncome.income,
											label: "Income",
											color: "#34d399",
											position: "top",
										})}
										{/* Line Refund */}
										<Line
											type="monotone"
											dataKey="refund"
											stroke="#fca5a5"
											strokeWidth={2}
											dot={false}
											name="Refund"
										/>
										{/* Best Refund */}
										{renderBestDot({
											month: bestRefund.month,
											value: bestRefund.refund,
											label: "Refund",
											color: "#fca5a5",
											position: "bottom",
										})}
										{/* Line Net Profit */}
										<Line
											type="monotone"
											dataKey="netProfit"
											stroke="#a3a3a3"
											strokeDasharray="5 5"
											strokeWidth={2}
											dot={false}
											name="Net Profit"
										/>
										{/* Best Net Profit */}
										{renderBestDot({
											month: bestNetProfit.month,
											value: bestNetProfit.netProfit,
											label: "Net",
											color: "#a3a3a3",
											position: "top",
										})}
									</LineChart>
								</ResponsiveContainer>
							)}
						</div>
						<div className="mt-4 grid grid-cols-3 gap-4 text-sm text-gray-700">
							<div className="bg-emerald-50 p-3 rounded-xl shadow-xl hover:scale-105 hover:shadow-emerald-200 hover:cursor-pointer">
								<div className="font-semibold">Total Income</div>
								<div className="text-base font-bold text-emerald-600">
									{formatCurrencyVND(incomeYear)}
								</div>
							</div>
							<div className="bg-rose-50 p-3 rounded-xl shadow-xl hover:scale-105 hover:shadow-rose-200 hover:cursor-pointer">
								<div className="font-semibold">Total Refund</div>
								<div className="text-base font-bold text-rose-500">
									{formatCurrencyVND(refundYear)}
								</div>
							</div>
							<div className="bg-gray-100 p-3 rounded-xl shadow-xl hover:scale-105 hover:shadow-gray-200 hover:cursor-pointer">
								<div className="font-semibold">Total Net Profit</div>
								<div className="text-base font-bold text-gray-700">
									{formatCurrencyVND(profitYear)}
								</div>
							</div>
						</div>
					</div>
					{/* 3. Booking */}
					<div className="bg-white p-4 rounded-2xl shadow">
						<div className="flex justify-between items-center mb-2">
							<div>
								<h2 className="text-lg font-semibold">Booking</h2>
								<div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
									<span className="text-2xl font-bold text-black">
										{selectedYearDataBooking?.totalBookingPerYear.toLocaleString() ??
											"0"}
									</span>
									<span className="text-gray-400">Total Booking</span>
								</div>
							</div>
							<select
								value={yearBooking}
								onChange={(e) => setYearBooking(e.target.value)}
								className="bg-gradient-to-r from-pink-100 to-red-100 text-sm px-3 py-1 rounded-xl text-gray-700 outline-none"
							>
								{dataBooking?.totalBooking?.perYear.map(
									(y: { year: number }) => (
										<option key={y.year} value={y.year}>
											{y.year}
										</option>
									),
								)}
							</select>
						</div>
						<div className="h-60 -ml-2 rounded-xl shadow-xl bg-gradient-to-r from-green-50 to-emerald-50 text-gray-800 flex items-center gap-4 hover:shadow-2xl hover:scale-105 hover:cursor-pointer hover:text-emerald-950 hover:shadow-emerald-300 hover:border-2 hover:border-emerald-300 hover:border-solid transition-shadow duration-300">
							{chartDataBooking.length > 0 ? (
								<ResponsiveContainer width="100%" height="100%">
									<BarChart data={chartDataBooking}>
										<defs>
											<linearGradient
												id="bookingGradient"
												x1="0"
												y1="0"
												x2="1"
												y2="0"
											>
												<stop offset="0%" stopColor="#d1fae5" />{" "}
												{/* from-green-100 */}
												<stop offset="100%" stopColor="#6ee7b7" />{" "}
												{/* to-emerald-100 */}
											</linearGradient>
											<linearGradient
												id="cancelGradient"
												x1="0"
												y1="0"
												x2="1"
												y2="0"
											>
												<stop offset="0%" stopColor="#fbcfe8" />{" "}
												{/* from-pink-100 */}
												<stop offset="100%" stopColor="#fca5a5" />{" "}
												{/* to-red-100 */}
											</linearGradient>
										</defs>
										<CartesianGrid strokeDasharray="3 3" vertical={false} />
										<XAxis dataKey="month" />
										<YAxis />
										<Tooltip
											content={({ active, payload, label }) => {
												if (!active || !payload) return null;
												return (
													<div className="bg-white p-3 rounded-xl shadow text-sm">
														<div className="font-semibold mb-1">{label}</div>
														{payload.map((entry, index) => {
															const isCancel = entry.dataKey === "cancel";
															const colorClass = isCancel
																? "bg-gradient-to-r from-pink-100 to-red-100"
																: "bg-gradient-to-r from-green-100 to-emerald-100";
															return (
																<div
																	key={index}
																	className="flex items-center gap-2"
																>
																	<span
																		className={`w-3 h-3 rounded-full ${colorClass}`}
																	/>
																	<span className="text-gray-600">
																		{entry.name}:
																	</span>
																	<span className="font-medium">
																		{entry.value?.toLocaleString()} times
																	</span>
																</div>
															);
														})}
													</div>
												);
											}}
										/>
										<Legend
											verticalAlign="top"
											height={36}
											content={() => (
												<div className="flex gap-4 text-sm text-gray-600 px-4 mt-1">
													<div className="flex items-center gap-2">
														<span className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-100 to-red-100" />
														Cancel
													</div>
													<div className="flex items-center gap-2">
														<span className="w-3 h-3 rounded-full bg-gradient-to-r from-green-100 to-emerald-100" />
														Booking
													</div>
												</div>
											)}
										/>
										<Bar
											dataKey="cancel"
											fill="url(#cancelGradient)"
											radius={[4, 4, 0, 0]}
											name="Cancel"
										/>
										<Bar
											dataKey="booking"
											fill="url(#bookingGradient)"
											radius={[4, 4, 0, 0]}
											name="Booking"
										/>
									</BarChart>
								</ResponsiveContainer>
							) : (
								<div className="h-full flex justify-center items-center text-gray-400">
									Loading...
								</div>
							)}
						</div>

						<div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-700">
							<div className="bg-emerald-50 p-3 rounded-xl shadow-xl hover:scale-105 hover:shadow-emerald-200 hover:cursor-pointer">
								<div className="font-semibold">Best Booking</div>
								<div className="text-base font-bold text-emerald-600">
									{bestBookingYear?.month} -{" "}
									{formatCurrency(bestBookingYear?.booking)}
								</div>
							</div>
							<div className="bg-rose-50 p-3 rounded-xl shadow-xl hover:scale-105 hover:shadow-rose-200 hover:cursor-pointer">
								<div className="font-semibold">Best Cancel</div>
								<div className="text-base font-bold text-rose-500">
									{bestCancelYear?.month} -{" "}
									{formatCurrency(bestCancelYear?.cancel)}
								</div>
							</div>
						</div>
					</div>
					{/* 4. Best Artist */}

					<div className="bg-white p-4 rounded-2xl shadow">
						<div className="flex justify-between items-center mb-2">
							<h2 className="text-lg font-semibold">Best Artist</h2>
							<div className="flex gap-2">
								<select
									value={monthBestArtist}
									onChange={(e) => setMonthBestArtist(e.target.value)}
									className="text-sm px-2 py-1 rounded-xl bg-gradient-to-r from-pink-100 to-red-100"
								>
									{monthNames.map((m) => (
										<option key={m} value={m}>
											{m.toUpperCase()}
										</option>
									))}
								</select>
								<select
									value={yearBestArtist}
									onChange={(e) => setYearBestArtist(e.target.value)}
									className="text-sm px-2 py-1 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50"
								>
									{dataBestArtist?.bestArist?.map((item: { year: number }) => (
										<option key={item.year} value={item.year}>
											{item.year}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className="divide-y bg-gray-200 rounded-xl shadow-xl text-gray-800 hover:shadow-2xl hover:scale-105 hover:cursor-pointer hover:text-emerald-950 hover:shadow-gray-300 hover:border-2 hover:border-gray-300 hover:border-solid transition-shadow duration-300">
							<div className="grid grid-cols-6 text-sm font-semibold items-center my-3 px-2 pt-3">
								<div>Artist</div>

								<div
									onClick={() => handleSort("revenue")}
									className="cursor-pointer flex items-center gap-1"
								>
									Revenue
									{sortBy === "revenue" ? (
										sortDirection === "asc" ? (
											<FaSortUp />
										) : (
											<FaSortDown />
										)
									) : (
										<FaSort className="text-gray-400" />
									)}
								</div>

								<div
									onClick={() => handleSort("bookings")}
									className="cursor-pointer flex items-center gap-1"
								>
									Bookings
									{sortBy === "bookings" ? (
										sortDirection === "asc" ? (
											<FaSortUp />
										) : (
											<FaSortDown />
										)
									) : (
										<FaSort className="text-gray-400" />
									)}
								</div>

								<div
									onClick={() => handleSort("cancels")}
									className="cursor-pointer flex items-center gap-1"
								>
									Cancels
									{sortBy === "cancels" ? (
										sortDirection === "asc" ? (
											<FaSortUp />
										) : (
											<FaSortDown />
										)
									) : (
										<FaSort className="text-gray-400" />
									)}
								</div>

								<div>Status</div>

								<div
									onClick={() => handleSort("rating")}
									className="cursor-pointer flex items-center gap-1"
								>
									Rating
									{sortBy === "rating" ? (
										sortDirection === "asc" ? (
											<FaSortUp />
										) : (
											<FaSortDown />
										)
									) : (
										<FaSort className="text-gray-400" />
									)}
								</div>
							</div>
							{bestArtistData.map((artist: bestArtistInMonth) => (
								<div
									key={artist.idAr}
									className="grid grid-cols-6 items-center px-2 py-2 text-sm"
								>
									<div className="flex items-center gap-2">
										<img
											src={artist.avatarAr}
											alt={artist.nameAr}
											className="w-8 h-8 rounded-full"
										/>
										<div>
											<div className="font-semibold">{artist.nameAr}</div>
											<div className="text-xs text-gray-500">{artist.idAr}</div>
										</div>
									</div>
									<div>{formatCurrencyVND(artist.totalRevenueInMonth)}</div>
									<div>{formatCurrency(artist.totalBookingInMonth)}</div>
									<div>{formatCurrency(artist.totalCancelInMonth)}</div>
									<div>{formatStatus(artist.status)}</div>
									<div>{renderStars(artist.avgRating)}</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* B. Right Side - 1/3 */}
				<div className="w-1/3 space-y-4">
					{/* Customer Overview */}
					<div className="bg-white p-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-110">
						{/* Dropdown chọn tháng/năm */}
						<div className="flex justify-between">
							<div className="pt-2">
								<h2 className="text-lg font-semibold mb-4">
									Customer Overview
								</h2>
							</div>

							<div className="flex gap-2">
								<select
									value={monthCustomer}
									onChange={(e) => setMonthCustomer(e.target.value)}
									className="text-sm px-2 py-1 rounded-xl bg-gradient-to-r from-pink-100 to-red-100"
								>
									{monthNames.map((m) => (
										<option key={m} value={m}>
											{m.toUpperCase()}
										</option>
									))}
								</select>

								<select
									value={yearCustomer}
									onChange={(e) => setYearCustomer(e.target.value)}
									className="text-sm px-2 py-1 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50"
								>
									{Array.isArray(dataCustomer?.totalCustomer?.perYear) &&
										dataCustomer.totalCustomer.perYear.map(
											(item: { year: number }) => (
												<option key={item.year} value={item.year}>
													{item.year}
												</option>
											),
										)}
								</select>
							</div>
						</div>
						{/* Biểu đồ vòng */}
						<div className="flex flex-col items-center">
							<PieChart width={200} height={200}>
								<defs>
									<linearGradient id="gradient-new" x1="0" y1="0" x2="1" y2="0">
										<stop offset="0%" stopColor="#fbcfe8" />{" "}
										{/* from-pink-100 */}
										<stop offset="100%" stopColor="#fca5a5" />{" "}
										{/* to-red-100 */}
									</linearGradient>
									<linearGradient
										id="gradient-return"
										x1="0"
										y1="0"
										x2="1"
										y2="0"
									>
										<stop offset="0%" stopColor="#d1fae5" />{" "}
										{/* from-green-100 */}
										<stop offset="100%" stopColor="#6ee7b7" />{" "}
										{/* to-emerald-100 */}
									</linearGradient>
									<linearGradient
										id="gradient-cancel"
										x1="0"
										y1="0"
										x2="1"
										y2="0"
									>
										<stop offset="0%" stopColor="#f9fafb" />{" "}
										{/* from-gray-50 */}
										<stop offset="100%" stopColor="#e5e7eb" />{" "}
										{/* to-gray-200 */}
									</linearGradient>
								</defs>
								<Pie
									data={chartDataCustomer}
									dataKey="value"
									innerRadius={60}
									outerRadius={80}
									paddingAngle={5}
								>
									{chartDataCustomer.map((_, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
							</PieChart>

							{/* Tổng khách hàng */}
							<h3 className="text-sm text-gray-500 -mt-2">Total Customer</h3>
							<div className="text-2xl font-semibold flex items-center gap-2">
								<FaUsers className="text-gray-700" size={20} />{" "}
								{totalCus.toLocaleString()}
							</div>

							{/* Chi tiết các loại */}
							<div className="mt-4 border-t w-full pt-3 space-y-2 text-sm">
								<div className="flex items-center justify-between px-1">
									<div className="flex items-center gap-2">
										<span className="bg-rose-100 text-xs font-semibold px-2 py-1 rounded">
											{getPercent(newCus, totalCus)}%
										</span>
										<span className="text-gray-700">New Customer</span>
									</div>
									<div className="text-gray-800 flex items-center gap-2">
										<span className="text-base font-medium">
											{newCus.toLocaleString()}
										</span>
										<FaUsers className="text-gray-700 w-5 h-5" />
									</div>
								</div>

								<div className="flex items-center justify-between px-1">
									<div className="flex items-center gap-2">
										<span className="bg-emerald-100 text-xs font-semibold px-2 py-1 rounded">
											{getPercent(returnCus, totalCus)}%
										</span>
										<span className="text-gray-700">Returning Customer</span>
									</div>
									<div className="text-gray-800 flex items-center gap-2">
										<span className="text-base font-medium">
											{returnCus.toLocaleString()}
										</span>
										<FaUsers className="text-gray-700 w-5 h-5" />
									</div>
								</div>

								<div className="flex items-center justify-between px-1">
									<div className="flex items-center gap-2">
										<span className="bg-gray-200 text-xs font-semibold px-2 py-1 rounded">
											{getPercent(cancelCus, totalCus)}%
										</span>
										<span className="text-gray-700">Canceled Customer</span>
									</div>
									<div className="text-gray-800 flex items-center gap-2">
										<span className="text-base font-medium">
											{cancelCus.toLocaleString()}
										</span>
										<FaUsers className="text-gray-700 w-5 h-5" />
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* Artist Overview */}
					{/* <div className="bg-white p-4 rounded-2xl shadow">
						<h2 className="text-lg font-semibold mb-2">Artist Overview</h2>
						<div className="h-48 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
							Artist Overview Chart
						</div>
					</div> */}

					<div className="bg-white p-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-110">
						{/* Dropdown chọn tháng/năm */}
						<div className="flex justify-between">
							<div className="pt-2">
								<h2 className="text-lg font-semibold mb-4">Artist Overview</h2>
							</div>

							<div className="flex gap-2">
								<select
									value={monthArtist}
									onChange={(e) => setMonthArtist(e.target.value)}
									className="text-sm px-2 py-1 rounded-xl bg-gradient-to-r from-pink-100 to-red-100"
								>
									{monthNames.map((m) => (
										<option key={m} value={m}>
											{m.toUpperCase()}
										</option>
									))}
								</select>

								<select
									value={yearArtist}
									onChange={(e) => setYearArtist(e.target.value)}
									className="text-sm px-2 py-1 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50"
								>
									{Array.isArray(dataArtist?.totalArtist?.perYear) &&
										dataArtist.totalArtist.perYear.map(
											(item: { year: number }) => (
												<option key={item.year} value={item.year}>
													{item.year}
												</option>
											),
										)}
								</select>
							</div>
						</div>
						{/* Biểu đồ vòng */}
						<div className="flex flex-col items-center">
							<PieChart width={200} height={200}>
								<defs>
									<linearGradient id="gradient-new" x1="0" y1="0" x2="1" y2="0">
										<stop offset="0%" stopColor="#fbcfe8" />{" "}
										{/* from-pink-100 */}
										<stop offset="100%" stopColor="#fca5a5" />{" "}
										{/* to-red-100 */}
									</linearGradient>
									<linearGradient
										id="gradient-return"
										x1="0"
										y1="0"
										x2="1"
										y2="0"
									>
										<stop offset="0%" stopColor="#d1fae5" />{" "}
										{/* from-green-100 */}
										<stop offset="100%" stopColor="#6ee7b7" />{" "}
										{/* to-emerald-100 */}
									</linearGradient>
								</defs>
								<Pie
									data={chartDataArtist}
									dataKey="value"
									innerRadius={60}
									outerRadius={80}
									paddingAngle={5}
								>
									{chartDataArtist.map((_, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
							</PieChart>

							{/* Tổng khách hàng */}
							<h3 className="text-sm text-gray-500 -mt-2">Total Artist</h3>
							<div className="text-2xl font-semibold flex items-center gap-2">
								<FaUsers className="text-gray-700" size={20} />{" "}
								{totalAr.toLocaleString()}
							</div>

							{/* Chi tiết các loại */}
							<div className="mt-4 border-t w-full pt-3 space-y-2 text-sm">
								<div className="flex items-center justify-between px-1">
									<div className="flex items-center gap-2">
										<span className="bg-rose-100 text-xs font-semibold px-2 py-1 rounded">
											{getPercent(newAr, totalAr)}%
										</span>
										<span className="text-gray-700">New Artist</span>
									</div>
									<div className="text-gray-800 flex items-center gap-2">
										<span className="text-base font-medium">
											{newAr.toLocaleString()}
										</span>
										<FaUsers className="text-gray-700 w-5 h-5" />
									</div>
								</div>

								<div className="flex items-center justify-between px-1">
									<div className="flex items-center gap-2">
										<span className="bg-emerald-100 text-xs font-semibold px-2 py-1 rounded">
											{getPercent(banAr, totalAr)}%
										</span>
										<span className="text-gray-700">Banned Artist</span>
									</div>
									<div className="text-gray-800 flex items-center gap-2">
										<span className="text-base font-medium">
											{banAr.toLocaleString()}
										</span>
										<FaUsers className="text-gray-700 w-5 h-5" />
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* Best Services */}
					<div className="bg-white p-4 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
						<div className="flex justify-between">
							<div className="pt-2">
								<h2 className="text-lg font-semibold mb-4">Best Services</h2>
							</div>

							<div className="flex gap-2">
								<select
									value={monthBestService}
									onChange={(e) => setMonthBestService(e.target.value)}
									className="text-sm px-2 py-1 rounded-xl bg-gradient-to-r from-pink-100 to-red-100"
								>
									{monthNames.map((m) => (
										<option key={m} value={m}>
											{m.toUpperCase()}
										</option>
									))}
								</select>
								<select
									value={yearBestService}
									onChange={(e) => setYearBestService(e.target.value)}
									className="text-sm px-2 py-1 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50"
								>
									{dataBestService?.bestService?.map(
										(item: { year: number }) => (
											<option key={item.year} value={item.year}>
												{item.year}
											</option>
										),
									)}
								</select>
							</div>
						</div>
						<ul className="space-y-4">
							{bestServiceData.map((item: bestServicetInMonth, index) => (
								<li
									key={item.idSer}
									className="flex items-center gap-4 hover:scale-110 hover:cursor-pointer hover:bg-green-100 hover:rounded-full"
								>
									<div className="bg-rose-100 text-sm font-semibold px-3 py-1 rounded-xl text-gray-700">
										#{index + 1}
									</div>
									<div className="flex-1">
										<div className="font-medium text-gray-800">
											{item.nameSer}
										</div>
										<div className="text-sm text-gray-500 flex items-center gap-2">
											{renderStars(item.avgRating)}
											<span>{item.avgRating}</span>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

// Function to render stars based on rating
function renderStars(rating: number) {
	const fullStars = Math.floor(rating);
	const hasHalf = rating % 1 >= 0.25 && rating % 1 < 0.75;
	const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

	return (
		<div className="flex text-yellow-500 items-center">
			{Array(fullStars)
				.fill(null)
				.map((_, i) => (
					<FaStar key={`full-${i}`} />
				))}
			{hasHalf && <FaStarHalfAlt />}
			{Array(emptyStars)
				.fill(null)
				.map((_, i) => (
					<FaRegStar key={`empty-${i}`} />
				))}
		</div>
	);
}
function Card({
	title,
	value,
	icon,
	className,
}: {
	title: string;
	value: string;
	icon: any;
	className: any;
}) {
	return (
		<div className={`${className}`}>
			<div className="text-2xl text-gray-600">
				<FontAwesomeIcon icon={icon} />
			</div>
			<div>
				<div className="text-sm font-medium">{title}</div>
				<div className="text-xl font-bold">{value}</div>
			</div>
		</div>
	);
}
function renderBestDot({
	month,
	value,
	label,
	color,
	position,
}: {
	month: string;
	value: number;
	label: string;
	color: string;
	position: "top" | "bottom";
}) {
	return (
		<ReferenceDot x={month} y={value} r={6} fill={color}>
			<Label
				position={position}
				content={() => (
					<text
						textAnchor="middle"
						fontSize={12}
						fill={color}
						fontWeight="bold"
						dy={position === "top" ? -10 : 10}
					>
						<tspan x="0" dy="0">
							{label}
						</tspan>
						<tspan x="0" dy="1.2em">
							${value.toLocaleString()}
						</tspan>
					</text>
				)}
			/>
		</ReferenceDot>
	);
}
function formatCurrencyVND(amount: number): string {
	return `${new Intl.NumberFormat("vi-VN").format(amount)} VNĐ`;
}
const formatCurrency = (value?: number) =>
	value != null ? `${value.toLocaleString()} times` : "0 time";
const monthNames = [
	"jan",
	"feb",
	"mar",
	"apr",
	"may",
	"jun",
	"jul",
	"aug",
	"sep",
	"oct",
	"nov",
	"dec",
];
const formatStatus = (status: number) => {
	switch (status) {
		case 0:
			return (
				<span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">
					Inactive
				</span>
			);
		case 1:
			return (
				<span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
					Active
				</span>
			);
		default:
			return <span className="text-gray-400">Unknown</span>;
	}
};
// Màu cho từng loại
const COLORS = [
	"url(#gradient-new)",
	"url(#gradient-return)",
	"url(#gradient-cancel)",
];

// Tính phần trăm
const getPercent = (value: number, total: number) =>
	total ? Math.round((value / total) * 100) : 0;
