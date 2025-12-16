// src/components/dashboard/TopNavbar.jsx
'use client';

import { Bell, Menu } from "lucide-react";
import { useState } from "react";
import MobileMenu from "../../../components/dashboard/MobileMenu";
import Link from "next/link";

export default function TopNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="h-16 sm:h-20 lg:h-24 bg-white fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 sm:px-4 md:px-6">

        {/* Left: Hamburger (mobile) + Page Title (always left) */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>

          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-[#0B31BD]">
            Schäfer Tutoring
          </h2>
        </div>

        {/* Right: Notification + Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <button className="relative p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition">
            <Link href="/teacher/notification">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-700" />
            </Link>
            <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <div className="relative flex items-center gap-1.5 sm:gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full overflow-hidden border-2 border-[#0B31BD]">
              <div className="w-full h-full bg-[#0B31BD] flex items-center justify-center text-white font-bold text-sm sm:text-base lg:text-lg">
                J
              </div>
            </div>
            <div className="hidden sm:block">
              <h3 className="font-semibold text-sm lg:text-base">John Doe</h3>
              <p className="text-xs lg:text-sm">Tutor</p>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}