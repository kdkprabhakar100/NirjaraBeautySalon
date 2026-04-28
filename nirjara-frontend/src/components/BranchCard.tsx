type BranchCardProps = {
  number: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  tag: string;
};

export default function BranchCard({
  number,
  name,
  address,
  hours,
  phone,
  tag,
}: BranchCardProps) {
  return (
    <div className="group relative overflow-hidden border border-[#C9A84C]/10 bg-[#1A1713] p-10 transition duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/40 hover:bg-[#252119]">
      <div className="absolute right-8 top-6 font-serif text-7xl font-bold text-[#C9A84C]/10 transition group-hover:text-[#C9A84C]/20">
        {number}
      </div>

      <h3 className="relative font-serif text-4xl text-[#F5F0E8]">
        {name}
      </h3>

      <div className="relative mt-6 space-y-3 text-sm leading-7 text-[#A09070]">
        <p>{address}</p>
        <p>{hours}</p>
        <p>{phone}</p>
      </div>

      <span className="relative mt-8 inline-block border border-[#C9A84C]/30 px-5 py-2 text-[10px] uppercase tracking-[3px] text-[#C9A84C] transition group-hover:bg-[#C9A84C] group-hover:text-[#0F0D0A]">
        {tag}
      </span>
    </div>
  );
}