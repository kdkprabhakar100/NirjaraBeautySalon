import { useEffect, useState } from "react";

type GalleryItem = {
  _id?: string;
  title: string;
  image: string;
};

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
});

export default function GalleryAdmin() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [form, setForm] = useState<GalleryItem>({ title: "", image: "" });
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchGallery = async () => {
    const res = await fetch("http://localhost:5000/api/gallery");
    const data = await res.json();
    setGallery(data);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const resetForm = () => {
    setForm({ title: "", image: "" });
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

    if (!form.title || !form.image) {
      alert("Please add title and image");
      return;
    }

    await fetch(
      editingId
        ? `http://localhost:5000/api/gallery/${editingId}`
        : "http://localhost:5000/api/gallery",
      {
        method: editingId ? "PUT" : "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(form),
      }
    );

    resetForm();
    fetchGallery();
  };

  const handleEdit = (item: GalleryItem) => {
    setForm(item);
    setEditingId(item._id || null);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Delete this photo?")) return;

    await fetch(`http://localhost:5000/api/gallery/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });

    fetchGallery();
  };

  return (
    <div>
      <h1 className="font-serif text-5xl text-[#E75480]">Gallery</h1>

      <p className="mt-2 text-[#8A6F78]">
        Add, edit, delete, and manage gallery slider photos.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-3xl bg-white p-6 shadow-sm"
      >
        <h2 className="font-serif text-3xl text-[#3A2A2F]">
          {editingId ? "Edit Photo" : "Add Photo"}
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input
            placeholder="Photo title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
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
        </div>

        {form.image && (
          <div className="mt-5">
            <p className="mb-2 text-sm text-[#8A6F78]">Image Preview</p>
            <img
              src={form.image}
              alt="Preview"
              className="h-48 w-full max-w-md rounded-2xl object-cover"
            />
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button className="rounded-full bg-[#E75480] px-8 py-3 text-xs uppercase tracking-[2px] text-white">
            {editingId ? "Update Photo" : "Add Photo"}
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
        {gallery.map((item) => (
          <div
            key={item._id}
            className="group relative overflow-hidden rounded-3xl bg-white shadow-sm"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            <div className="absolute bottom-0 w-full p-5">
              <h2 className="font-serif text-2xl text-white">{item.title}</h2>
            </div>

            <div className="absolute right-4 top-4 flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="rounded-full bg-white/90 px-4 py-2 text-xs text-[#E75480]"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item._id)}
                className="rounded-full bg-white/90 px-4 py-2 text-xs text-[#E75480]"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {gallery.length === 0 && (
          <p className="col-span-3 text-center text-[#8A6F78]">
            No gallery images available.
          </p>
        )}
      </div>
    </div>
  );
}