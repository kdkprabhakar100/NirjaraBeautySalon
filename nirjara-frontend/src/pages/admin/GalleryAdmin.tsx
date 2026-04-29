import { useEffect, useState } from "react";

type GalleryItem = {
  _id?: string;
  title: string;
  image: string;
};

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
        headers: {
          "Content-Type": "application/json",
        },
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
    });

    fetchGallery();
  };

  return (
    <div>
      <h1 className="font-serif text-5xl text-[#E75480]">Gallery</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-3xl bg-white p-6 shadow-sm"
      >
        <h2 className="font-serif text-3xl">
          {editingId ? "Edit Photo" : "Add Photo"}
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input
            placeholder="Photo title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded-xl border px-4 py-3"
          />

          {/* REAL IMAGE UPLOAD */}
          <input
            type="file"
            accept="image/*"
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
            className="rounded-xl border px-4 py-3"
          />
        </div>

        {form.image && (
          <img
            src={form.image}
            className="mt-5 h-48 w-full max-w-md rounded-2xl object-cover"
          />
        )}

        <div className="mt-6 flex gap-3">
          <button className="bg-[#E75480] text-white px-6 py-3 rounded-full">
            {editingId ? "Update" : "Add"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="border px-6 py-3 rounded-full"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {gallery.map((item) => (
          <div key={item._id} className="rounded-3xl bg-white shadow-sm">
            <img
              src={item.image}
              className="h-52 w-full object-cover rounded-t-3xl"
            />

            <div className="p-5">
              <h2 className="font-serif text-xl">{item.title}</h2>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleEdit(item)}
                  className="border px-4 py-2 rounded-full text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-[#FCE7EF] px-4 py-2 rounded-full text-sm"
                >
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