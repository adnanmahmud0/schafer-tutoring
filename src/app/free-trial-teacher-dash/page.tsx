"use client";

import dynamic from "next/dynamic";

const TeacherDash = dynamic(
  () => import("./components/Page1"), // or Page2 / main component
  { ssr: false }
);

export default function Page() {
  return <TeacherDash />;
}
