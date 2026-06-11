import { Link } from "react-router-dom";

const jobs = [
  {
    title: "Professional Makeup Artist",
    type: "Full Time",
    location: "Kathmandu",
    description:
      "We are looking for a skilled makeup artist with experience in bridal, party, and professional beauty services.",
  },
  {
    title: "Hair Stylist",
    type: "Full Time",
    location: "Kathmandu",
    description:
      "Join our salon team as a creative hair stylist with knowledge of cutting, coloring, styling, and treatment services.",
  },
  {
    title: "Beauty Academy Instructor",
    type: "Part Time",
    location: "Nirjara Academy",
    description:
      "Teach aspiring beauty professionals with practical training, confidence, and industry experience.",
  },
];

export default function Careers() {
  return (
    <main className="min-h-screen bg-[#FFF5F8] text-[#3A2A2F]">
      <section className="bg-gradient-to-r from-pink-100 to-pink-200 px-6 py-20 text-center">
        <h1 className="font-serif text-4xl font-bold text-[#E75480] md:text-6xl">
          Careers at Nirjara
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6B5B61] md:text-base">
          Join our beauty family and grow your career in a professional,
          elegant, and creative salon environment.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-center font-serif text-3xl font-bold text-[#E75480] md:text-4xl">
          Current Openings
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job.title}
              className="rounded-[30px] bg-white p-8 shadow-lg"
            >
              <h3 className="font-serif text-2xl font-bold text-[#E75480]">
                {job.title}
              </h3>

              <div className="mt-4 flex flex-wrap gap-3 text-sm text-[#8A6F78]">
                <span className="rounded-full bg-pink-50 px-4 py-2">
                  {job.type}
                </span>

                <span className="rounded-full bg-pink-50 px-4 py-2">
                  {job.location}
                </span>
              </div>

              <p className="mt-5 text-sm leading-7 text-[#6B5B61]">
                {job.description}
              </p>

              <Link
                to="/contact"
                className="mt-8 inline-block rounded-full bg-[#E75480] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#d94372]"
              >
                Apply Now
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}