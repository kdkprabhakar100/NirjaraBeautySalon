import { useEffect, useState } from "react";

type Blog = {
  _id?: string;
  title: string;
  category: string;
  description: string;
  content: string;
  image?: string;
  readTime: string;
};

const emptyBlog: Blog = {
  title: "",
  category: "Beauty Tips",
  description: "",
  content: "",
  image: "",
  readTime: "5 min read",
};

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
});

export default function BlogAdmin() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [form, setForm] = useState<Blog>(emptyBlog);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchBlogs = async () => {
    const res = await fetch("http://localhost:5000/api/blogs");
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const resetForm = () => {
    setForm(emptyBlog);
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

    if (!form.title || !form.category || !form.description) {
      alert("Please fill title, category, and description.");
      return;
    }

    await fetch(
      editingId
        ? `http://localhost:5000/api/blogs/${editingId}`
        : "http://localhost:5000/api/blogs",
      {
        method: editingId ? "PUT" : "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(form),
      }
    );

    await fetchBlogs();
    resetForm();
  };

  const handleEdit = (blog: Blog) => {
    setForm(blog);
    setEditingId(blog._id || null);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Delete this blog?")) return;

    await fetch(`http://localhost:5000/api/blogs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });

    await fetchBlogs();
  };

  return (
    <div>
      <h1 className="font-serif text-5xl text-[#E75480]">Blogs</h1>
      <p className="mt-2 text-[#8A6F78]">
        Add, edit, and delete blog posts.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-3xl bg-white p-6 shadow-sm"
      >
        <h2 className="font-serif text-3xl text-[#3A2A2F]">
          {editingId ? "Edit Blog" : "Add New Blog"}
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input
            placeholder="Blog Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none"
          />

          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none"
          />

          <input
            placeholder="Read Time e.g. 5 min read"
            value={form.readTime}
            onChange={(e) => setForm({ ...form, readTime: e.target.value })}
            className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none"
          />

          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              handleImageUpload(file);
            }}
            className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none"
          />

          <textarea
            placeholder="Short Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            rows={3}
            className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none md:col-span-2"
          />

          <textarea
            placeholder="Full Blog Content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={6}
            className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none md:col-span-2"
          />
        </div>

        {form.image && (
          <img
            src={form.image}
            alt="Blog Preview"
            className="mt-5 h-44 w-full max-w-md rounded-2xl object-cover"
          />
        )}

        <div className="mt-6 flex gap-3">
          <button className="rounded-full bg-[#E75480] px-8 py-3 text-xs uppercase tracking-[2px] text-white">
            {editingId ? "Update Blog" : "Add Blog"}
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
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="overflow-hidden rounded-3xl bg-white shadow-sm"
          >
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="h-44 w-full object-cover"
              />
            )}

            <div className="p-6">
              <p className="text-xs uppercase tracking-[2px] text-[#E75480]">
                {blog.category}
              </p>

              <h2 className="mt-2 font-serif text-2xl text-[#3A2A2F]">
                {blog.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#8A6F78]">
                {blog.description}
              </p>

              <p className="mt-3 text-xs text-[#8A6F78]">{blog.readTime}</p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => handleEdit(blog)}
                  className="rounded-full border border-[#E75480] px-5 py-2 text-xs text-[#E75480]"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(blog._id)}
                  className="rounded-full bg-[#FCE7EF] px-5 py-2 text-xs text-[#E75480]"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {blogs.length === 0 && (
          <p className="col-span-3 text-center text-[#8A6F78]">
            No blogs available.
          </p>
        )}
      </div>
    </div>
  );
}