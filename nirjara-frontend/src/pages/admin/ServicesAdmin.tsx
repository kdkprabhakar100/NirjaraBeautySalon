import { useEffect, useState } from "react";

type Service = {
  _id?: string;
  icon: string;
  title: string;
  description: string;
  price: string;
  category: string;
  image?: string;
};

const categories = ["Hair", "Skin", "Bridal", "Nails", "Spa", "Academy", "Other"];

const imageOptions = [
  "/images/hair.png",
  "/images/facial.png",
  "/images/bridal.png",
  "/images/salon.png",
  "/images/salon1.png",
];

const emptyForm: Service = {
  icon: "✦",
  title: "",
  description: "",
  price: "",
  category: "Hair",
  image: "/images/salon.png",
};

export default function ServicesAdmin() {
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState<Service>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [customCategory, setCustomCategory] = useState("");

  const fetchServices = async () => {
    const res = await fetch("http://localhost:5000/api/services");
    const data = await res.json();
    setServices(data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setCustomCategory("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalService = {
      ...form,
      category: form.category === "Other" ? customCategory : form.category,
    };

    if (!finalService.title || !finalService.price || !finalService.category) {
      alert("Please fill title, price, and category.");
      return;
    }

await fetch("http://localhost:5000/api/services", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
  body: JSON.stringify(finalService),
});

    await fetchServices();
    resetForm();
  };

  const handleEdit = (service: Service) => {
    setForm(service);
    setEditingId(service._id || null);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Delete this service?")) return;

    await fetch(`http://localhost:5000/api/services/${id}`, {
      method: "DELETE",
    });

    await fetchServices();
  };

  return (
    <div>
      <div>
        <h1 className="font-serif text-5xl text-[#E75480]">Services</h1>
        <p className="mt-2 text-[#8A6F78]">
          Create, edit, delete, and manage website services.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-3xl bg-white p-6 shadow-sm"
      >
        <h2 className="font-serif text-3xl text-[#3A2A2F]">
          {editingId ? "Edit Service" : "Add New Service"}
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input
            placeholder="Service Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none"
          />

          <input
            placeholder="Price e.g. From Rs. 800"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none"
          />

          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none"
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>

          <select
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none"
          >
            {imageOptions.map((image) => (
              <option key={image} value={image}>
                {image}
              </option>
            ))}
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
              className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none"
            />

          {form.category === "Other" && (
            <input
              placeholder="Enter custom category"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="rounded-xl border border-[#E75480]/20 bg-[#FFF5F8] px-4 py-3 outline-none"
            />
          )}

          <textarea
            placeholder="Service Description"
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
              alt="Preview"
              className="h-44 w-full max-w-md rounded-2xl object-cover"
            />
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button className="rounded-full bg-[#E75480] px-8 py-3 text-xs uppercase tracking-[2px] text-white">
            {editingId ? "Update Service" : "Add Service"}
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
        {services.map((service) => (
          <div
            key={service._id}
            className="overflow-hidden rounded-3xl bg-white shadow-sm"
          >
            <img
              src={service.image || "/images/salon.png"}
              alt={service.title}
              className="h-44 w-full object-cover"
            />

            <div className="p-6">
              <p className="text-xs uppercase tracking-[2px] text-[#E75480]">
                {service.category}
              </p>

              <h2 className="mt-2 font-serif text-2xl text-[#3A2A2F]">
                {service.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#8A6F78]">
                {service.description}
              </p>

              <p className="mt-3 text-sm font-medium text-[#E75480]">
                {service.price}
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => handleEdit(service)}
                  className="rounded-full border border-[#E75480] px-5 py-2 text-xs text-[#E75480]"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(service._id)}
                  className="rounded-full bg-[#FCE7EF] px-5 py-2 text-xs text-[#E75480]"
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