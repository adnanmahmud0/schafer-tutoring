"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const testimonials = [
  "/frame1.png",
  "/frame2.png",
  "/frame3.png",
  "/frame4.png",
  "/frame5.png",
  "/frame6.png",
  "/frame7.png",
];

const faqs = [
  {
    question: "Wie funktioniert die Online-Nachhilfe?",
    answer:
      "Die Online-Nachhilfe funktioniert ganz einfach über unsere digitale Plattform. Nach der Anmeldung können Schüler eine passende Lehrkraft auswählen, einen Termin vereinbaren und die Sitzung direkt online via Video-Call abhalten. Die Lernumgebung ist interaktiv mit Whiteboard, Bildschirmfreigabe und Chat-Funktionen ausgestattet, um den Unterricht möglichst effektiv zu gestalten.",
  },
  {
    question: "Welche Fächer bieten Sie an?",
    answer:
      "Wir bieten Nachhilfe in allen gängigen Schulfächern an: Mathematik, Physik, Chemie, Biologie, Deutsch, Englisch, Französisch, Latein, Geschichte und viele mehr – von der Grundschule bis zum Abitur.",
  },
  {
    question: "Was verdient ein Tutor?",
    answer:
      "Unsere Tutoren verdienen je nach Erfahrung und Fach zwischen 25–45 € pro Stunde. Je mehr positive Bewertungen und abgeschlossene Stunden, desto höher steigt der Stundensatz automatisch.",
  },
  {
    question: "Kann ich Stunden kurzfristig absagen?",
    answer:
      "Ja! Kostenfreie Stornierung ist bis 24 Stunden vor Unterrichtsbeginn möglich. Danach wird eine Ausfallgebühr von 50 % fällig – so schützen wir die Zeit unserer Tutoren.",
  },
  {
    question: "Wie flexibel sind die Unterrichtszeiten?",
    answer:
      "Sehr flexibel! Unterricht ist 7 Tage die Woche von 8:00 bis 22:00 Uhr möglich – auch am Wochenende und in den Ferien. Du entscheidest selbst, wann du lernen möchtest.",
  },
];

export default function Testimonial() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Default center (index 3 for 7 images)
  const defaultActiveIndex = 3;

  return (
    <>
      {/* Testimonial Section */}
      <section className="w-full pt-16 md:pt-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-10 md:space-y-12">
            <Image
              src="/comma.svg"
              alt="quote"
              width={64}
              height={64}
              className="w-16 md:w-24 -mb-6 md:-mb-7 -ms-2 md:-ms-4"
            />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 leading-tight px-4">
              Education has{" "}
              <span className="text-[#0B31BD]">transformed how I study.</span>{" "}
              The on-demand lessons save me{" "}
              <span className="text-[#0B31BD]">
                hours every week without losing
              </span>{" "}
              quality
            </h2>

            {/* Static Images with Focus Effect */}
            <div className="py-8">
              <div className="flex gap-6 md:gap-8 justify-center items-end flex-wrap">
                {testimonials.map((src, index) => {
                  const isActive =
                    hoveredIndex !== null ? hoveredIndex === index : index === defaultActiveIndex;

                  return (
                    <div
                      key={`${src}-${index}`}
                      className="shrink-0 transition-all duration-500 ease-out group"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <div
                        className={`
                          w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36
                          rounded-2xl overflow-hidden relative
                          transition-all duration-500 ease-out
                          cursor-pointer
                          ${isActive ? "-translate-y-8" : "translate-y-0"}
                          ${isActive ? "shadow-xl" : ""}
                        `}
                      >
                        <Image
                          src={src}
                          alt="Student"
                          fill
                          className={`
                            object-cover transition-all duration-500
                            ${isActive ? "blur-0 scale-100" : "blur-in-2xl scale-95"}
                          `}
                        />
                        {/* Optional overlay for extra depth */}
                        {!isActive && (
                          <div className="absolute inset-0 bg-white/30" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#FBFCFC] py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B31BD]">
              Häufig gestellte Fragen
            </h2>
            <p className="text-gray-600 mt-3 text-base sm:text-lg">
              Alles, was du über unsere Nachhilfe wissen musst.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm border-2 border-[#85C2DE] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-gray-900 text-sm sm:text-base pr-4 text-left">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                    style={{
                      transition:
                        "max-height 0.5s ease-in-out, opacity 0.4s ease-in-out, padding 0.5s ease-in-out",
                    }}
                  >
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2">
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}