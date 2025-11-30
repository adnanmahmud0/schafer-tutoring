// src/components/dashboard/MobileMenu.jsx
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, LayoutDashboard, FileText, MessageCircle, DollarSign, User, LogOut } from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/teacher/dashboard" },
  { icon: FileText,        label: "Requests", href: "/teacher/requests" },
  { icon: MessageCircle,   label: "Messages", href: "/teacher/messages" },
  { icon: DollarSign,      label: "Earnings", href: "/teacher/earnings" },
  { icon: User,            label: "Profile",  href: "/teacher/profile" },
];

export default function MobileMenu({ isOpen, onClose }) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 lg:hidden"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-[#0B31BD] text-white z-50 flex flex-col lg:hidden">
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-blue-900">
          <h1 className="text-2xl font-bold">LMS Tutor</h1>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}  // Close menu after click
                className={`flex items-center gap-3 px-4 py-4 rounded-lg transition-all ${
                  isActive
                    ? "bg-white text-[#0B31BD] font-semibold shadow-lg"
                    : "hover:bg-white/10"
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? "text-[#0B31BD]" : "text-white/80"}`} />
                <span className="text-lg">{item.label}</span>
                {isActive && <div className="ml-auto w-1 h-10 bg-white rounded-l-full"></div>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-blue-900">
          <button className="flex items-center gap-3 px-4 py-4 rounded-lg hover:bg-white/10 w-full text-lg">
            <LogOut className="w-6 h-6" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}