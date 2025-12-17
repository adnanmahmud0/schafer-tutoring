/* eslint-disable @next/next/no-img-element */
"use client";

import PrimaryButton from "@/components/button/PrimaryButton";
import { motion } from "framer-motion";
// Removed: import { ReactLenis } from "lenis/react";

export default function Funcard() {
  const data = {
    stats: [
      { value: "94%", label: "Success Rate" },
      { value: "2500+", label: "Learning Materials" },
      { value: "4.8/5 ", label: "Satisfaction" },
    ],
    heading: {
      title: "How it works",
      subtitle:
        "Define your learning needs - we'll match you with the right tutor.",
    },
    cards: [
      {
        step: "1.",
        title: "Send your request",
        description:
          "Tell us the subject you need help with and when you're available.",
        image: "/boy1.png",
        bgColor: "bg-[#8396DE]",
      },
      {
        step: "2.",
        title: "Meet your tutor",
        description:
          "We connect you with a suitable tutor based on your goals.",
        image: "/girl1.png",
        bgColor: "bg-[#83C1DE]",
      },
      {
        step: "3.",
        title: "Start learning",
        description: "Improve your grades and build confidence.",
        image: "/girl2.png",
        bgColor: "bg-[#6490F8]",
      },
    ],
    approach: {
      tag: "Our Approach",
      description: `We match you with a tutor who listens, understands your goals, and adapts to your learning style.
      With a personalized learning plan, grades improve faster and confidence grows with every lesson.`,
      image: "/boy2.png",
    },
  };

  const { stats, heading, cards, approach } = data;

  return (
    <>
      {/* ================= STATS ================= */}
      <section className="max-w-7xl mx-auto px-4 py-8 md:py-12 bg-white">
        <div className="flex justify-between">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-xl md:text-2xl font-bold text-[#0B31BD]">
                {stat.value}
              </p>
              <p className="text-sm md:text-2xl font-bold text-[#0B85BD] mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-[#F7F7F7] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0B31BD] mb-2.5">
              {heading.title}
            </h2>
            <p className="text-[#061651] text-base sm:text-lg">
              {heading.subtitle}
            </p>
          </div>

          {/* ================= MOBILE: Now normal vertical layout ================= */}
          <div className="md:hidden flex flex-col gap-8">
            {cards.map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 w-[90vw] max-w-sm mx-auto h-[420px] flex flex-col overflow-hidden"
              >
                {/* Text */}
                <div className="p-6 pt-8 flex-1">
                  <p className="relative z-20 bg-linear-to-r from-[#0B31BD] to-[#B0BEF2] bg-clip-text text-transparent font-bold text-3xl mb-3">
                    {card.step}
                  </p>
                  <h3 className="text-2xl font-bold text-[#313030] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[#1F2D62] text-lg leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Image */}
                <div className="relative h-[200px]">
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-[138px] ${card.bgColor}`}
                  />
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[230px] z-10"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ================= DESKTOP GRID ================= */}
          <div className="hidden md:grid md:grid-cols-3 gap-10">
            {cards.map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-[467px]"
              >
                <div className="p-6 pt-8 flex-1">
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
                <div className="relative h-[200px]">
                  <div
                    className={`absolute rounded-b-xl bottom-0 left-0 right-0 h-[138px] ${card.bgColor}`}
                  />
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[260px] z-10"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= APPROACH ================= */}
      <section className="max-w-6xl mx-auto px-4 my-20 flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <img
            src={approach.image}
            alt="student"
            className="order-2 lg:order-1 w-full max-w-md mx-auto"
          />
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <p className="text-[#061651] mb-1">{approach.tag}</p>
            <h2 className="text-4xl font-bold text-[#0B31BD] mb-4">
              Personal <span className="text-[#0B85BD]">individual</span>
            </h2>
            <p className="text-lg text-[#1F2D62] mb-8">
              {approach.description}
            </p>
            <div className="flex justify-center lg:justify-start">
              <PrimaryButton href="/free-trial-student" name="Find a tutor" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}