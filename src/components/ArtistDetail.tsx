import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store"; // path đến store của bạn
import { Banknote, Hash, User } from "lucide-react";
import ProductChips from "./ProductChips";
export default function ArtistDetail() {
	const { id } = useParams<{ id: string }>();
	const artistList = useSelector(
		(state: RootState) => state.artistList.artistList,
	);

	const artist = artistList.find((a) => a.idArtist === id);

	if (!artist) {
		return <p>Artist not found or loading...</p>;
	}
	const navigate = useNavigate();

	const handleViewSchedule = () => {
		navigate(`/artists/${artist.idArtist}/schedule`);
	};
	return (
		<div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-[#f8f9fa] text-sm text-gray-700">
			{/* Profile Card */}
			<div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
				<div className="flex flex-col items-center text-center">
					<img
						src={artist.avatar}
						alt="Lila Martens"
						className="w-24 h-24 rounded-full object-cover"
					/>
					<h2 className="text-xl font-semibold mt-3">{artist.nameArtist}</h2>
					<div className="flex gap-3 mt-3 justify-center">
						<span className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-gray-600 hover:bg-red-300 hover:scale-110 transition-all duration-200 cursor-pointer">
							<i className="fa-solid fa-envelope"></i>
						</span>
						<span className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-gray-600 hover:bg-red-300 hover:scale-110 transition-all duration-200 cursor-pointer">
							<i className="fa-solid fa-comment-dots"></i>
						</span>
						<span className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-gray-600 hover:bg-red-300 hover:scale-110 transition-all duration-200 cursor-pointer">
							<i className="fa-solid fa-phone"></i>
						</span>
						<span className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-gray-600 hover:bg-red-300 hover:scale-110 transition-all duration-200 cursor-pointer">
							<i className="fa-solid fa-pen-to-square"></i>
						</span>
					</div>
				</div>
				<div className="relative bg-green-50 rounded-xl shadow-lg p-4 text-sm font-medium text-gray-700 overflow-hidden">
					{/* Logo góc trên trái */}
					<div className="flex items-center mb-3">
						<i className="fa-solid fa-wand-magic-sparkles text-red-300 mr-2 text-lg"></i>

						<span className="text-gray-800 text-sm font-semibold">
							{artist.specialty}
						</span>
					</div>

					{/* Nội dung chính */}
					<div className="mb-4">
						<p className="text-base font-bold text-gray-900">{artist.role}</p>
						<p className="text-sm text-gray-600">{artist.idArtist}</p>
					</div>

					{/* Ngày hết hạn */}
					<div>
						<p className="text-xs text-gray-500">Valid Until</p>
						<p className="text-sm font-medium text-gray-800">2032/01/01</p>
					</div>

					{/* Badge Active */}
					<span
						className={`absolute bottom-3 right-4 text-xs px-3 py-1 rounded-full font-semibold shadow-sm
    ${
			artist.status === 1
				? "bg-blue-100 text-blue-700"
				: "bg-red-100 text-orange-700"
		}`}
					>
						{artist.status === 1 ? "Active" : "Inactive"}
					</span>
				</div>
				<div className="bg-white rounded-xl p-4 shadow-lg space-y-3 text-sm text-gray-700">
					<div className="flex justify-between items-center">
						<h3 className="font-semibold text-base">General Info</h3>
						<i className="fa-solid fa-ellipsis text-gray-400"></i>
					</div>

					<div>
						<p className="text-xs text-gray-400 mb-1">About Artist</p>
						<p className="text-gray-700">{artist.aboutArtist}</p>
					</div>

					<hr className="my-2 border-gray-200" />

					<ul className="space-y-1 text-sm text-gray-700">
						<li>
							<span className="text-gray-500">ID Artist</span>{" "}
							<span className="float-right font-medium">{artist.idArtist}</span>
						</li>
						<li>
							<span className="text-gray-500">Gender</span>{" "}
							<span className="float-right font-medium">
								{artist.gender === 1 ? "Male" : "Female"}
							</span>
						</li>
						<li>
							<span className="text-gray-500">Birthday</span>{" "}
							<span className="float-right font-medium">{artist.dob}</span>
						</li>
						<li>
							<span className="text-gray-500">Experience</span>{" "}
							<span className="float-right font-medium">
								{artist.experience}
							</span>
						</li>
					</ul>
					<button
						onClick={handleViewSchedule}
						className="mt-4 w-full bg-green-100 text-green-800 py-2 rounded-full font-medium text-sm"
					>
						View Schedule
					</button>
				</div>
			</div>

			{/* Skill & Service Info */}
			<div className="col-span-2 bg-white rounded-xl p-6 shadow-sm space-y-6">
				<h3 className="text-lg font-semibold">Specialties & Services</h3>
				<div className="grid grid-cols-2 gap-4 text-center">
					<div className="bg-green-100 p-4 rounded-xl shadow-xl">
						<p className="text-lg font-bold">Total Income</p>
						<p className="text-xs text-gray-600 mt-1">
							<span className="text-sm font-semibold">
								{formatCurrencyVND(artist.totalIncome)}
							</span>
						</p>
					</div>
					<div className="bg-red-100 p-4 rounded-xl shadow-xl">
						<p className="text-lg font-bold">Booking</p>
						<p className="text-xs text-gray-600 mt-1">
							<span className="text-sm font-semibold">
								{artist.totalCustomer}
							</span>{" "}
							customers
						</p>
					</div>
					<div className="bg-red-100 p-4 rounded-xl shadow-xl">
						<p className="text-lg font-bold">Rating</p>
						<p className="text-xs text-gray-600 mt-1">
							<span className="text-sm font-semibold">{artist.rating}</span>/5
						</p>
					</div>
					<div className="bg-green-100 p-4 rounded-xl shadow-xl">
						<p className="text-lg font-bold">Canceled</p>
						<p className="text-xs text-gray-600 mt-1">
							<span className="text-sm font-semibold">
								{artist.totalCancel}
							</span>{" "}
							schedule
						</p>
					</div>
				</div>
				<hr className="my-2 border-gray-200" />
				<div className="grid grid-cols-2 gap-4 mt-6">
					<div>
						<h4 className="font-semibold mb-2">Bank Account</h4>
						<div className="overflow-hidden rounded-xl border bg-white shadow-xl text-sm w-full max-w-md">
							<table className="w-full bg-gray-100">
								<tbody>
									<tr className="border-b">
										<td className="px-4 py-3 flex items-center gap-2 text-gray-700 font-medium">
											<Banknote className="w-4 h-4 text-green-600" />
											Bank
										</td>
										<td className="px-4 py-3 text-gray-800">
											{artist.bankAccount.bank}
										</td>
									</tr>
									<tr className="border-b">
										<td className="px-4 py-3 flex items-center gap-2 text-gray-700 font-medium">
											<Hash className="w-4 h-4 text-blue-600" />
											Account number
										</td>
										<td className="px-4 py-3 text-gray-800">
											{artist.bankAccount.stk}
										</td>
									</tr>
									<tr>
										<td className="px-4 py-3 flex items-center gap-2 text-gray-700 font-medium">
											<User className="w-4 h-4 text-purple-600" />
											Account holder
										</td>
										<td className="px-4 py-3 text-gray-800">
											{artist.bankAccount.name}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div>
						<h4 className="font-semibold mb-2">Products Used</h4>
						<ProductChips productUsed={artist.productUsed} />
					</div>
				</div>
				{/* Contact & Health Report */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Contact Person */}
					<div className="bg-red-50 rounded-xl p-4 shadow-lg">
						<div className="flex justify-between items-center mb-3">
							<h3 className="font-semibold">Contact Person</h3>
							<i className="fa-solid fa-ellipsis text-gray-400"></i>
						</div>
						<div className="py-1 text-sm text-gray-700 space-y-4">
							{/* Phone */}
							<div className="flex items-start gap-3">
								<i className="fa-solid fa-phone text-gray-400 mt-1"></i>
								<div>
									<p className="text-xs text-gray-500">Phone</p>
									<p>{artist.phone}</p>
								</div>
							</div>

							{/* Address */}
							<div className="flex items-start gap-3">
								<i className="fa-solid fa-house text-gray-400 mt-1"></i>
								<div>
									<p className="text-xs text-gray-500">Address</p>
									<p>{artist.address}</p>
								</div>
							</div>

							{/* Email */}
							<div className="flex items-start gap-3">
								<i className="fa-solid fa-envelope text-gray-400 mt-1"></i>
								<div>
									<p className="text-xs text-gray-500">Email</p>
									<p>{artist.email}</p>
								</div>
							</div>

							{/* Area Booking */}
							<div className="flex items-start gap-3">
								<i className="fa-solid fa-circle-info text-gray-400 mt-1"></i>
								<div>
									<p className="text-xs text-gray-500">Area Booking</p>
									<p>{artist.areaBook}</p>
								</div>
							</div>
						</div>
					</div>

					{/* Services */}
					<div className="bg-green-50 rounded-xl p-4 shadow-lg">
						<div className="flex justify-between items-center mb-3">
							<h3 className="font-semibold">Services</h3>
							<i className="fa-solid fa-ellipsis text-gray-400"></i>
						</div>

						<div className="space-y-3 text-sm">
							<div className="space-y-3">
								{artist.services.map((service, index) => (
									<div
										key={index}
										className="flex items-start gap-3 bg-blue-50 p-3 rounded-xl border border-blue-100"
									>
										<div
											className={`px-2 py-1 text-xs font-semibold rounded-xl
    ${
			service.status === 1
				? "bg-blue-200 text-blue-800"
				: "bg-red-100 text-orange-700"
		}`}
										>
											{service.status === 1 ? "Active" : "Inactive"}
										</div>
										<div className="flex-1">
											<p className="font-semibold text-sm text-gray-800">
												{service.name}
											</p>
											<p className="text-xs text-gray-500">
												{service.description}
											</p>
											<p className="text-xs text-orange-700 font-semibold mt-1">
												${service.price}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Certificate */}
			<div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
				<div>
					<h3 className="text-lg font-semibold">Certificate</h3>
					{Array.isArray(artist.certificateImg) &&
					artist.certificateImg.length > 0 ? (
						<div className="mt-3">
							{artist.certificateImg.map((imgUrl, index) => (
								<div key={index} className="rounded-md text-sm">
									<img
										className="rounded-md w-full object-cover mt-3"
										src={imgUrl}
										alt={`Certificate ${index + 1}`}
									/>
								</div>
							))}
						</div>
					) : (
						<p className="text-sm text-gray-500">
							No certificate images available.
						</p>
					)}
				</div>
				<div>
					<h3 className="text-lg font-semibold">Notes</h3>
					<p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
						{artist.note}
					</p>
				</div>
			</div>
		</div>
	);
}
function formatCurrencyVND(amount: number): string {
	return `${new Intl.NumberFormat("vi-VN").format(amount)} VNĐ`;
}
