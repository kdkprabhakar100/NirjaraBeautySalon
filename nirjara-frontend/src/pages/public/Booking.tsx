import { useEffect, useState } from "react";

type Service = {
  _id: string;
  title: string;
};

type Course = {
  _id: string;
  title: string;
};

const branches = [{ name: "Teku Branch" }, { name: "Chabahil Branch" }];

export default function Booking() {
  const [services, setServices] = useState<Service[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  const [type, setType] = useState("service");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [branch, setBranch] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data));

    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));

    const savedType = localStorage.getItem("bookingType");
    const savedCourse = localStorage.getItem("selectedCourse");

    if (savedType === "course") {
      setType("course");
    }

    if (savedCourse) {
      setSelectedItem(savedCourse);
    }

    localStorage.removeItem("bookingType");
    localStorage.removeItem("selectedCourse");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        type,
        service: type === "service" ? selectedItem : "",
        course: type === "course" ? selectedItem : "",
        branch,
        date,
        time,
      }),
    });

    setLoading(false);
    alert(
      type === "service"
        ? "Service booking submitted successfully!"
        : "Course enrollment submitted successfully!"
    );

    setName("");
    setPhone("");
    setSelectedItem("");
    setBranch("");
    setDate("");
    setTime("");
    setType("service");
  };

  const items = type === "service" ? services : courses;

  return (
    <main className="min-h-screen bg-[#FFF5F8] px-6 pb-24 pt-36 text-[#3A2A2F] md:px-12">
      <section className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[4px] text-[#E75480]">
            Book Now
          </p>

          <h1 className="mt-4 font-serif text-6xl font-light">
            Book or <span className="italic text-[#E75480]">Enroll</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#8A6F78]">
            Book a salon service or enroll in a professional academy course.
          </p>

          <div className="mx-auto mt-8 h-[1px] w-20 bg-[#E75480]/50" />
        </div>

        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="font-serif text-4xl text-[#E75480]">
              How It Works
            </h2>

            <div className="mt-8 space-y-6">
              {[
                "Choose booking or enrollment",
                "Select service or course",
                "Pick branch, date, and time",
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
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setSelectedItem("");
                }}
                className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none"
              >
                <option value="service">Service Booking</option>
                <option value="course">Course Enrollment</option>
              </select>

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
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
                required
                className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none"
              >
                <option value="">
                  {type === "service" ? "Select Service" : "Select Course"}
                </option>

                {items.map((item) => (
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
                {loading
                  ? "Submitting..."
                  : type === "service"
                  ? "Confirm Booking"
                  : "Confirm Enrollment"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}