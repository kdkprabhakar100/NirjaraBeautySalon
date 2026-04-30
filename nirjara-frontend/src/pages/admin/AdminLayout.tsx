import { NavLink, useNavigate } from "react-router-dom";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const adminLinks = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Bookings", path: "/admin/bookings" },
  { label: "Services", path: "/admin/services" },
  { label: "Gallery", path: "/admin/gallery" },
  { label: "Courses", path: "/admin/courses" },
  { label: "Messages", path: "/admin/messages" },
  { label: "Blogs", path: "/admin/blogs" },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    navigate("/admin/login");
  };

  return (
    <main className="flex min-h-screen bg-[#FFF5F8] text-[#3A2A2F]">
      <aside className="w-64 border-r border-[#E75480]/10 bg-white p-6">
        <h1 className="font-serif text-2xl text-[#E75480]">Nirjara Admin</h1>

        <div className="mt-10 space-y-3">
          {adminLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-[#E75480] text-white"
                    : "text-[#8A6F78] hover:bg-[#FCE7EF] hover:text-[#E75480]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-10 w-full rounded-xl border border-[#E75480] px-4 py-3 text-sm text-[#E75480]"
        >
          View Website
        </button>

        <button
          onClick={logout}
          className="mt-4 w-full rounded-xl bg-[#FCE7EF] px-4 py-3 text-sm text-[#E75480]"
        >
          Logout
        </button>
      </aside>

      <section className="flex-1 p-8">{children}</section>
    </main>
  );
}