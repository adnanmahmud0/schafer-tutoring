"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function TutorPrice() {
  const [currentTutorIndex, setCurrentTutorIndex] = useState(0);

  const tutors = [
    {
      id: 1,
      name: "Luca",
      rating: 4.9,
      specialization: "Soziologie TU Berlin",
      image: "/luca.png",
    },
    {
      id: 2,
      name: "Diego",
      rating: 4.9,
      specialization: "Soziologie TU Berlin",
      image: "/diego.png",
    },
    {
      id: 3,
      name: "Yumi",
      rating: 5,
      specialization: "Soziologie TU Berlin",
      image: "/yumi.png",
    },
    {
      id: 4,
      name: "Lisa",
      rating: 5,
      specialization: "Soziologie TU Berlin",
      image: "/lisa.png",
    },
    {
      id: 5,
      name: "Alex",
      rating: 5,
      specialization: "Soziologie TU Berlin",
      image: "/luca.png",
    },
    {
      id: 6,
      name: "Maria",
      rating: 5,
      specialization: "Soziologie TU Berlin",
      image: "/diego.png",
    },
  ];

  const pricingPlans = [
    {
      id: 1,
      name: "Flexibel",
      pricePerHour: "30€",
      courseDuration: "Keine",
      selectedHours: "Anzahl wählbar",
      selectedHoursDetails: "Keine Mindestanzahl",
      termType: "Flexibel",
      inclusions: ["Kurzfristige Unterstützung", "Prüfungsvorbereitung"],
    },
    {
      id: 2,
      name: "Regelmäßig",
      pricePerHour: "28€",
      courseDuration: "1 Monat",
      selectedHours: "Anzahl wählbar",
      selectedHoursDetails: "Min. 4 Stunden pro Monat",
      termType: "Flexibel oder regelmäßig",
      inclusions: ["Unterstützung bei Hausaufgaben", "Unterrichtsbegleitung"],
    },
    {
      id: 3,
      name: "Langfristig",
      pricePerHour: "25€",
      courseDuration: "3 Monate",
      selectedHours: "Anzahl wählbar",
      selectedHoursDetails: "Min. 4 Stunden pro Monat",
      termType: "Flexibel oder regelmäßig",
      inclusions: ["Langfristige Unterstützung", "Grundlagenwiederholen"],
    },
  ];

  const cardWidth = 224; // w-48 + gap-6

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTutorIndex((prev) => (prev + 1) % tutors.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [tutors.length]);

  const handlePrevTutor = () => {
    setCurrentTutorIndex((prev) => (prev - 1 + tutors.length) % tutors.length);
  };

  const handleNextTutor = () => {
    setCurrentTutorIndex((prev) => (prev + 1) % tutors.length);
  };

  return (
    <section className="w-full">
      {/* Infinite Smooth Carousel */}
      <div className="mb-20 bg-[#FBFCFC] relative">
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <button
            onClick={handlePrevTutor}
            className="absolute left-2 md:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 
                      p-2 md:p-2.5 bg-white/95 hover:bg-white shadow-md hover:shadow-lg 
                      rounded-full transition-all hover:scale-110"
            aria-label="Previous"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-[#0B31BD]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={handleNextTutor}
            className="absolute right-2 md:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 
                      p-2 md:p-2.5 bg-white/95 hover:bg-white shadow-md hover:shadow-lg 
                      rounded-full transition-all hover:scale-110"
            aria-label="Next"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-[#0B31BD]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Carousel */}
          <div className="overflow-hidden">
            <div
              className="flex gap-6 md:gap-8 transition-transform duration-700 ease-in-out px-12 md:px-16"
              style={{
                transform: `translateX(-${currentTutorIndex * cardWidth}px)`,
              }}
            >
              {[...tutors, ...tutors].map((tutor, index) => (
                <div key={`${tutor.id}-${index}`} className="shrink-0">
                  <div className="border-2 border-[#4864CE] rounded-3xl md:rounded-4xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow">
                    <div className="w-48 h-48 md:w-56 md:h-64 lg:w-64 lg:h-72 relative">
                      <Image
                        src={tutor.image}
                        alt={tutor.name}
                        fill
                        className="object-cover rounded-3xl md:rounded-4xl"
                      />
                    </div>
                    <div className="py-4 px-3 text-center">
                      <h3 className="text-lg md:text-xl font-bold text-[#0B31BD]">
                        {tutor.name}
                      </h3>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <span className="text-sm md:text-base font-bold text-[#0B31BD]">
                          {tutor.rating}
                        </span>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 md:w-5 md:h-5 ${
                                i < Math.floor(tutor.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.962a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.962c.3.921-.755 1.688-1.538 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.783.57-1.838-.197-1.538-1.118l1.287-3.962a1 1 0 00-.364-1.118L2.335 9.39c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.962z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 mt-2">
                        {tutor.specialization}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-[#0B31BD] mb-4">Preise</h2>
          <p className="text-[#061651] text-lg">
            Flexible Tarife für jedes Lernziel, inklusive kostenloser
            Probestunde.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white border border-gray-200 p-3 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
            >
              <div className="bg-linear-to-r from-[#2563EB] via-[#3B82F6] to-[#6366F1] text-white px-4 py-2 rounded-lg mb-6">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500">Preis pro Stunde</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {plan.pricePerHour}
                  </p>
                  <hr className="my-2 text-[#F4F6F9] font-semibold" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Laufzeit</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {plan.courseDuration}
                  </p>
                  <hr className="my-2 text-[#F4F6F9] font-semibold" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Einheiten</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {plan.selectedHours}
                  </p>
                  <p className="text-sm text-gray-900 font-semibold mt-1">
                    {plan.selectedHoursDetails}
                  </p>
                  <hr className="my-2 text-[#F4F6F9] font-semibold" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Terminvereinbarung</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {plan.termType}
                  </p>
                  <hr className="my-2 text-[#F4F6F9] font-semibold" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Empfohlen für</p>
                  <ul className="mt-2 space-y-1">
                    {plan.inclusions.map((inclusion, idx) => (
                      <li
                        key={idx}
                        className="text-sm font-semibold text-gray-900"
                      >
                        • {inclusion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button className="bg-[#0B31BD] px-8 py-6 text-xl rounded-xl hover:bg-[#092A9E] text-white">
            Kostenlose Probestunde
          </Button>
        </div>
      </div>
    </section>
  );
}
