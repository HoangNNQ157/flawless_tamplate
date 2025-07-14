
interface ReviewItemProps {
  nameCus: string;
  avatarCus: string;
  datetime: string;
  message: string;
  nameAr: string;
  rating: number;
}

export default function ReviewItem({
  nameCus,
  avatarCus,
  datetime,
  message,
  nameAr,
  rating,
}: ReviewItemProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      {/* 1. Avatar + Name + Date */}
      <div className="flex items-start gap-3 w-full sm:w-1/4">
        <div className="w-12 h-12 rounded-full bg-pink-100 overflow-hidden">
          <img src={avatarCus} alt={nameCus} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm text-gray-800">{nameCus}</span>
          <span className="text-xs text-gray-400">{datetime}</span>
        </div>
      </div>

      {/* 2. Message */}
      <div className="text-sm text-gray-700 flex-1 sm:w-2/4">{message}</div>

      {/* 3. Artist */}
      <div className="sm:w-1/6 text-sm">
        <span className="text-gray-400 block">Artist</span>
        <span className="font-medium text-gray-800">{nameAr}</span>
      </div>

      {/* 4. Rating + Button */}
      <div className="flex items-center gap-3 sm:w-1/6">
        <div className="flex items-center gap-1 text-yellow-400 text-sm">
          {[...Array(5)].map((_, i) => (
            <i
              key={i}
              className={`fa-star ${i < rating ? "fa-solid" : "fa-regular"}`}
            ></i>
          ))}
        </div>
        <button className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
          Archive
        </button>
      </div>
    </div>
  );
}
