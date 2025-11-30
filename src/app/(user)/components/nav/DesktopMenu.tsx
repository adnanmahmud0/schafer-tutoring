import Link from "next/link";
import { Button } from "@/components/ui/button";

const DesktopMenu = () => {
  return (
    <div className="hidden md:flex items-center gap-8 lg:gap-14">
      <Link
        href="/free-trial-teacher"
        className="text-[#0B31BD] text-lg lg:text-xl font-medium hover:text-[#092A9E] transition-colors"
      >
        Lehrer werden
      </Link>
      <Button className="bg-[#0B31BD] hover:bg-[#092A9E] text-white font-semibold rounded-[12px] text-lg px-8 py-6  shadow-lg hover:shadow-xl transition-all duration-300">
        Anmelden
      </Button>
    </div>
  );
};

export default DesktopMenu;
