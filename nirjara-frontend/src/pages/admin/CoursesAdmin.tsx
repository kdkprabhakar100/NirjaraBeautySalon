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

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
});

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

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:5000/api/upload", {
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

    if (!form.title || !form.description || !form.duration || !form.fee) {
      alert("Fill all required fields");
      return;
    }

    await fetch(
      editingId
        ? `http://localhost:5000/api/courses/${editingId}`
        : "http://localhost:5000/api/courses",
      {
        method: editingId ? "PUT" : "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(form),
      }
    );

    fetchCourses();
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
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });

    fetchCourses();
  };

  return (
    <div>
      <h1 className="font-serif text-5xl text-[#E75480]">Courses</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-3xl bg-white p-6 shadow-sm"
      >
        <h2 className="font-serif text-3xl">
          {editingId ? "Edit Course" : "Add Course"}
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input
            placeholder="Course Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded-xl border px-4 py-3"
          />

          <input
            placeholder="Duration"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            className="rounded-xl border px-4 py-3"
          />

          <input
            placeholder="Fee"
            value={form.fee}
            onChange={(e) => setForm({ ...form, fee: e.target.value })}
            className="rounded-xl border px-4 py-3"
          />

          <select
            value={form.certificate}
            onChange={(e) =>
              setForm({ ...form, certificate: e.target.value })
            }
            className="rounded-xl border px-4 py-3"
          >
            <option>Certificate Included</option>
            <option>International Certificate</option>
            <option>No Certificate</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              handleImageUpload(file);
            }}
            className="rounded-xl border px-4 py-3 md:col-span-2"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="rounded-xl border px-4 py-3 md:col-span-2"
          />
        </div>

        {form.image && (
          <img
            src={form.image}
            className="mt-5 h-44 w-full max-w-md rounded-2xl object-cover"
          />
        )}

        <div className="mt-6 flex gap-3">
          <button className="bg-[#E75480] text-white px-6 py-3 rounded-full">
            {editingId ? "Update" : "Add"}
          </button>
        </div>
      </form>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {courses.map((course) => (
          <div key={course._id} className="bg-white rounded-3xl shadow-sm">
            {course.image && (
              <img
                src={course.image}
                className="h-44 w-full object-cover rounded-t-3xl"
              />
            )}

            <div className="p-5">
              <h2 className="text-xl font-serif">{course.title}</h2>

              <p className="text-sm mt-2">{course.description}</p>

              <div className="mt-3 text-sm">
                <p>{course.duration}</p>
                <p>{course.fee}</p>
                <p>{course.certificate}</p>
              </div>

              <div className="mt-4 flex gap-2">
                <button onClick={() => handleEdit(course)}>Edit</button>
                <button onClick={() => handleDelete(course._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}