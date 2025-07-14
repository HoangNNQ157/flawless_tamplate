interface ServiceItemProps {
    idSer: string,
	nameSer: string;
    nameAr: string
	price: number
	description: string;
	status: number;
}

export default function ServiceItem({
    idSer,
	nameSer,
    nameAr,
    price,
    description,
    status,
}: ServiceItemProps) {
	// const navigate = useNavigate();

	// const handleClick = () => {
	// 	navigate(`/artists/${id}`); // 👉 code là idArtist
	// };
    const bgColor = (status === 0 ? "#fef2f2" : "#ecfdf5");
	return (
		<>
			{" "}
			<div
				// onClick={handleClick}
				style={{
					backgroundColor: bgColor,
					cursor: "pointer",
					padding: "16px",
					borderRadius: "8px",
					marginBottom: "12px",
				}}
			>
				<div className="bg-white rounded-xl shadow p-4 text-center space-y-3">
					{/* <div className="flex justify-center"> */}
						{/* <div
							className={`w-20 h-20 rounded-full flex items-center justify-center overflow-hidden`}
							style={{ backgroundColor: bgColor }}
						>
							<img
								src={avatarUrl}
								alt={name}
								className="object-cover w-full h-full"
							/>
						</div> */}
					{/* </div> */}
					<h3 className="font-bold text-lg">{nameSer}</h3>
					<p className="text-sm text-gray-500">
						{idSer} ・ {nameAr}
					</p>
					<p className="text-sm text-gray-500">
						<i className="fa-solid fa-phone mr-1"></i> {price}
					</p>
					<div className="flex justify-center items-center gap-1 text-yellow-500 text-sm">
						{/* {Array.from({ length: 5 }).map((_, i) => (
							<i
								key={i}
								className={`fa-star ${
									i < Math.floor(rating) ? "fa-solid" : "fa-regular"
								}`}
							></i>
						))} */}
						{/* <span className="text-black font-medium">{rating.toFixed(1)}</span> */}
                        <span className="text-black font-medium">{description}</span>
					</div>
					<p className="text-xs text-gray-500">
						{status === 1 ? 'Available' : 'In Available'}
					</p>
				</div>
			</div>
		</>
	);
}
