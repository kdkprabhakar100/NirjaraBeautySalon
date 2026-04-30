import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Gallery", path: "/gallery" },
  { label: "Branches", path: "/branches" },
  { label: "Academy", path: "/academy" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[#E75480]/15 bg-white/90 px-6 py-5 shadow-sm backdrop-blur md:px-12">
      <div className="flex items-center justify-between">
        <NavLink
          to="/"
          className="font-serif text-2xl tracking-[3px] text-[#E75480]"
        >
          NIRJARA <span className="italic text-[#C77A95]">Beauty</span>
        </NavLink>

        <div className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-xs uppercase tracking-[2px] transition ${
                  isActive ? "text-[#E75480]" : "text-[#8A6F78]"
                } hover:text-[#E75480]`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <NavLink
          to="/booking"
          className="hidden rounded-full bg-[#E75480] px-6 py-3 text-xs font-medium uppercase tracking-[2px] text-white shadow-md transition hover:bg-[#C93D68] md:block"
        >
          Book Now
        </NavLink>
      </div>
    </nav>
  );
}