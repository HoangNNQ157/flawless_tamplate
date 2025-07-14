import { useNavigate } from "react-router-dom";
interface ArtistItemProps {
	name: string;
	code: string;  //idArtist
	specialty: string;
	phone: string;
	rating: number;
	reviewCount: number;
	avatarUrl: string;
	bgColor: string;
}

export default function ArtistItem({
	name,
	code,
	specialty,
	phone,
	rating,
	reviewCount,
	avatarUrl,
	bgColor,
}: ArtistItemProps) {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/artists/${code}`); // 👉 code là idArtist
	};
	const handleAccept = (e: React.MouseEvent) => {
		e.stopPropagation();
		console.log(`Accept artist: ${code}`);
		// TODO: Gọi API accept nếu cần
	};
	const handleCancel = (e: React.MouseEvent) => {
		e.stopPropagation();
		console.log(`Cancel artist: ${code}`);
		// TODO: Gọi API cancel nếu cần
	};
	return (
		<>
			{" "}
			<div
				onClick={handleClick}
				style={{
					backgroundColor: bgColor,
					cursor: "pointer",
					padding: "16px",
					borderRadius: "8px",
					marginBottom: "12px",
				}}
			>
				<div className="bg-white rounded-xl shadow p-4 text-center space-y-3">
					<div className="flex justify-center">
						<div
							className={`w-20 h-20 rounded-full flex items-center justify-center overflow-hidden`}
							style={{ backgroundColor: bgColor }}
						>
							<img
								src={avatarUrl}
								alt={name}
								className="object-cover w-full h-full"
							/>
						</div>
					</div>
					<h3 className="font-bold text-lg">{name}</h3>
					<p className="text-sm text-gray-500">
						{code} ・ {specialty}
					</p>
					<p className="text-sm text-gray-500">
						<i className="fa-solid fa-phone mr-1"></i> {phone}
					</p>
					<div className="flex justify-center items-center gap-1 text-yellow-500 text-sm">
						{Array.from({ length: 5 }).map((_, i) => (
							<i
								key={i}
								className={`fa-star ${i < Math.floor(rating) ? "fa-solid" : "fa-regular"
									}`}
							></i>
						))}
						<span className="text-black font-medium">{rating.toFixed(1)}</span>
					</div>
					<p className="text-xs text-gray-500">
						({reviewCount.toLocaleString()} reviews)
					</p>
					<div className="flex justify-center gap-2 mt-3">
						<button
							onClick={handleAccept}
							className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
						>
							Accept
						</button>
						<button
							onClick={handleCancel}
							className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
