
import React from "react";
import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";

interface StudentLayoutProps {
  children: React.ReactNode;
}

export default function StudentLayout({ children }: StudentLayoutProps) {
  return (
    <div className="min-h-screen">
      <TopNavbar />

      {/* Sidebar */}
      <div className="fixed top-24 left-0 bottom-0 w-[328px] z-30 hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="pt-24 lg:pl-[328px] min-h-screen bg-[#F8F8F8]">
        <div className="mx-auto px-4 py-5">{children}</div>
      </main>
    </div>
  );
}
