type AdminLayoutProps = {
  children: React.ReactNode;
  activeAdminPage: string;
  setActiveAdminPage: (page: string) => void;
  setCurrentPage: (page: string) => void;
};

const adminLinks = ["Dashboard", "Bookings", "Services", "Gallery", "Courses"];

export default function AdminLayout({
  children,
  activeAdminPage,
  setActiveAdminPage,
  setCurrentPage,
}: AdminLayoutProps) {
  return (
    <main className="flex min-h-screen bg-[#FFF5F8] text-[#3A2A2F]">
      <aside className="w-64 border-r border-[#E75480]/10 bg-white p-6">
        <h1 className="font-serif text-2xl text-[#E75480]">Nirjara Admin</h1>

        <div className="mt-10 space-y-3">
          {adminLinks.map((link) => (
            <button
              key={link}
              onClick={() => setActiveAdminPage(link)}
              className={`w-full rounded-xl px-4 py-3 text-left text-sm transition ${
                activeAdminPage === link
                  ? "bg-[#E75480] text-white"
                  : "text-[#8A6F78] hover:bg-[#FCE7EF] hover:text-[#E75480]"
              }`}
            >
              {link}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage("Home")}
          className="mt-10 w-full rounded-xl border border-[#E75480] px-4 py-3 text-sm text-[#E75480]"
        >
          View Website
        </button>
        
        <button
          onClick={() => {
            localStorage.removeItem("adminToken");
            localStorage.removeItem("adminEmail");
            setCurrentPage("Login");
          }}
          className="mt-4 w-full rounded-xl bg-[#FCE7EF] px-4 py-3 text-sm text-[#E75480]"
        >
          Logout
        </button>
      </aside>

      <section className="flex-1 p-8">{children}</section>
    </main>
  );
}