"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
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
    question: "How does online tutoring work?",
    answer:
      "Die Online-Nachhilfe funktioniert ganz einfach über unsere digitale Plattform...",
  },
  {
    question: "Which subjects and grade levels are offered?",
    answer: "Wir bieten Nachhilfe in allen gängigen Schulfächern an...",
  },
  {
    question: "How are tutors selected?",
    answer:
      "Unsere Tutoren verdienen je nach Erfahrung und Fach zwischen 25–45 € pro Stunde...",
  },
  {
    question: "Can sessions be rescheduled or cancelled?",
    answer:
      "Ja! Kostenfreie Stornierung ist bis 24 Stunden vor Unterrichtsbeginn möglich...",
  },
  {
    question: "How long is a typical lesson?",
    answer:
      "Sehr flexibel! Unterricht ist 7 Tage die Woche von 8:00 bis 22:00 Uhr möglich...",
  },
  {
    question: "What equipment is required?",
    answer:
      "Sehr flexibel! Unterricht ist 7 Tage die Woche von 8:00 bis 22:00 Uhr möglich...",
  },
  {
    question: "Can tutors be changed if needed?",
    answer:
      "Sehr flexibel! Unterricht ist 7 Tage die Woche von 8:00 bis 22:00 Uhr möglich...",
  },
];

export default function Testimonial() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [defaultActiveIndex, setDefaultActiveIndex] = useState(3);

  // Set default active index based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // phone
        setDefaultActiveIndex(1);
      } else {
        // tablet & desktop
        setDefaultActiveIndex(3);
      }
    };

    handleResize(); // set on load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Testimonial Section */}
      <section className="w-full bg-white">
        <div className="text-center space-y-10 md:space-y-12">
          <div className="max-w-7xl mx-auto mb-20">
            <Image
              src="/comma.svg"
              alt="quote"
              width={64}
              height={64}
              className="w-10 sm:w-16 md:w-24 -mb-6 md:-mb-8 sm:-ms-2 md:-ms-4"
            />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#000000] leading-tight px-4">
              Education has{" "}
              <span className="text-[#0B31BD]">transformed how I study.</span>{" "}
              The on-demand lessons save me{" "}
              <span className="text-[#0B31BD]">
                hours every week without losing
              </span>{" "}
              quality
            </h2>
          </div>

          {/* Testimonials Images */}
          <div className="py-8 mb-20">
            <div className="flex gap-6 md:gap-8 justify-center items-end flex-wrap">
              {testimonials.map((src, index) => {
                const isActive =
                  hoveredIndex !== null
                    ? hoveredIndex === index
                    : index === defaultActiveIndex;

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
                          ${
                            isActive
                              ? "blur-0 scale-100"
                              : "blur-in-2xl scale-95"
                          }
                        `}
                      />
                      {!isActive && <div className="absolute inset-0 bg-white/30" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#F7F7F7] py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-11">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B31BD]">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mt-[15px] text-base sm:text-lg">
              Everything you need to know about our online tutoring.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="bg-white rounded-[11px] shadow-sm border-2 border-[#85C2DE] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-gray-900 text-sm sm:text-base pr-4 text-left">
                      {faq.question}
                    </span>
                    <Plus
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
