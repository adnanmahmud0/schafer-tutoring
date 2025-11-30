// src/app/(teacher)/layout.jsx
import TopNavbar from "@/components/dashboard/TopNavbar";
import Sidebar from "@/components/dashboard/Sidebar";

export default function TeacherLayout({ children }) {
  return (
    <div className="min-h-screen ">
      {/* Full Width Top Navbar */}
      <TopNavbar />

      {/* Fixed 328px Sidebar */}
      <div className="fixed top-24 left-0 bottom-0 w-[328px] z-30 hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content - 328px মার্জিন + TopNavbar এর নিচে */}
      <main className="pt-24 lg:pl-[328px] min-h-screen bg-[#F8F8F8]">
        <div className="mx-auto px-4 py-5">
          {children}
        </div>
      </main>
    </div>
  );
}