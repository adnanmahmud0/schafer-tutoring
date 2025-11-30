// src/components/dashboard/TopNavbar.jsx
'use client';

import { Bell, Menu } from "lucide-react";
import { useState } from "react";
import MobileMenu from "./MobileMenu"; 

export default function TopNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="h-24 bg-white fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 md:px-6">
        
        {/* Left: Hamburger (mobile) + Page Title (always left) */}
        <div className="flex items-center gap-4">
          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          {/* Page Title - একদম লেফট সাইডে */}
          <h2 className="text-4xl font-bold text-[#0B31BD]">
            Schäfer Tutoring
          </h2>
        </div>

        {/* Right: Notification + Avatar */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
            <Bell className="w-7 h-7 text-gray-700" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <div className="relative flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#0B31BD]">
              <div className="w-full h-full bg-[#0B31BD] flex items-center justify-center text-white font-bold text-lg">
                J
              </div>
            </div>
            <div>
                <h3 className="font-semibold">John Doe</h3>
                <p>Tutor</p>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}