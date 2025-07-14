import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice"; // bạn đã export đúng rồi
import SidebarNavItem from "./SidebarNavItem";
import SidebarUpdateCard from "./SidebarUpdateCard";

const navItems = [
  { icon: "fa-table-cells", label: "Dashboard", path: "/dashboard-admin" },
  { icon: "fa-calendar", label: "Appointments", path: "/appointments" },
  { icon: "fa-user-md", label: "Artists", path: "/artists" },
  { icon: "fa-users", label: "Customers", path: "/customers" },
  { icon: "fa-flask", label: "Services", path: "/services" },
  { icon: "fa-star", label: "Reviews", path: "/reviews" },
  { icon: "fa-credit-card", label: "Payments", path: "/payments" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Gọi action logout từ authSlice
    localStorage.removeItem("persist:root"); // nếu vẫn còn dư
    navigate("/login"); // quay về login
  };

  return (
    <aside className="hidden md:flex w-64 bg-white border-r flex-col">
      <div className="flex items-center gap-2 px-6 py-6">
        <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center overflow-hidden">
          <img
            src="/img/flawless.png"
            alt="Flawless Logo"
            className="w-full h-full object-cover rounded-full"
          />
        </span>
        <span className="font-bold text-xl text-gray-700">Flawless</span>
      </div>

      <nav className="flex-1 px-2 space-y-1">
        {navItems.map((item) => (
          <SidebarNavItem key={item.label} {...item} />
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <SidebarUpdateCard />
        <button
          className="flex items-center gap-2 w-full px-4 py-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 mt-2"
          onClick={handleLogout}
        >
          <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
        </button>
      </div>
    </aside>
  );
}
