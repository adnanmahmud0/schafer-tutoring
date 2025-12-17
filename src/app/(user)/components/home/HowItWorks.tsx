"use client";

interface Heading {
  title: string;
  subtitle: string;
}

interface Card {
  step: string;
  title: string;
  description: string;
  image: string;
  bgColor: string;
}

export default function HowItWorks({
  heading,
  cards,
}: {
  heading: Heading;
  cards: Card[];
}) {
  return (
    <section className="bg-[#F7F7F7] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0B31BD] mb-2.5">
            {heading.title}
          </h2>
          <p className="text-[#061651] text-base sm:text-lg">
            {heading.subtitle}
          </p>
        </div>

        {/* -------------Mobile mode start---------------- */}
        <div
          className="md:hidden relative"
          style={{ height: `${cards.length * 520}px` }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className="sticky"
              style={{ top: `${96 + i * 130}px`, zIndex: i + 1 }}
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 w-[90vw] max-w-sm mx-auto h-[420px] flex flex-col overflow-hidden">
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
            </div>
          ))}
        </div>
        {/* -------------Mobile mode end---------------- */}

        {/* -------------Desktop mode start---------------- */}
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
        {/* -------------Desktop mode end---------------- */}
      </div>
    </section>
  );
}
