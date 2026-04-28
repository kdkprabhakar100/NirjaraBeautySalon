import { useState } from "react";
import ServiceCard from "../../components/ServiceCard";
import { services } from "../../data/services";

const categories = ["All", "Hair", "Skin", "Bridal", "Nails", "Spa", "Academy"];

type ServicesProps = {
  setCurrentPage: (page: string) => void;
};

export default function Services({ setCurrentPage }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices =
    activeCategory === "All"
      ? services
      : services.filter((service) => service.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#0F0D0A] px-6 pb-24 pt-36 text-[#F5F0E8] md:px-12">
      <section className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[4px] text-[#C9A84C]">
            What We Offer
          </p>

          <h1 className="mt-4 font-serif text-6xl font-light">
            Our <span className="italic text-[#C9A84C]">Services</span>
          </h1>

          <div className="mx-auto mt-8 h-[1px] w-20 bg-[#C9A84C]/60" />
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`border px-5 py-2 text-xs uppercase tracking-[2px] transition ${
                activeCategory === category
                  ? "border-[#C9A84C] bg-[#C9A84C] text-[#0F0D0A]"
                  : "border-[#C9A84C]/30 text-[#A09070] hover:border-[#C9A84C] hover:text-[#C9A84C]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-[2px] md:grid-cols-3">
          {filteredServices.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={() => setCurrentPage("Booking")}
            className="bg-[#C9A84C] px-10 py-4 text-xs font-medium uppercase tracking-[2px] text-[#0F0D0A] transition hover:bg-[#E8D5A3]"
          >
            Book Any Service
          </button>
        </div>
      </section>
    </main>
  );
}