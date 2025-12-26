import Link from "next/link";
import PrimaryButton from "@/components/button/PrimaryButton";

const DesktopMenu = () => {
  return (
    <div className="hidden md:flex items-center gap-8 lg:gap-14">
      <Link
        href="/free-trial-teacher"
        className="text-[#0B31BD] text-lg font-medium hover:text-[#092A9E] transition-colors"
      >
        Become Tutor
      </Link>
      <PrimaryButton name={"Login"} href={"/login"} />
    </div>
  );
};

export default DesktopMenu;
