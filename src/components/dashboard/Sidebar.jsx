// src/components/dashboard/Sidebar.jsx
'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Overview", href: "/dashboard" },
  { label: "Requests", href: "/requests" },
  { label: "Messages", href: "/messages" },
  { label: "Earnings", href: "/earnings" },
  { label: "Profile",  href: "/profile" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[328px] h-full bg-white flex flex-col">

      {/* Centered Menu Items (248px width) */}
      <nav className="flex-1 flex flex-col items-center py-5 space-y-4">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-64 px-8 py-4 rounded-xl text-lg font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#002AC8] text-white shadow-xl"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      

<div className="p-6">
    <h2 className="w-64 px-10 mb-5 cursor-pointer py-4">Support</h2>
  <button className="w-full max-w-md flex items-center justify-start gap-2 px-10 py-4 bg-[#FF8A00] hover:bg-[#ee8607] text-white text-lg font-semibold rounded-xl active:scale-95 transition-all duration-200">
    {/* Logout Icon */}
      <Image 
        width={24} 
        height={24} 
        src="/logout.svg" 
        alt="Logout" 
        className="w-6 h-6"
      />
    {/* Text */}
    <span>Logout</span>
  </button>
</div>
    </aside>
  );
}