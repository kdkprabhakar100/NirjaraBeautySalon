import { useState } from "react";
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
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[#E75480]/15 bg-white/90 px-6 py-5 shadow-sm backdrop-blur md:px-12">      <div className="flex items-center justify-between">
        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          className="font-serif text-2xl tracking-[3px] text-[#E75480]"
        >
          NIRJARA <span className="italic text-[#C77A95]">Beauty</span>
        </NavLink>

        {/* Desktop / tablet menu */}
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

        {/* Mobile dropdown button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-full border border-[#E75480]/25 bg-[#FFF5F8] px-5 py-2 text-xs font-medium uppercase tracking-[2px] text-[#E75480] shadow-sm transition hover:bg-[#FCE7EF] md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile dropdown menu */}
{open && (
  <div className="absolute right-6 top-full mt-3 w-52 rounded-3xl border border-[#E75480]/10 bg-white/95 p-3 shadow-lg backdrop-blur md:hidden">
    <div className="grid gap-2">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `rounded-2xl px-4 py-2 text-xs uppercase tracking-[2px] transition ${
              isActive
                ? "bg-[#E75480] text-white"
                : "bg-[#FFF5F8] text-[#8A6F78]"
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}

      <NavLink
        to="/booking"
        onClick={() => setOpen(false)}
        className="rounded-2xl bg-[#E75480] px-4 py-2 text-center text-xs uppercase tracking-[2px] text-white"
      >
        Book Now
      </NavLink>
    </div>
  </div>
)}
    </nav>
  );
}