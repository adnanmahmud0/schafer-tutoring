"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  LayoutDashboard,
  FileText,
  MessageCircle,
  DollarSign,
  User,
  LogOut,
  BookOpen,
  Headset as headset,
} from "lucide-react";

/* ================= TYPES ================= */

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ================= MENU DATA ================= */

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/teacher/overview" },
  { icon: FileText, label: "Requests", href: "/teacher/requests" },
  { icon: MessageCircle, label: "Messages", href: "/teacher/messages" },
  { icon: BookOpen, label: "Resources", href: "/teacher/resources" },
  { icon: DollarSign, label: "Earnings", href: "/teacher/earnings" },
  { icon: headset, label: "Support", href: "/teacher/support" },
];

/* ================= COMPONENT ================= */

export default function MobileMenuTutor({ isOpen, onClose }: MobileMenuProps) {
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
      <div className="fixed inset-y-0 left-0 w-72 sm:w-80 max-w-[85vw] bg-[#0B31BD] text-white z-50 flex flex-col lg:hidden">
        {/* Header */}
        <div className="h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6 border-b border-blue-900">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold truncate">
            Schäfer Tutoring
          </h1>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg flex-shrink-0"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 sm:px-4 py-4 sm:py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-3 sm:py-4 rounded-lg transition-all ${
                  isActive
                    ? "bg-white text-[#0B31BD] font-semibold shadow-lg"
                    : "hover:bg-white/10"
                }`}
              >
                <Icon
                  className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 ${
                    isActive ? "text-[#0B31BD]" : "text-white/80"
                  }`}
                />
                <span className="text-base sm:text-lg">{item.label}</span>

                {isActive && (
                  <div className="ml-auto w-1 h-8 sm:h-10 bg-white rounded-l-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 sm:p-4 border-t border-blue-900">
          <button
            type="button"
            className="flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-3 sm:py-4 rounded-lg hover:bg-white/10 w-full text-base sm:text-lg"
          >
            <LogOut className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
