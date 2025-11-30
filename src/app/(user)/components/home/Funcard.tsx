/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";

export default function Funcard() {
  const data = {
    stats: [
      { value: "94%", label: "Erfolgsrate" },
      { value: "2500+", label: "Materialien" },
      { value: "3,40", label: "Stunden/Monat" }
    ],
    heading: {
      title: "So funktioniert's",
      subtitle: "Lernerfolg definieren, wir finden deine passende Lernkraft."
    },
    cards: [
      {
        step: "1.",
        title: "To request",
        description: "Tell us which subject you need help with and when you're available.",
        image: "/boy1.png",
        bgColor: "bg-[#FFC2E2]",
        imageClass: "h-full w-auto object-contain",
      },
      {
        step: "2.",
        title: "To get to know",
        description: "We'll connect you with the right teacher.",
        image: "/girl1.png",
        bgColor: "bg-[#FFE8AF]",
        imageClass: "w-full h-full object-cover"
      },
      {
        step: "3.",
        title: "Get started",
        description: "Improve your grades and build confidence.",
        image: "/girl2.png",
        bgColor: "bg-[#9AEAC0]",
        imageClass: "object-cover"
      }
    ],
    approach: {
      tag: "Unser Ansatz",
      description: "Wir finden den passenden Lehrer– jemand, der zuhört, versteht und den Lernstil berücksichtigt. Mit einem individuellen Lernplan verbessern sich Noten schneller, und das Selbstvertrauen im Unterricht wächst.",
      buttonText: "Tutor finden",
      image: "/boy2.png"
    }
  };

  const { stats, heading, cards, approach } = data;

  return (
    <>
      {/* Stats + Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-xl md:text-4xl font-bold text-[#0B31BD]">{stat.value}</p>
              <p className="text-sm md:text-3xl text-[#0B85BD] font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Heading */}
        <div className="text-center mb-16 lg:mb-20 px-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0B31BD] mb-4">{heading.title}</h2>
          <p className="text-[#061651] text-base sm:text-lg max-w-3xl mx-auto">{heading.subtitle}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-[440px]"
            >
              {/* Text Part */}
              <div className="p-6 pt-8 flex flex-col justify-start flex-1">
                <p className="text-blue-600 font-bold text-2xl mb-3">{card.step}</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{card.title}</h3>
                <p className="text-gray-600 text-xl leading-relaxed">{card.description}</p>
              </div>

              {/* Image + Color Block */}
              <div className="relative w-full h-[200px]">
                <div className={`absolute bottom-0 left-0 right-0 h-[138px] ${card.bgColor}`}></div>
                <img
                  src={card.image || "/placeholder.svg"}
                  alt={card.title}
                  className="absolute bottom-0 right-4 h-full w-auto object-contain z-10"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Approach Section – Responsive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Image – Mobile এ উপরে, Desktop এ বামে */}
          <div className="order-1 lg:order-1 flex justify-center lg:justify-start">
            <img
              src={approach.image}
              alt="Student"
              className=" w-full max-w-md lg:max-w-lg xl:w-[600px] h-auto"
            />
          </div>

          {/* Right Content */}
          <div className="order-2 lg:order-2 text-center lg:text-left">
            <p className="text-[#061651] text-lg tracking-wide mb-4">{approach.tag}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B31BD] leading-tight">
              Erfahrene Tutoren,
            </h2>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B85BD] mb-6 leading-tight">
              persönlich & <br className="hidden sm:block" /> individuell
            </h2>
            <p className="text-[#1F2D62] text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
              {approach.description}
            </p>
            <Button className="bg-[#0B31BD] w-full sm:w-52 px-8 py-6 text-lg rounded-xl hover:bg-[#092A9E] text-white">
              {approach.buttonText}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}