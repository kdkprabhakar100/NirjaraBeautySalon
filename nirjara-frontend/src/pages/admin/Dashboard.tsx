import { useEffect, useState } from "react";

type Stats = {
  services: number;
  gallery: number;
  courses: number;
  bookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/stats`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
      .then((res) => res.json())
      .then(setStats);
  }, []);

  if (!stats) return <p className="text-[#8A6F78]">Loading dashboard...</p>;

  const cards = [
    ["Services", stats.services],
    ["Bookings", stats.bookings],
    ["Pending", stats.pendingBookings],
    ["Confirmed", stats.confirmedBookings],
    ["Cancelled", stats.cancelledBookings],
    ["Gallery Photos", stats.gallery],
    ["Courses", stats.courses],
  ];

  return (
    <div>
      <h1 className="font-serif text-5xl text-[#E75480]">Dashboard</h1>
      <p className="mt-2 text-[#8A6F78]">
        Live overview from database.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-4">
        {cards.map(([label, value]) => (
          <div key={label} className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-[#8A6F78]">{label}</p>
            <h2 className="mt-3 font-serif text-4xl text-[#E75480]">
              {value}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}