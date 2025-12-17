"use client";
import PrimaryButton from "@/components/button/PrimaryButton";

interface ApproachData {
  tag: string;
  description: string;
  image: string;
}

export default function Approach({ approach }: { approach: ApproachData }) {
  return (
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
          <p className="text-lg text-[#1F2D62] mb-8">{approach.description}</p>
          <div className="flex justify-center lg:justify-start">
            <PrimaryButton href="/free-trial-student" name="Find a tutor" />
          </div>
        </div>
      </div>
    </section>
  );
}
