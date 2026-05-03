import { useEffect, useState } from "react";
import ServiceCard from "../../components/ServiceCard";
import BranchCard from "../../components/BranchCard";
import { branches } from "../../data/branches";
import Gallery from "../../components/Gallery";
import { useNavigate } from "react-router-dom";

type Service = {
  _id?: string;
  icon?: string;
  title: string;
  description: string;
  price: string;
  category?: string;
  image?: string;
};

const stats = [
  { number: "12+", label: "Years of Excellence" },
  { number: "2", label: "Kathmandu Branches" },
  { number: "5K+", label: "Happy Clients" },
  { number: "200+", label: "Certified Graduates" },
];

export default function Home() {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);

  const fetchServices = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/services`);
      const data = await res.json();
      setServices(data.slice(0, 6));
    } catch (error) {
      console.error("Services fetch error:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <main className="min-h-screen bg-[#FFF5F8] text-[#3A2A2F]">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pt-28 text-center sm:px-6 md:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(231,84,128,0.18),transparent_65%)]" />
        <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-[#FCE7EF] blur-3xl" />
        <div className="absolute -left-24 bottom-24 h-72 w-72 rounded-full bg-[#FADADD] blur-3xl" />

        <div className="relative z-10 max-w-4xl">
          <p className="mb-5 text-[10px] uppercase tracking-[3px] text-[#E75480] sm:text-xs sm:tracking-[4px]">
            Kathmandu&apos;s Premier Beauty Destination
          </p>

          <h1 className="font-serif text-5xl font-light leading-none sm:text-6xl md:text-8xl">
            Nirjara <br />
            <span className="italic text-[#E75480]">Beauty</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg italic leading-8 text-[#8A6F78] sm:text-xl md:text-2xl">
            Salon & Academy — Where Beauty Meets Confidence
          </p>

          <div className="mt-10 flex justify-center">
            <button
              onClick={() => navigate("/booking")}
              className="rounded-full bg-[#E75480] px-8 py-4 text-xs font-medium uppercase tracking-[2px] text-white shadow-lg transition hover:bg-[#C93D68] sm:px-10"
            >
              Book a Service
            </button>
          </div>
        </div>
      </section>

      <section className="border-y border-[#E75480]/10 bg-white">
        <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-r border-[#E75480]/10 p-5 text-center md:p-8"
            >
              <h2 className="font-serif text-3xl text-[#E75480] md:text-4xl">
                {stat.number}
              </h2>

              <p className="mt-2 text-xs uppercase tracking-[2px] text-[#8A6F78]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-12 md:py-24">
        <div className="mb-14 text-center md:mb-16">
          <p className="text-xs uppercase tracking-[4px] text-[#E75480]">
            Our Services
          </p>

          <h2 className="mt-4 font-serif text-4xl font-light text-[#3A2A2F] md:text-5xl">
            The Art of{" "}
            <span className="italic text-[#E75480]">Beautiful</span>
          </h2>

          <div className="mx-auto mt-6 h-[1px] w-16 bg-[#E75480]/50" />
        </div>

        {services.length > 0 ? (
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service._id || service.title}
                title={service.title}
                description={service.description}
                price={service.price}
                icon={service.icon || "✦"}
                image={service.image || ""}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-[#8A6F78]">
            No services available yet.
          </p>
        )}
      </section>

      <Gallery />

      <section className="bg-white px-5 py-20 sm:px-6 md:px-12 md:py-24">
        <div className="mb-14 text-center md:mb-16">
          <p className="text-xs uppercase tracking-[4px] text-[#E75480]">
            Our Branches
          </p>

          <h2 className="mt-4 font-serif text-4xl font-light text-[#3A2A2F] md:text-5xl">
            Visit Us at{" "}
            <span className="italic text-[#E75480]">Your</span> Location
          </h2>

          <div className="mx-auto mt-8 h-[1px] w-20 bg-[#E75480]/50" />
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {branches.map((branch) => (
            <BranchCard key={branch.name} {...branch} />
          ))}
        </div>
      </section>
    </main>
  );
}