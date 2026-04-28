import BlogCard from "../../components/BlogCard";
import { blogs } from "../../data/blogs";

export default function Blog() {
  return (
    <main className="min-h-screen bg-[#FFF5F8] px-6 pb-24 pt-36 text-[#3A2A2F] md:px-12">
      <section className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[4px] text-[#E75480]">
            Beauty Insights
          </p>

          <h1 className="mt-4 font-serif text-6xl font-light">
            Our <span className="italic text-[#E75480]">Blog</span>
          </h1>

          <div className="mx-auto mt-8 h-[1px] w-20 bg-[#E75480]/50" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.title} {...blog} />
          ))}
        </div>
      </section>
    </main>
  );
}