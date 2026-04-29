import { useEffect, useState } from "react";

type Course = {
  _id?: string;
  title: string;
  description: string;
  duration: string;
  fee: string;
  certificate: string;
  image?: string;
};

const emptyCourse: Course = {
  title: "",
  description: "",
  duration: "",
  fee: "",
  certificate: "Certificate Included",
  image: "",
};

export default function CoursesAdmin() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [form, setForm] = useState<Course>(emptyCourse);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchCourses = async () => {
    const res = await fetch("http://localhost:5000/api/courses");
    const data = await res.json();
    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const resetForm = () => {
    setForm(emptyCourse);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.duration || !form.fee) {
      alert("Please fill all required fields.");
      return;
    }

    await fetch(
      editingId
        ? `http://localhost:5000/api/courses/${editingId}`
        : "http://localhost:5000/api/courses",
      {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    await fetchCourses();
    resetForm();
  };

  const handleEdit = (course: Course) => {
    setForm(course);
    setEditingId(course._id || null);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Delete this course?")) return;

    await fetch(`http://localhost:5000/api/courses/${id}`, {
      method: "DELETE",
    });

    await fetchCourses();
  };

  return (
    <div>
      <h1 className="font-serif text-5xl text-[#E75480]">Courses</h1>
      <p className="mt-2 text-[#8A6F78]">
        Add, edit, delete, and manage academy courses.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-3xl bg-white p-6 shadow-sm"
      >
        <h2 className="font-serif text-3xl text-[#3A2A2F]">
          {editingId ? "Edit Course" : "Add New Course"}
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input
            placeholder="Course Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none"
          />

          <input
            placeholder="Duration e.g. 6 Months"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none"
          />

          <input
            placeholder="Fee e.g. Rs. 65,000"
            value={form.fee}
            onChange={(e) => setForm({ ...form, fee: e.target.value })}
            className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none"
          />

          <select
            value={form.certificate}
            onChange={(e) =>
              setForm({ ...form, certificate: e.target.value })
            }
            className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none"
          >
            <option>Certificate Included</option>
            <option>International Certificate</option>
            <option>No Certificate</option>
          </select>

          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const formData = new FormData();
              formData.append("image", file);

              const res = await fetch("http://localhost:5000/api/upload", {
                method: "POST",
                body: formData,
              });

              const data = await res.json();
              setForm({ ...form, image: data.imageUrl });
            }}
            className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none md:col-span-2"
          />

          <textarea
            placeholder="Course Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            rows={4}
            className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none md:col-span-2"
          />
        </div>

        {form.image && (
          <div className="mt-5">
            <p className="mb-2 text-sm text-[#8A6F78]">Image Preview</p>
            <img
              src={form.image}
              alt="Course Preview"
              className="h-44 w-full max-w-md rounded-2xl object-cover"
            />
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button className="rounded-full bg-[#E75480] px-8 py-3 text-xs uppercase tracking-[2px] text-white">
            {editingId ? "Update Course" : "Add Course"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-full border border-[#E75480] px-8 py-3 text-xs uppercase tracking-[2px] text-[#E75480]"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course._id}
            className="overflow-hidden rounded-3xl bg-white shadow-sm"
          >
            {course.image && (
              <img
                src={course.image}
                alt={course.title}
                className="h-44 w-full object-cover"
              />
            )}

            <div className="p-6">
              <h2 className="font-serif text-2xl text-[#E75480]">
                {course.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#8A6F78]">
                {course.description}
              </p>

              <div className="mt-4 space-y-1 text-sm text-[#8A6F78]">
                <p>
                  <strong>Duration:</strong> {course.duration}
                </p>
                <p>
                  <strong>Fee:</strong> {course.fee}
                </p>
                <p>
                  <strong>Certificate:</strong> {course.certificate}
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => handleEdit(course)}
                  className="rounded-full border border-[#E75480] px-5 py-2 text-xs text-[#E75480]"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(course._id)}
                  className="rounded-full bg-[#FCE7EF] px-5 py-2 text-xs text-[#E75480]"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {courses.length === 0 && (
          <p className="col-span-3 text-center text-[#8A6F78]">
            No courses available.
          </p>
        )}
      </div>
    </div>
  );
}