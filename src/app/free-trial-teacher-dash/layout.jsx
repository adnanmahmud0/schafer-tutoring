import Nav from "./components/Nav";

export default function FreeTrialLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <Nav />
      <div className="flex-1">{children}</div>
    </div>
  );
}
