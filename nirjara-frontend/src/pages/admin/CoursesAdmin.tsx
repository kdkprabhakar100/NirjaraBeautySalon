import { useEffect, useState } from "react";

type Course = {
  _id?: string;
  title: string;
  duration: string;
  description: string;
  price: string;
  image?: string;
};

const emptyCourse: Course = {
  title: "",
  duration: "",
  description: "",
  price: "",
  image: "",
};

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
});

export default function CoursesAdmin() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [form, setForm] = useState<Course>(emptyCourse);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchCourses = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/courses`);
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

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: formData,
    });

    const data = await res.json();
    setForm({ ...form, image: data.imageUrl });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.price || !form.duration) {
      alert("Please fill title, price, and duration.");
      return;
    }

    await fetch(
      editingId
        ? `${import.meta.env.VITE_API_URL}/api/courses/${editingId}`
        : `${import.meta.env.VITE_API_URL}/api/courses`,
      {
        method: editingId ? "PUT" : "POST",
        headers: getAuthHeaders(),
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

    await fetch(`${import.meta.env.VITE_API_URL}/api/courses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });

    await fetchCourses();
  };

  return (
    <div>
      <h1 className="font-serif text-4xl text-[#E75480] md:text-5xl">
        Courses
      </h1>

      <p className="mt-2 text-sm text-[#8A6F78] md:text-base">
        Manage academy courses.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-3xl bg-white p-4 shadow-sm md:p-6"
      >
        <h2 className="font-serif text-2xl text-[#3A2A2F] md:text-3xl">
          {editingId ? "Edit Course" : "Add New Course"}
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input
            placeholder="Course Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 text-sm outline-none md:text-base"
          />

          <input
            placeholder="Duration (e.g. 3 Months)"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            className="w-full rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 text-sm outline-none md:text-base"
          />

          <input
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 text-sm outline-none md:text-base"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              handleImageUpload(file);
            }}
            className="w-full rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 text-sm outline-none"
          />

          <textarea
            placeholder="Course Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            rows={4}
            className="w-full rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 text-sm outline-none md:col-span-2 md:text-base"
          />
        </div>

        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            className="mt-5 h-44 w-full rounded-2xl object-cover md:max-w-md"
          />
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
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

      {/* Course Cards */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

            <div className="p-5 md:p-6">
              <h2 className="break-words font-serif text-xl text-[#3A2A2F] md:text-2xl">
                {course.title}
              </h2>

              <p className="mt-2 text-sm text-[#8A6F78]">
                {course.duration}
              </p>

              <p className="mt-2 break-words text-sm text-[#8A6F78]">
                {course.description}
              </p>

              <p className="mt-3 font-medium text-[#E75480]">
                {course.price}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
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
          <div className="rounded-3xl bg-white p-8 text-center text-[#8A6F78] shadow-sm sm:col-span-2 lg:col-span-3">
            No courses available.
          </div>
        )}
      </div>
    </div>
  );
}