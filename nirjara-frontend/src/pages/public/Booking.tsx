import { useState } from "react";
import { branches } from "../../data/branches";
import { services } from "../../data/services";
import { courses } from "../../data/courses";

export default function Booking() {
  const [bookingType, setBookingType] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#FFF5F8] px-6 pt-36 text-[#3A2A2F]">
        <div className="mx-auto max-w-xl rounded-3xl border border-[#E75480]/10 bg-white p-10 text-center shadow-xl">
          <div className="mb-4 text-4xl text-[#E75480]">✦</div>
          <h1 className="font-serif text-4xl text-[#E75480]">
            Booking Received!
          </h1>
          <p className="mt-4 text-[#8A6F78]">
            We will confirm your appointment within 2 hours.
          </p>

          <button
            onClick={() => setSubmitted(false)}
            className="mt-8 rounded-full border border-[#E75480] px-8 py-3 text-xs uppercase tracking-[2px] text-[#E75480]"
          >
            Book Another
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF5F8] px-6 pb-24 pt-36 text-[#3A2A2F] md:px-12">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
        <section>
          <p className="text-xs uppercase tracking-[4px] text-[#E75480]">
            Book Now
          </p>

          <h1 className="mt-4 font-serif text-6xl font-light">
            Book Your{" "}
            <span className="italic text-[#E75480]">Experience</span>
          </h1>

          <p className="mt-6 max-w-md leading-8 text-[#8A6F78]">
            Reserve your salon appointment or academy enrollment. Our team will
            contact you shortly to confirm your booking.
          </p>

          <div className="mt-10 space-y-5">
            {[
              "Choose salon service or academy course",
              "Select your preferred branch",
              "Pick date and time",
              "Submit your contact details",
            ].map((step, index) => (
              <div key={step} className="flex gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E75480] text-xs text-[#E75480]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="pt-2 text-sm text-[#8A6F78]">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="space-y-5 rounded-3xl border border-[#E75480]/10 bg-white p-8 shadow-xl"
        >
          <select
            value={bookingType}
            onChange={(e) => setBookingType(e.target.value)}
            required
            className="w-full rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 text-[#3A2A2F] outline-none"
          >
            <option value="">Select Booking Type</option>
            <option value="salon">Beauty Salon Service</option>
            <option value="academy">Academy Course</option>
          </select>

          {bookingType === "salon" && (
            <select className="w-full rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 text-[#3A2A2F] outline-none">
              {services.map((service) => (
                <option key={service.title}>{service.title}</option>
              ))}
            </select>
          )}

          {bookingType === "academy" && (
            <select className="w-full rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 text-[#3A2A2F] outline-none">
              {courses.map((course) => (
                <option key={course.title}>{course.title}</option>
              ))}
            </select>
          )}

          <select
            required
            className="w-full rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 text-[#3A2A2F] outline-none"
          >
            <option value="">Select Branch</option>
            {branches.map((branch) => (
              <option key={branch.name}>{branch.name}</option>
            ))}
          </select>

          <div className="grid gap-5 md:grid-cols-2">
            <input
              required
              type="date"
              className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 text-[#3A2A2F] outline-none"
            />
            <input
              required
              type="time"
              className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 text-[#3A2A2F] outline-none"
            />
          </div>

          <input
            required
            placeholder="Full Name"
            className="w-full rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 text-[#3A2A2F] outline-none placeholder:text-[#8A6F78]"
          />

          <input
            required
            placeholder="Phone Number"
            className="w-full rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 text-[#3A2A2F] outline-none placeholder:text-[#8A6F78]"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 text-[#3A2A2F] outline-none placeholder:text-[#8A6F78]"
          />

          <button className="w-full rounded-full bg-[#E75480] px-8 py-4 text-xs font-medium uppercase tracking-[2px] text-white shadow-lg hover:bg-[#C93D68]">
            Confirm Booking
          </button>
        </form>
      </div>
    </main>
  );
}