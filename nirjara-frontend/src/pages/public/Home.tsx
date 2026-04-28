import ServiceCard from "../../components/ServiceCard";
import { services } from "../../data/services";
import BranchCard from "../../components/BranchCard";
import { branches } from "../../data/branches";


type HomeProps = {
  setCurrentPage: (page: string) => void;
};

const stats = [
  { number: "12+", label: "Years of Excellence" },
  { number: "2", label: "Kathmandu Branches" },
  { number: "5K+", label: "Happy Clients" },
  { number: "200+", label: "Certified Graduates" },
];

export default function Home({ setCurrentPage }: HomeProps) {
  return (
    <main className="min-h-screen bg-[#0F0D0A] text-[#F5F0E8]">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.12),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(201,168,76,1)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,1)_1px,transparent_1px)] bg-[size:80px_80px]" />

        <div className="relative z-10">
          <p className="mb-6 text-xs uppercase tracking-[4px] text-[#C9A84C]">
            Kathmandu&apos;s Premier Beauty Destination
          </p>

          <h1 className="font-serif text-6xl font-light leading-none md:text-8xl">
            Nirjara <br />
            <span className="italic text-[#C9A84C]">Beauty</span>
          </h1>

          <p className="mt-6 font-serif text-2xl italic text-[#A09070]">
            Salon & Academy — Where Art Meets Elegance
          </p>

          <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">
            <button
              onClick={() => setCurrentPage("Booking")}
              className="bg-[#C9A84C] px-10 py-4 text-xs font-medium uppercase tracking-[2px] text-[#0F0D0A] transition hover:bg-[#E8D5A3]"
            >
              Book a Service
            </button>

            <button
              onClick={() => setCurrentPage("Services")}
              className="border border-[#C9A84C]/50 px-10 py-4 text-xs uppercase tracking-[2px] text-[#C9A84C] transition hover:border-[#C9A84C]"
            >
              Explore Services
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 border-y border-[#C9A84C]/20 bg-[#1A1713] md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border-r border-[#C9A84C]/10 p-8 text-center"
          >
            <h2 className="font-serif text-4xl text-[#C9A84C]">
              {stat.number}
            </h2>
            <p className="mt-2 text-xs uppercase tracking-[2px] text-[#A09070]">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      <section className="bg-[#0F0D0A] px-6 py-24 md:px-12">
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[4px] text-[#C9A84C]">
            Our Branches
          </p>

          <h2 className="mt-4 font-serif text-5xl font-light text-[#F5F0E8]">
            Visit Us at{" "}
            <span className="italic text-[#C9A84C]">Your</span> Location
          </h2>

          <div className="mx-auto mt-8 h-[1px] w-20 bg-[#C9A84C]/60" />
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