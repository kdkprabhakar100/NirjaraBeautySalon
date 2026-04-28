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
    <div className="group relative overflow-hidden rounded-3xl border border-[#E75480]/10 bg-[#FFF5F8] p-10 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#E75480]/30 hover:shadow-xl">
      <div className="absolute right-8 top-6 font-serif text-7xl font-bold text-[#E75480]/10">
        {number}
      </div>

      <h3 className="relative font-serif text-4xl text-[#3A2A2F]">{name}</h3>

      <div className="relative mt-6 space-y-3 text-sm leading-7 text-[#8A6F78]">
        <p>{address}</p>
        <p>{hours}</p>
        <p>{phone}</p>
      </div>

      <span className="relative mt-8 inline-block rounded-full bg-[#E75480] px-5 py-2 text-[10px] uppercase tracking-[3px] text-white">
        {tag}
      </span>
    </div>
  );
}