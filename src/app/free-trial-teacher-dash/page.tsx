"use client";

import dynamic from "next/dynamic";

const TeacherDash = dynamic(
  () => import("./components/Page1"), // Uses Page1.tsx (TSX version)
  { ssr: false }
);

export default function Page() {
  return <TeacherDash />;
}
