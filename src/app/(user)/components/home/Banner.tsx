/* eslint-disable @next/next/no-img-element */
"use client";

import PrimaryButton from "@/components/button/PrimaryButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// ---------- //
// Data block //
// ---------- //
const bannerData = {
  title: "Find the online tutor that fits your needs",
  description: "Tell us what you need - we’ll find the perfect tutor for you.",
  buttons: [
    { text: "Select Subject", type: "primary", href: null },
    { text: "Book free trial", type: "secondary", href: "/free-trial-student" },
  ],
  image: "/images/home/girl-student.png",
  imageAlt: "/images/home/girl-student.png",
};

const Banner = () => {
  return (
    <div className="bg-linear-to-r from-[#0B31BD] to-[#4B71FF] relative">
      <div className="max-w-7xl mx-auto h-full md:h-[749px] flex items-center relative px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {bannerData.title}
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed mb-[77px]">
              {bannerData.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {bannerData.buttons.map((btn, idx) =>
                btn.href ? (
                  <PrimaryButton className="bg-transparent border-2 hover:bg-transparent text-white" key={idx} name={btn.text} href={btn.href} />
                ) : (
                  <PrimaryButton className="bg-white hover:bg-white text-[#150B20]" key={idx} name={btn.text} href={"/subjects"} />
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
