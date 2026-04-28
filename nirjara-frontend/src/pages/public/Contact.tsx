import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-screen bg-[#FFF5F8] px-6 pb-24 pt-36 text-[#3A2A2F] md:px-12">
      <section className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[4px] text-[#E75480]">
            Get in Touch
          </p>

          <h1 className="mt-4 font-serif text-6xl font-light">
            Contact <span className="italic text-[#E75480]">Us</span>
          </h1>

          <div className="mx-auto mt-8 h-[1px] w-20 bg-[#E75480]/50" />
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {/* LEFT INFO */}
          <div className="space-y-8">
            {[
              ["Main Office", "Teku, Kathmandu, Nepal"],
              ["Phone", "+977 98XXXXXXXX"],
              ["Email", "info@nirjarabeauty.com"],
              ["Hours", "Sun–Fri: 10am – 7pm\nSat: 9am – 8pm"],
              ["Branches", "Teku Branch\nChabahil Branch"],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-xs uppercase tracking-[3px] text-[#E75480]">
                  {label}
                </p>
                <p className="mt-2 whitespace-pre-line leading-8 text-[#8A6F78]">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* FORM */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-5 rounded-3xl border border-[#E75480]/10 bg-white p-8 shadow-xl"
          >
            {sent && (
              <div className="rounded-xl border border-[#E75480]/30 bg-[#FCE7EF] p-4 text-sm text-[#E75480]">
                Message sent! We will reply soon.
              </div>
            )}

            <input
              required
              placeholder="Your Name"
              className="w-full rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 text-[#3A2A2F] outline-none placeholder:text-[#8A6F78]"
            />

            <input
              required
              type="email"
              placeholder="Email Address"
              className="w-full rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 text-[#3A2A2F] outline-none placeholder:text-[#8A6F78]"
            />

            <input
              required
              placeholder="Subject"
              className="w-full rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 text-[#3A2A2F] outline-none placeholder:text-[#8A6F78]"
            />

            <textarea
              required
              rows={6}
              placeholder="Write your message..."
              className="w-full resize-none rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 text-[#3A2A2F] outline-none placeholder:text-[#8A6F78]"
            />

            <button className="w-full rounded-full bg-[#E75480] px-10 py-4 text-xs font-medium uppercase tracking-[2px] text-white shadow-lg transition hover:bg-[#C93D68]">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}