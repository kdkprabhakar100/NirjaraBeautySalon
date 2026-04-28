import CourseCard from "../../components/CourseCard";
import { courses } from "../../data/courses";

type AcademyProps = {
  setCurrentPage: (page: string) => void;
};

export default function Academy({ setCurrentPage }: AcademyProps) {
  return (
    <main className="min-h-screen bg-[#FFF5F8] px-6 pb-24 pt-36 text-[#3A2A2F] md:px-12">
      <section className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[4px] text-[#E75480]">
            Professional Training
          </p>

          <h1 className="mt-4 font-serif text-6xl font-light">
            Nirjara <span className="italic text-[#E75480]">Academy</span>
          </h1>

          <div className="mx-auto mt-8 h-[1px] w-20 bg-[#E75480]/50" />

          <p className="mx-auto mt-8 max-w-2xl leading-8 text-[#8A6F78]">
            Launch your beauty career with professional training, practical
            sessions, and certificate-based courses designed for beginners and
            future salon professionals.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {courses.map((course) => (
            <CourseCard key={course.title} {...course} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={() => setCurrentPage("Booking")}
            className="rounded-full bg-[#E75480] px-10 py-4 text-xs font-medium uppercase tracking-[2px] text-white shadow-lg transition hover:bg-[#C93D68]"
          >
            Enroll in a Course
          </button>
        </div>
      </section>
    </main>
  );
}