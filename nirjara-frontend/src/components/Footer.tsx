import { Link } from "react-router-dom";

export default function Footer() {
  const pages = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "Branches", path: "/branches" },
    { label: "Academy", path: "/academy" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <footer className="border-t border-[#E75480]/10 bg-white px-6 py-14 text-[#3A2A2F] md:px-12">
      <div className="grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <h2 className="font-serif text-2xl tracking-[3px] text-[#E75480]">
            NIRJARA <span className="italic text-[#C77A95]">Beauty</span>
          </h2>

          <p className="mt-4 max-w-md text-sm leading-7 text-[#8A6F78]">
            A professional beauty salon and academy offering salon services,
            beauty training, and customer-focused care in Kathmandu.
          </p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[3px] text-[#E75480]">
            Pages
          </h3>

          <div className="mt-5 flex flex-col gap-3 text-sm text-[#8A6F78]">
            {pages.map((page) => (
              <Link key={page.path} to={page.path} className="hover:text-[#E75480]">
                {page.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[3px] text-[#E75480]">
            Contact
          </h3>

          <div className="mt-5 space-y-3 text-sm leading-7 text-[#8A6F78]">
            <p>Teku, Kathmandu</p>
            <p>Chabahil, Kathmandu</p>
            <p>+977 98XXXXXXXX</p>

            <Link to="/admin/login" className="block pt-2 text-xs hover:text-[#E75480]">
              Admin Login
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-[#E75480]/10 pt-6 text-xs text-[#8A6F78]">
        © 2026 Nirjara Beauty Salon & Academy. All rights reserved.
      </div>
    </footer>
  );
}