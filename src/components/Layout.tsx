// import Header from "./Header";
// import Sidebar from "./Sidebar";
// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="w-full max-w-[100vw] overflow-x-hidden">
//       <div className="flex min-h-screen bg-[#f8f9fa]">
//         <Sidebar/>
//         <main className="flex-1 p-2 sm:p-4 md:p-8 w-full max-w-[100vw] overflow-x-hidden">
//           <Header/>
//           {children}
//         </main>
//       </div>
//     </div>
//   )
// } 

import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden">
      <div className="flex min-h-screen bg-[#f8f9fa]">
        <Sidebar />
        <main className="flex-1 p-2 sm:p-4 md:p-8 w-full max-w-[100vw] overflow-x-hidden">
          <Header />
          <Outlet /> {/* Thay vì children */}
        </main>
      </div>
    </div>
  );
}
