import BranchCard from "../../components/BranchCard";
import { branches } from "../../data/branches";

type BranchesProps = {
  setCurrentPage: (page: string) => void;
};

export default function Branches({ setCurrentPage }: BranchesProps) {
  return (
    <main className="min-h-screen bg-[#0F0D0A] px-6 pb-24 pt-36 text-[#F5F0E8] md:px-12">
      <section className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[4px] text-[#C9A84C]">
            Our Branches
          </p>

          <h1 className="mt-4 font-serif text-6xl font-light">
            Visit Our{" "}
            <span className="italic text-[#C9A84C]">Locations</span>
          </h1>

          <div className="mx-auto mt-8 h-[1px] w-20 bg-[#C9A84C]/60" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {branches.map((branch) => (
            <BranchCard key={branch.name} {...branch} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={() => setCurrentPage("Booking")}
            className="bg-[#C9A84C] px-10 py-4 text-xs font-medium uppercase tracking-[2px] text-[#0F0D0A] transition hover:bg-[#E8D5A3]"
          >
            Book at a Branch
          </button>
        </div>
      </section>
    </main>
  );
}