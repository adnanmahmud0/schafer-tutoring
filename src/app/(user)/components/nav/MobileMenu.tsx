import Link from "next/link";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  closeMenu: () => void;
}

const MobileMenu = ({ isOpen, closeMenu }: MobileMenuProps) => {
  return (
    <div
      className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="py-6 space-y-4 border-t border-gray-200">
        <Link
          href="/free-trial-teacher"
          onClick={closeMenu}
          className="block px-4 py-3 text-lg font-medium text-gray-800 hover:text-[#0B31BD] hover:bg-blue-50 rounded-lg transition mx-2"
        >
          Become Tutor
        </Link>

        <div className="px-4 pt-2">
          <Link href="/login">
            <Button
            onClick={closeMenu}
            className="w-full bg-[#0B31BD] hover:bg-[#092A9E] text-white font-semibold text-lg py-6 rounded-xl shadow-lg"
          >
            Login
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
