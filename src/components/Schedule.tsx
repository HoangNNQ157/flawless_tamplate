import { useState } from "react";
import { format, startOfWeek, addDays } from "date-fns";
const hourBlockHeight = 120; // hoặc 140, 160 tùy UI mong muốn
import SyntheticDialog from "./SyntheticDialog";
import type { RootState } from "../redux/store";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
function timeToMinutes(timeStr: string): number {
	const [time, modifier] = timeStr.split(" ");
	let [hours, minutes] = time.split(":").map(Number);

	if (modifier === "PM" && hours !== 12) hours += 12;
	if (modifier === "AM" && hours === 12) hours = 0;

	return hours * 60 + minutes;
}

const hours = [
	"6:00 AM",
	"7:00 AM",
	"8:00 AM",
	"9:00 AM",
	"10:00 AM",
	"11:00 AM",
	"12:00 PM",
	"1:00 PM",
	"2:00 PM",
	"3:00 PM",
	"4:00 PM",
	"5:00 PM",
	"6:00 PM",
	"7:00 PM",
	"8:00 PM",
];

const getColor = (type: number) => {
	return type === 0 ? "from-green-50 to-green-100" : "from-red-50 to-red-100";
};

// const getWeekDays = (weekOffset = 0) => {
// 	const now = new Date();
// 	const base = startOfWeek(now, { weekStartsOn: 1 }); // Always Monday of this week
// 	const start = addDays(base, weekOffset * 7); // Offset in full weeks
// 	return Array.from({ length: 7 }, (_, i) =>
// 		format(addDays(start, i), "EEEE d"),
// 	);
// };

const getWeekDays = (weekOffset = 0) => {
	const now = new Date();
	const base = startOfWeek(now, { weekStartsOn: 1 }); // Monday
	const start = addDays(base, weekOffset * 7);

	return Array.from({ length: 7 }, (_, i) => {
		const date = addDays(start, i);
		return {
			label: format(date, "EEEE d"), // e.g. "Monday 26"
			value: format(date, "yyyy-MM-dd"), // e.g. "2025-05-26"
		};
	});
};

const Schedule = () => {
	const { id } = useParams<{ id: string }>();
	const artistList = useSelector(
		(state: RootState) => state.artistList.artistList,
	);
	const artist = artistList.find((a) => a.idArtist === id);

	if (!artist) {
		return (
			<p className="text-sm text-gray-500">
				Artist not found or data not loaded.
			</p>
		);
	}
	// Kiểm tra đã có dữ liệu trong biến artist chưa
	// console.log("artist:", artist); 
	const schedule = artist?.schedule;
	//Kiểm tra đã có dữ liệu trong biến schedule chưa
	// console.log("schedule:", schedule);

	const [weekOffset, setWeekOffset] = useState(0);
	const days = getWeekDays(weekOffset);
	const currentTime = new Date();
	const currentDayLabel = format(currentTime, "EEEE d");
	const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
	const getRingColor = (type: number) => {
		return type === 0 ? "hover:ring-green-400" : "hover:ring-red-400";
	};
	``;
	// Kiểm tra dữ liệu của trường date trong mảng schedule
	// console.log(
	// 	"schedule date values:",
	// 	schedule.map((a) => a.date),
	// );
	// Kiểm tra dữ liệu của trường value trong mảng getWeekDays
	// console.log(
	// 	"week view values:",
	// 	days.map((d) => d.value),
	// );

	const [open, setOpen] = useState(false);
	return (
		<>
			<div className="w-full">
				<div className="flex items-center justify-between mb-4">
					{/* Select Week Dropdown (bên trái) */}
					<div className="flex items-center gap-3">
						<label className="text-sm font-semibold">Select Week:</label>
						<select
							className="border px-2 py-1 rounded-xl text-sm"
							value={weekOffset}
							onChange={(e) => setWeekOffset(Number(e.target.value))}
						>
							<option value={0}>This Week</option>
							<option value={-1}>Last Week</option>
							<option value={1}>Next Week</option>
						</select>
					</div>

					{/* Synthetic Button (bên phải) */}
					<div>
						<button
							onClick={() => setOpen(true)}
							className="bg-green-100 text-green-700 px-4 py-2 rounded-full"
						>
							Synthetic
						</button>
						{artist && (
						<SyntheticDialog isOpen={open} onClose={() => setOpen(false)} artist={artist} />
					)}
					</div>
				</div>
				{/* Header row */}
				<div
					className={`grid grid-cols-[100px_repeat(7,minmax(0,1fr))] mb-2 gap-1`}
				>
					<div className="text-sm text-center p-4 font-medium text-gray-600 bg-slate-200 border rounded-xl">
						UTC +7
					</div>
					{days.map((day) => {
						const [weekday, date] = day.label.split(" ");
						const isToday = currentDayLabel === day.label;
						return (
							<div
								key={day.label}
								className={`text-center p-2 rounded-xl border shadow-md font-semibold ${
									isToday ? "bg-green-100 border-green-300" : "bg-white"
								}`}
							>
								<p className="text-sm">{weekday}</p>
								<p className="text-xs text-gray-500">{date}</p>
							</div>
						);
					})}
				</div>
				{/* Schedule grid */}
				<div className="rounded-3xl overflow-hidden border shadow-xl">
					{hours.map((hour) => {
						const hourStart = timeToMinutes(hour);
						const isCurrentHour =
							currentMinutes >= hourStart && currentMinutes < hourStart + 60;

						return (
							<div
								key={hour}
								className={`grid grid-cols-[100px_repeat(7,minmax(0,1fr))] text-sm relative ${
									isCurrentHour ? "bg-yellow-50" : ""
								}`}
							>
								<div className="p-3 text-center bg-gray-50 text-gray-600 font-semibold">
									{hour}
								</div>

								{days.map((dayLabel) => {
									const cellAppointments = schedule?.filter(
										(a) =>
											a.date === dayLabel.value &&
											timeToMinutes(a.time) >= hourStart &&
											timeToMinutes(a.time) < hourStart + 60,
									);
									// debugger;
									return (
										<div
											key={dayLabel.value}
											className="border-b relative h-28 bg-white"
											style={{
												height: `${hourBlockHeight}px`,
												overflowY: "visible",
											}} // tăng chiều cao, cho phép tràn ra
										>
											{cellAppointments?.map((appt, index) => {
												const start = timeToMinutes(appt.time);
												const offsetTop =
													((start - hourStart) / 60) * hourBlockHeight;
												const height =
													(Number(appt.duration.replace(/\D/g, "")) / 60) *
													hourBlockHeight;
												const total = cellAppointments.length;
												const widthPercent = 100 / total;
												const leftPercent = index * widthPercent;

												return (
													<div
														key={index}
														className={`absolute rounded-xl shadow-md p-2 text-xs bg-gradient-to-r ${getColor(
															appt.status,
														)} overflow-hidden 
  transition-all duration-200 ease-in-out 
  hover:shadow-2xl hover:z-[999] hover:ring-2 hover:ring-offset-1 ${getRingColor(
		appt.status,
	)}`}
														style={{
															top: `${offsetTop}%`,
															height: `max(${height}%, 60px)`,
															width: `calc(${widthPercent}% - 4px)`,
															left: `calc(${leftPercent}% + 2px)`,
															zIndex: 10 + index,
														}}
													>
														<p className="font-semibold text-gray-800 truncate">
															{appt.customer.name}
														</p>
														<p className="text-gray-600 text-xs truncate">
															{appt.service}
														</p>
														<p className="text-gray-500 text-xs truncate">
															{appt.time}
														</p>
													</div>
												);
											})}
										</div>
									);
								})}
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default Schedule;

// const allAppointments = [
// 	// Week 1: Monday 19 – Friday 23
// 	{
// 		name: "Sarah Miller",
// 		time: "9:00 AM",
// 		day: "Monday 19",
// 		treatment: "Facial Rejuvenation",
// 		type: "red",
// 		avatar: "/avatars/avatar1.jpg",
// 		duration: 30,
// 	},
// 	{
// 		name: "Grace Parker",
// 		time: "9:30 AM",
// 		day: "Tuesday 20",
// 		treatment: "Scar Removal",
// 		type: "green",
// 		avatar: "/avatars/avatar2.jpg",
// 		duration: 60,
// 	},
// 	{
// 		name: "Emma Wilson",
// 		time: "11:30 AM",
// 		day: "Tuesday 20",
// 		treatment: "Chemical Peel",
// 		type: "red",
// 		avatar: "/avatars/avatar3.jpg",
// 		duration: 90,
// 	},
// 	{
// 		name: "Daniel Evans",
// 		time: "11:30 AM",
// 		day: "Tuesday 20",
// 		treatment: "Tattoo Removal",
// 		type: "green",
// 		avatar: "/avatars/avatar4.jpg",
// 		duration: 60,
// 	},
// 	{
// 		name: "Julia Watson",
// 		time: "3:00 PM",
// 		day: "Thursday 22",
// 		treatment: "Botox",
// 		type: "red",
// 		avatar: "/avatars/avatar5.jpg",
// 		duration: 30,
// 	},
// 	{
// 		name: "Megan Roberts",
// 		time: "1:15 PM",
// 		day: "Friday 23",
// 		treatment: "Laser Hair Removal",
// 		type: "green",
// 		avatar: "/avatars/avatar6.jpg",
// 		duration: 45,
// 	},
// 	{
// 		name: "Henry Turner",
// 		time: "10:45 AM",
// 		day: "Monday 19",
// 		treatment: "Microdermabrasion",
// 		type: "green",
// 		avatar: "/avatars/avatar7.jpg",
// 		duration: 30,
// 	},

// 	// Week 2: Monday 26 – Friday 30
// 	{
// 		name: "Liam Johnson",
// 		time: "9:00 AM",
// 		day: "Monday 26",
// 		treatment: "Skin Check",
// 		type: "green",
// 		avatar: "/avatars/avatar8.jpg",
// 		duration: 30,
// 	},
// 	{
// 		name: "Olivia Brown",
// 		time: "10:30 AM",
// 		day: "Tuesday 27",
// 		treatment: "Acne Treatment",
// 		type: "red",
// 		avatar: "/avatars/avatar9.jpg",
// 		duration: 60,
// 	},
// 	{
// 		name: "Noah Davis",
// 		time: "11:15 AM",
// 		day: "Wednesday 28",
// 		treatment: "Body Contouring",
// 		type: "green",
// 		avatar: "/avatars/avatar10.jpg",
// 		duration: 75,
// 	},
// 	{
// 		name: "Ava Garcia",
// 		time: "12:00 PM",
// 		day: "Thursday 29",
// 		treatment: "Scar Revision",
// 		type: "red",
// 		avatar: "/avatars/avatar11.jpg",
// 		duration: 45,
// 	},
// 	{
// 		name: "William Anderson",
// 		time: "2:00 PM",
// 		day: "Friday 30",
// 		treatment: "Chemical Peel",
// 		type: "green",
// 		avatar: "/avatars/avatar12.jpg",
// 		duration: 15,
// 	},

// 	// Week 3: Monday 2 – Friday 6 (June)
// 	{
// 		name: "James Thomas",
// 		time: "9:00 AM",
// 		day: "Monday 2",
// 		treatment: "Botox",
// 		type: "red",
// 		avatar: "/avatars/avatar13.jpg",
// 		duration: 60,
// 	},
// 	{
// 		name: "Sophia Martinez",
// 		time: "9:00 AM",
// 		day: "Monday 2",
// 		treatment: "Consultation",
// 		type: "green",
// 		avatar: "/avatars/avatar14.jpg",
// 		duration: 30,
// 	},
// 	{
// 		name: "Benjamin Moore",
// 		time: "1:45 PM",
// 		day: "Wednesday 4",
// 		treatment: "Hair Removal",
// 		type: "green",
// 		avatar: "/avatars/avatar15.jpg",
// 		duration: 15,
// 	},
// 	{
// 		name: "Mia Taylor",
// 		time: "2:15 PM",
// 		day: "Wednesday 4",
// 		treatment: "Anti-aging",
// 		type: "red",
// 		avatar: "/avatars/avatar16.jpg",
// 		duration: 60,
// 	},
// 	{
// 		name: "Ethan Clark",
// 		time: "3:00 PM",
// 		day: "Friday 6",
// 		treatment: "Fillers",git
// 		type: "red",
// 		avatar: "/avatars/avatar17.jpg",
// 		duration: 30,
// 	},
// ];
// interface ScheduleItem {
// 	id: string;
// 	customer: {
// 		id: string;
// 		name: string;
// 		avatar: string;
// 		phone: string;
// 		note: string;
// 		address: string;
// 	};
// 	service: string;
// 	date: string;
// 	time: string;
// 	duration: string;
// 	status: number;
// }

// interface ScheduleProps {
// 	schedule: ScheduleItem[];
// }