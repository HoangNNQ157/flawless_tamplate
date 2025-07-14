import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios, { AxiosError } from "axios";
import type { RootState } from "@/redux/store";
import { useState } from "react";

// Giao diện dữ liệu lỗi trả về từ API
interface ErrorResponse {
  errorMessage?: string;
  message?: string;
  title?: string;
  errors?: Record<string, string[]>;
}

// Props cho mỗi nghệ sĩ
interface ArtistItemProps {
  name: string;
  code: string;
  specialty: string;
  phone: string;
  rating: number;
  reviewCount: number;
  avatarUrl: string;
  bgColor: string;
  status: number;
  onStatusChange?: () => void;
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
  status,
  onStatusChange,
}: ArtistItemProps) {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);

  // Điều hướng tới trang chi tiết
  const handleClick = () => {
    navigate(`/artists/${code}`);
  };

  // Gửi yêu cầu duyệt / từ chối nghệ sĩ
  const callUpdateStatusApi = async (accept: boolean) => {
    if (!token) {
      alert("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("Id", code);
      formData.append(
        "Accept",
        new Blob([JSON.stringify(accept)], {
          type: "application/json",
        })
      );

      await axios.post(
        "https://flawless-a2exc2hwcge8bbfz.canadacentral-01.azurewebsites.net/api/user-account/Accept-artist",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(`Đã ${accept ? "duyệt" : "từ chối"} nghệ sĩ thành công.`);
      onStatusChange?.();
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      const data = err.response?.data;

      if (data?.errors) {
        const detail = Object.entries(data.errors)
          .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
          .join("\n");
        alert(detail);
      } else {
        alert(data?.errorMessage || data?.message || data?.title || "Có lỗi xảy ra.");
      }

      console.error("❌ API Error:", data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = (e: React.MouseEvent) => {
    e.stopPropagation();
    callUpdateStatusApi(true);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    callUpdateStatusApi(false);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        backgroundColor: bgColor,
        cursor: "pointer",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "12px",
        opacity: isLoading ? 0.6 : 1,
        pointerEvents: isLoading ? "none" : "auto",
      }}
    >
      <div className="bg-white rounded-xl shadow p-4 text-center space-y-3">
        {/* Avatar */}
        <div className="flex justify-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: bgColor }}
          >
            <img src={avatarUrl} alt={name} className="object-cover w-full h-full" />
          </div>
        </div>

        
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-sm text-gray-500">
          {code} ・ {specialty}
        </p>

        
        <p className="text-sm text-gray-500">
          <i className="fa-solid fa-phone mr-1" />
          {phone}
        </p>

       
        <div className="flex justify-center items-center gap-1 text-yellow-500 text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <i
              key={i}
              className={`fa-star ${i < Math.floor(rating) ? "fa-solid" : "fa-regular"}`}
            />
          ))}
          <span className="text-black font-medium">{rating.toFixed(1)}</span>
        </div>

        <p className="text-xs text-gray-500">
          ({reviewCount.toLocaleString()} đánh giá)
        </p>

        {/* Duyệt / Từ chối */}
        {status === 0 && (
          <div className="flex justify-center gap-2 mt-3">
            <button
              onClick={handleAccept}
              disabled={isLoading}
              className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              Accept
            </button>
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
