import React from "react";
import Banner from "./components/home/Banner";
import Funcard from "./components/home/Funcard";
import TutorPrice from "./components/home/TutorPrice";
import Testimonial from "./components/home/Testimonial";

export default function page() {
  return (
    <>
      <div>
        <section>
          <Banner />
        </section>
        <section>
          <Funcard />
        </section>
        <section>
          <TutorPrice />
        </section>
        <section>
          <Testimonial />
        </section>
      </div>
    </>
  );
}
