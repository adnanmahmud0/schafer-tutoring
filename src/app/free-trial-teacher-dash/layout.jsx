import Nav from "./components/Nav";

export default function FreeTrialLayout({
  children,
}) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-[#FFFFFF]">
        <Nav></Nav>
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}