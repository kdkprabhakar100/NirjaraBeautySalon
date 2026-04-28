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
    <main className="min-h-screen bg-[#FFF5F8] px-6 pb-24 pt-36 text-[#3A2A2F] md:px-12">
      <section className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[4px] text-[#E75480]">
            What We Offer
          </p>

          <h1 className="mt-4 font-serif text-6xl font-light">
            Our <span className="italic text-[#E75480]">Services</span>
          </h1>

          <div className="mx-auto mt-8 h-[1px] w-20 bg-[#E75480]/50" />
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[2px] transition ${
                activeCategory === category
                  ? "border-[#E75480] bg-[#E75480] text-white"
                  : "border-[#E75480]/30 bg-white text-[#8A6F78] hover:border-[#E75480] hover:text-[#E75480]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {filteredServices.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={() => setCurrentPage("Booking")}
            className="rounded-full bg-[#E75480] px-10 py-4 text-xs font-medium uppercase tracking-[2px] text-white shadow-lg transition hover:bg-[#C93D68]"
          >
            Book Any Service
          </button>
        </div>
      </section>
    </main>
  );
}