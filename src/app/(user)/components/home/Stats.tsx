"use client";

interface Stat {
  value: string;
  label: string;
}

export default function Stats({ stats }: { stats: Stat[] }) {
  return (
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
  );
}
