/* eslint-disable @next/next/no-img-element */
"use client";

import PrimaryButton from "@/components/button/PrimaryButton";

export default function Funcard() {
  const data = {
    stats: [
      { value: "94%", label: "Success Rate" },
      { value: "2500+", label: "Learning Materials" },
      { value: "4.8/5 ", label: "Satisfaction" },
    ],
    heading: {
      title: "How it works",
      subtitle: "Define your learning needs - we’ll match you with the right tutor.",
    },
    cards: [
      {
        step: "1.",
        title: "Send your request",
        description:
          "Tell us the subject you need help with and when you’re available.",
        image: "/boy1.png",
        bgColor: "bg-[#8396DE]",
        imageClass: "h-full w-auto object-contain",
      },
      {
        step: "2.",
        title: "Meet your tutor",
        description: "We connect you with a suitable tutor based on your goals.",
        image: "/girl1.png",
        bgColor: "bg-[#83C1DE]",
        imageClass: "w-full h-full object-cover",
      },
      {
        step: "3.",
        title: "Start learning",
        description: "Improve your grades and build confidence.",
        image: "/girl2.png",
        bgColor: "bg-[#6490F8]",
        imageClass: "object-cover",
      },
    ],
    approach: {
      tag: "Our Approach",
      description:
        `We match you with a tutor who listens, understands your goals, and adapts to your learning style.
        With a personalized learning plan, grades improve faster and confidence grows with every lesson.`,
      buttonText: "Find a Tutor",
      image: "/boy2.png",
    },
  };

  const { stats, heading, cards, approach } = data;

  return (
    <>
      {/* Stats + Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        {/* Stats */}
        <div className="flex justify-between items-center h-[150px]">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-xl md:text-2xl font-bold text-[#0B31BD]">
                {stat.value}
              </p>
              <p className="text-sm md:text-2xl text-[#0B85BD] font-bold mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-[#F7F7F7] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center px-4 mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0B31BD] mb-2.5">
              {heading.title}
            </h2>
            <p className="text-[#061651] text-base sm:text-lg">
              {heading.subtitle}
            </p>
          </div>
        {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {cards.map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-[420px] md:h-[467px]"
              >
                {/* Text Part */}
                <div className="p-6 pt-8 flex flex-col justify-start flex-1">
                  <p className="bg-linear-to-r from-[#0B31BD] to-[#B0BEF2] bg-clip-text text-transparent font-bold text-3xl mb-3">
                    {card.step}
                  </p>
                  <h3 className="text-2xl font-bold text-[#313030] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[#1F2D62] text-lg leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Image + Color Block */}
                <div className="relative w-full h-[200px]">
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-[138px] ${card.bgColor}`}
                  ></div>
                  <img
                    src={card.image || "/placeholder.svg"}
                    alt={card.title}
                    className="absolute bottom-0 flex justify-self-center h-[230px] lg:h-[260px] w-auto object-contain z-10"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section – Responsive */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:my-20 lg:my-0 lg:px-8 h-[864px] md:h-[764px] lg:h-[564px] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
            <img
              src={approach.image}
              alt="Student"
              className="w-full md:w-[455px] md:h-[444px]"
            />
          </div>

          {/* Right Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <p className="text-[#061651] text-[16px] tracking-wide -mb-1">
              {approach.tag}
            </p>
            <h2 className="text-3xl sm:text-[44px] font-bold text-[#0B31BD] leading-tight mb-[21px]">
              Personal, <span className="text-[#0B85BD]">individual</span>
            </h2>
            <p className="text-[#1F2D62] text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
              {approach.description}
            </p>
            <PrimaryButton className="flex justify-self-center lg:justify-self-start" href="/find" name="Find a tutor"/>
          </div>
        </div>
      </section>
    </>
  );
}
