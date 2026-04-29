import { useEffect, useState } from "react";

type Service = {
  _id: string;
  title: string;
};

type Branch = {
  name: string;
};

const branches: Branch[] = [
  { name: "Teku Branch" },
  { name: "Chabahil Branch" },
];

export default function Booking() {
  const [services, setServices] = useState<Service[]>([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [branch, setBranch] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const booking = {
      name,
      phone,
      service,
      branch,
      date,
      time,
    };

    setLoading(true);

    await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    });

    setLoading(false);

    alert("Booking submitted successfully!");

    setName("");
    setPhone("");
    setService("");
    setBranch("");
    setDate("");
    setTime("");
  };

  return (
    <main className="min-h-screen bg-[#FFF5F8] px-6 pb-24 pt-36 text-[#3A2A2F] md:px-12">
      <section className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[4px] text-[#E75480]">
            Book Now
          </p>

          <h1 className="mt-4 font-serif text-6xl font-light">
            Book Your{" "}
            <span className="italic text-[#E75480]">Appointment</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#8A6F78]">
            Select your service, preferred branch, date, and time. Our team will
            contact you shortly to confirm your appointment.
          </p>

          <div className="mx-auto mt-8 h-[1px] w-20 bg-[#E75480]/50" />
        </div>

        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="font-serif text-4xl text-[#E75480]">
              How Booking Works
            </h2>

            <div className="mt-8 space-y-6">
              {[
                "Choose your service",
                "Select preferred branch",
                "Pick date and time",
                "Submit your contact details",
              ].map((step, index) => (
                <div key={step} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FCE7EF] text-sm font-semibold text-[#E75480]">
                    {index + 1}
                  </div>
                  <p className="pt-2 text-[#8A6F78]">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white p-8 shadow-sm"
          >
            <div className="grid gap-5">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none"
              />

              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                required
                className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none"
              >
                <option value="">Select Service</option>
                {services.map((item) => (
                  <option key={item._id} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>

              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                required
                className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none"
              >
                <option value="">Select Branch</option>
                {branches.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>

              <div className="grid gap-5 md:grid-cols-2">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none"
                />

                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none"
                />
              </div>

              <button
                disabled={loading}
                className="rounded-full bg-[#E75480] px-8 py-4 text-xs font-medium uppercase tracking-[2px] text-white shadow-lg transition hover:bg-[#C93D68] disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Confirm Booking"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}