import ServiceCard from "../../components/ServiceCard";
import BranchCard from "../../components/BranchCard";
import { services } from "../../data/services";
import { branches } from "../../data/branches";
import Gallery from "../../components/Gallery";
import { useNavigate } from "react-router-dom";

type HomeProps = {
  setCurrentPage: (page: string) => void;
};

const stats = [
  { number: "12+", label: "Years of Excellence" },
  { number: "2", label: "Kathmandu Branches" },
  { number: "5K+", label: "Happy Clients" },
  { number: "200+", label: "Certified Graduates" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#FFF5F8] text-[#3A2A2F]">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(231,84,128,0.18),transparent_65%)]" />
        <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-[#FCE7EF] blur-3xl" />
        <div className="absolute -left-24 bottom-24 h-72 w-72 rounded-full bg-[#FADADD] blur-3xl" />

        <div className="relative z-10 max-w-4xl">
          <p className="mb-6 text-xs uppercase tracking-[4px] text-[#E75480]">
            Kathmandu&apos;s Premier Beauty Destination
          </p>

          <h1 className="font-serif text-6xl font-light leading-none md:text-8xl">
            Nirjara <br />
            <span className="italic text-[#E75480]">Beauty</span>
          </h1>

          <p className="mt-6 font-serif text-2xl italic text-[#8A6F78]">
            Salon & Academy — Where Beauty Meets Confidence
          </p>

          <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">
            <button
              onClick={() => navigate("/booking")}
              className="rounded-full bg-[#E75480] px-10 py-4 text-xs font-medium uppercase tracking-[2px] text-white shadow-lg transition hover:bg-[#C93D68]"
            >
              Book a Service
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 border-y border-[#E75480]/10 bg-white md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border-r border-[#E75480]/10 p-8 text-center"
          >
            <h2 className="font-serif text-4xl text-[#E75480]">
              {stat.number}
            </h2>
            <p className="mt-2 text-xs uppercase tracking-[2px] text-[#8A6F78]">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      <section className="px-6 py-24 md:px-12">
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[4px] text-[#E75480]">
            Our Services
          </p>

          <h2 className="mt-4 font-serif text-5xl font-light text-[#3A2A2F]">
            The Art of{" "}
            <span className="italic text-[#E75480]">Beautiful</span>
          </h2>

          <div className="mx-auto mt-6 h-[1px] w-16 bg-[#E75480]/50" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </section>

       <Gallery />

      <section className="bg-white px-6 py-24 md:px-12">
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[4px] text-[#E75480]">
            Our Branches
          </p>

          <h2 className="mt-4 font-serif text-5xl font-light text-[#3A2A2F]">
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