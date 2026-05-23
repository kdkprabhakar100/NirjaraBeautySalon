import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Popup = {
  _id: string;

  title: string;

  subtitle: string;

  image: string;

  buttonText: string;

  buttonLink: string;

  active: boolean;

  delay: number;

  startDate: string;

  endDate: string;
};

export default function AdminPopup() {
  const [popups, setPopups] = useState<
    Popup[]
  >([]);

  const [uploading, setUploading] =
    useState(false);

  const [form, setForm] = useState({
    title: "",

    subtitle: "",

    image: "",

    buttonText: "",

    buttonLink: "",

    delay: 3000,

    startDate: "",

    endDate: "",
  });

  const token = localStorage.getItem(
    "token"
  );

  // FETCH POPUPS
  const fetchPopups = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/popup`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setPopups(data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch popups");
    }
  };

  useEffect(() => {
    fetchPopups();
  }, []);

  // IMAGE UPLOAD
  const uploadImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("image", file);

    try {
      setUploading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/upload`,
        {
          method: "POST",

          body: formData,
        }
      );

      const data = await res.json();

      setForm((prev) => ({
        ...prev,

        image: data.imageUrl,
      }));

      toast.success("Image uploaded 💖");
    } catch (error) {
      console.log(error);

      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // CREATE POPUP
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/popup`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            ...form,

            active: true,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to create popup"
        );
      }

      toast.success(
        "Popup created successfully 💖"
      );

      setForm({
        title: "",

        subtitle: "",

        image: "",

        buttonText: "",

        buttonLink: "",

        delay: 3000,

        startDate: "",

        endDate: "",
      });

      fetchPopups();
    } catch (error) {
      console.log(error);

      toast.error("Failed to create popup");
    }
  };

  // DELETE POPUP
  const deletePopup = async (
    id: string
  ) => {
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/popup/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Popup deleted");

      fetchPopups();
    } catch (error) {
      console.log(error);

      toast.error("Delete failed");
    }
  };

  // TOGGLE ACTIVE
  const togglePopup = async (
    popup: Popup
  ) => {
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/popup/${popup._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            active: !popup.active,
          }),
        }
      );

      toast.success("Popup updated");

      fetchPopups();
    } catch (error) {
      console.log(error);

      toast.error("Failed");
    }
  };

  return (
    <section className="min-h-screen bg-[#FFF5F8] p-6 md:p-10">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="text">
          <h1 className="font-serif text-5xl text-[#E75480]">
            Website Popup
          </h1>

          <p className="mt-4 text-[#8A6F78]">
            Manage website offers &
            announcements
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="mt-12 rounded-[32px] bg-white p-8 shadow-sm"
        >

          <div className="grid gap-6 md:grid-cols-2">

            <input
              type="text"
              placeholder="Popup Title"
              required
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              className="rounded-2xl border border-[#F3D3DC] p-4 outline-none"
            />

            <input
              type="text"
              placeholder="Button Text"
              value={form.buttonText}
              onChange={(e) =>
                setForm({
                  ...form,
                  buttonText:
                    e.target.value,
                })
              }
              className="rounded-2xl border border-[#F3D3DC] p-4 outline-none"
            />

            <input
              type="text"
              placeholder="Button Link"
              value={form.buttonLink}
              onChange={(e) =>
                setForm({
                  ...form,
                  buttonLink:
                    e.target.value,
                })
              }
              className="rounded-2xl border border-[#F3D3DC] p-4 outline-none"
            />

            <input
              type="number"
              placeholder="Delay (ms)"
              value={form.delay}
              onChange={(e) =>
                setForm({
                  ...form,
                  delay: Number(
                    e.target.value
                  ),
                })
              }
              className="rounded-2xl border border-[#F3D3DC] p-4 outline-none"
            />

            <input
              type="date"
              required
              value={form.startDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  startDate:
                    e.target.value,
                })
              }
              className="rounded-2xl border border-[#F3D3DC] p-4 outline-none"
            />

            <input
              type="date"
              required
              value={form.endDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  endDate:
                    e.target.value,
                })
              }
              className="rounded-2xl border border-[#F3D3DC] p-4 outline-none"
            />
          </div>

          {/* SUBTITLE */}
          <textarea
            placeholder="Popup Subtitle"
            rows={4}
            value={form.subtitle}
            onChange={(e) =>
              setForm({
                ...form,
                subtitle: e.target.value,
              })
            }
            className="mt-6 w-full rounded-2xl border border-[#F3D3DC] p-4 outline-none"
          />

          {/* IMAGE UPLOAD */}
          <div className="mt-6">

            <label className="mb-3 block text-sm text-[#8A6F78]">
              Popup Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={uploadImage}
              className="w-full rounded-2xl border border-[#F3D3DC] bg-white p-4"
            />

            {uploading && (
              <p className="mt-3 text-sm text-[#E75480]">
                Uploading image...
              </p>
            )}

            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="mt-4 h-56 w-full rounded-3xl object-cover"
              />
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="mt-8 rounded-full bg-[#E75480] px-8 py-4 text-sm uppercase tracking-[3px] text-white transition hover:bg-[#d63c6d]"
          >
            Create Popup
          </button>
        </form>

        {/* POPUPS LIST */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">

          {popups.map((popup) => (
            <div
              key={popup._id}
              className="rounded-[30px] bg-white p-6 shadow-sm"
            >

              <img
                src={popup.image}
                alt={popup.title}
                className="h-60 w-full rounded-3xl object-cover"
              />

              <h2 className="mt-6 font-serif text-3xl text-[#3A2A2F]">
                {popup.title}
              </h2>

              <p className="mt-3 leading-7 text-[#8A6F78]">
                {popup.subtitle}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                <span className="rounded-full bg-[#FFF5F8] px-4 py-2 text-sm text-[#E75480]">
                  {popup.active
                    ? "Active"
                    : "Inactive"}
                </span>

                <span className="rounded-full bg-[#FFF5F8] px-4 py-2 text-sm text-[#E75480]">
                  Delay: {popup.delay}ms
                </span>
              </div>

              <div className="mt-4 text-sm text-[#8A6F78]">
                <p>
                  Start:
                  {" "}
                  {new Date(
                    popup.startDate
                  ).toLocaleDateString()}
                </p>

                <p className="mt-1">
                  End:
                  {" "}
                  {new Date(
                    popup.endDate
                  ).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-8 flex gap-3">

                <button
                  onClick={() =>
                    togglePopup(popup)
                  }
                  className="rounded-full bg-blue-100 px-6 py-3 text-sm"
                >
                  Toggle
                </button>

                <button
                  onClick={() =>
                    deletePopup(popup._id)
                  }
                  className="rounded-full bg-red-100 px-6 py-3 text-sm text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}