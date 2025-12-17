// src/components/dashboard/Sidebar.tsx
'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Overview", href: "/teacher/overview" },
  { label: "Requests", href: "/teacher/requests" },
  { label: "Messages", href: "/teacher/messages" },
  { label: "Resources", href: "/teacher/resources" },
  { label: "Earnings", href: "/teacher/earnings" },
  { label: "Profile",  href: "/teacher/profile" },
];

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-56 lg:w-[328px] h-full bg-white flex flex-col overflow-y-auto">

      {/* Centered Menu Items */}
      <nav className="flex-1 flex flex-col items-center py-3 sm:py-4 lg:py-5 space-y-2 sm:space-y-3 lg:space-y-4">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full max-w-[240px] sm:max-w-[220px] md:max-w-[200px] lg:w-64 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl text-base sm:text-lg font-medium transition-all duration-200 ${
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
      

<div className="p-3 sm:p-4 lg:p-6">
    {/* Support Link */}
  {(() => {
    const isActive = pathname.startsWith("/teacher/support");

    return (
      <Link
        href="/teacher/support"
        className={`w-full max-w-[240px] sm:max-w-[220px] md:max-w-[200px] lg:w-64 px-4 sm:px-6 lg:px-10 mb-3 sm:mb-4 lg:mb-5 text-base sm:text-lg font-medium cursor-pointer py-2.5 sm:py-3 lg:py-4 block rounded-lg sm:rounded-xl transition-all duration-200 ${
          isActive
            ? "bg-[#002AC8] text-white shadow-xl"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        Support
      </Link>
    );
  })()}
  <button className="w-full max-w-[240px] sm:max-w-[220px] md:max-w-[200px] lg:w-64 flex items-center justify-start gap-2 px-4 sm:px-6 lg:px-10 py-2.5 sm:py-3 lg:py-4 bg-[#FF8A00] hover:bg-[#ee8607] text-white text-base sm:text-lg font-semibold rounded-lg sm:rounded-xl active:scale-95 transition-all duration-200">
    {/* Logout Icon */}
      <Image 
        width={24} 
        height={24} 
        src="/logout.svg" 
        alt="Logout" 
        className="w-5 h-5 sm:w-6 sm:h-6"
      />
    {/* Text */}
    <span>Logout</span>
  </button>
</div>
    </aside>
  );
}

export default Sidebar;