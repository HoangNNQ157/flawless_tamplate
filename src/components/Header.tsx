import UserMenu from "./UserMenu";
import { useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();
  const label = pathname.split("/")[1] || "Appointments";
  return (
    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-6">
      <h1 className="text-2xl font-bold capitalize">{label}</h1>
      <UserMenu/>
    </div>
  )
} 