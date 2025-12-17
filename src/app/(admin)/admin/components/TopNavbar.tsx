// src/components/dashboard/TopNavbar.tsx
'use client';

import { Bell, Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import MobileMenu from "@/components/dashboard/MobileMenu";

export default function TopNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="h-20 md:h-24 bg-white fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-3 sm:px-4 md:px-6">
        
        {/* Left: Hamburger (mobile) + Page Title */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#0B31BD] whitespace-nowrap">
            Schäfer Tutoring
          </h2>
        </div>

        {/* Right: Notification + Avatar */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
            <Link href="/admin/notification">
              <Bell className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700" />
            </Link>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <div className="relative flex items-center gap-2">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-[#0B31BD]">
              <div className="w-full h-full bg-[#0B31BD] flex items-center justify-center text-white font-bold text-base sm:text-lg">
                J
              </div>
            </div>

            {/* Hide text on mobile */}
            <div className="hidden sm:block">
              <h3 className="font-semibold leading-tight">John Doe</h3>
              <p className="text-sm text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
