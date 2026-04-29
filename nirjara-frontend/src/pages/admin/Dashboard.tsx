export default function Dashboard() {
  const stats = [
    { label: "Total Bookings", value: "24" },
    { label: "Pending Bookings", value: "6" },
    { label: "Services", value: "12" },
    { label: "Gallery Photos", value: "8" },
  ];

  return (
    <div>
      <h1 className="font-serif text-5xl text-[#E75480]">Dashboard</h1>
      <p className="mt-2 text-[#8A6F78]">Welcome to Nirjara admin panel.</p>

      <div className="mt-10 grid gap-6 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-[#8A6F78]">{stat.label}</p>
            <h2 className="mt-3 font-serif text-4xl text-[#E75480]">
              {stat.value}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}