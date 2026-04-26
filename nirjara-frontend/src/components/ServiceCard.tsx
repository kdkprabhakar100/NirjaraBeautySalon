type ServiceCardProps = {
  icon: string;
  title: string;
  description: string;
  price: string;
};

export default function ServiceCard({
  icon,
  title,
  description,
  price,
}: ServiceCardProps) {
  return (
    <div className="group cursor-pointer bg-[#1A1713] p-10 transition hover:bg-[#252119]">
      <div className="mb-5 text-3xl text-[#C9A84C]">{icon}</div>

      <h3 className="font-serif text-2xl text-[#F5F0E8]">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-[#A09070]">
        {description}
      </p>

      <p className="mt-5 text-sm tracking-wide text-[#C9A84C]">{price}</p>

      <div className="mt-8 h-[1px] w-0 bg-[#C9A84C] transition-all duration-300 group-hover:w-full" />
    </div>
  );
}