/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

// ---------- //
// Data block //
// ---------- //
const bannerData = {
  title: "Finde deinen Online-Tutor",
  description:
    "Einfach Fach angeben – wir verbinden dich mit der passenden Lehrkraft.",
  buttons: [
    { text: "Find Tutor", type: "primary", href: null },
    { text: "Free Trial", type: "secondary", href: "/free-trial-student" },
  ],
  image: "/images/home/girl-student.png",
  imageAlt: "/images/home/girl-student.png",
};

const Banner = () => {
  return (
    <div className="bg-linear-to-r from-[#2347CC] to-[#3A65FF] relative">
      <div className="max-w-7xl mx-auto h-full md:h-[749px] flex items-center relative px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {bannerData.title}
            </h1>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              {bannerData.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {bannerData.buttons.map((btn, idx) =>
                btn.href ? (
                  <Link key={idx} href={btn.href}>
                    <Button
                      className={`${
                        btn.type === "primary"
                          ? "bg-white hover:bg-gray-50 text-black"
                          : "border-2 w-full bg-transparent text-white"
                      } px-8 py-3 rounded-lg font-semibold transition-colors`}
                    >
                      {btn.text}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    key={idx}
                    className={`${
                      btn.type === "primary"
                        ? "bg-white hover:bg-gray-50 text-black"
                        : "border-2 w-full bg-transparent text-white"
                    } px-8 py-3 rounded-lg font-semibold transition-colors`}
                  >
                    {btn.text}
                  </Button>
                )
              )}
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden md:block absolute right-0 bottom-0">
            <img
              src="/images/home/bannerimg.png"
              alt="Girl student"
              className="w-[466px] h-full object-cover object-bottom"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
