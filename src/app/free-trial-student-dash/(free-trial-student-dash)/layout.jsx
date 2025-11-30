import Nav from "../components/Nav";


export default function FreeTrialLayout({
  children,
}) {
  return (
<>
        <Nav></Nav>
        <main className="flex-1">
          {children}
        </main>
    </>
  );
}