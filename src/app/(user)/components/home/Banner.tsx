/* eslint-disable @next/next/no-img-element */
"use client";

import PrimaryButton from "@/components/button/PrimaryButton";

const bannerData = {
  title: "Find the online tutor that fits your needs",
  description: "Tell us what you need - we’ll find the perfect tutor for you.",
  buttons: [
    { text: "Select Subject", type: "primary", href: null },
    { text: "Book free trial", type: "secondary", href: "/free-trial-student" },
  ],
};

const Banner = () => {
  return (
    <div className="bg-linear-to-r from-[#0B31BD] to-[#4B71FF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto h-full md:h-[749px] flex items-center relative px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full py-12 md:py-0">

          {/* LEFT */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {bannerData.title}
            </h1>

            <p className="text-base sm:text-lg text-blue-100 leading-relaxed mb-10 md:mb-[77px]">
              {bannerData.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {bannerData.buttons.map((btn, idx) =>
                btn.href ? (
                  <PrimaryButton
                    key={idx}
                    className="bg-transparent border-2 hover:bg-transparent text-white w-full sm:w-auto min-w-[200px]"
                    name={btn.text}
                    href={btn.href}
                  />
                ) : (
                  <PrimaryButton
                    key={idx}
                    className="bg-white hover:bg-white text-[#150B20] w-full sm:w-auto min-w-[200px]"
                    name={btn.text}
                    href="/subjects"
                  />
                )
              )}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="hidden md:block absolute right-0 bottom-0">
            <img
              src="/images/home/bannerimg.png"
              alt="Girl student"
              className="w-[350px] lg:w-[466px] h-full object-cover object-bottom"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Banner;
