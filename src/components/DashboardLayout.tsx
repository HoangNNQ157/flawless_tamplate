import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout() {
  // const [activeLabel, setActiveLabel] = useState("Appointments");

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        {/* Nội dung khác ở đây */}
      </div>
    </div>
  );
}
