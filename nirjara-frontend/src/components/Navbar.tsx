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
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[#E75480]/15 bg-white/95 px-4 py-4 shadow-sm backdrop-blur sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          className="shrink-0 font-serif text-xl leading-tight tracking-[3px] text-[#E75480] sm:text-2xl"
        >
          NIRJARA{" "}
          <span className="block italic tracking-[4px] text-[#C77A95] sm:inline">
            Beauty
          </span>
        </NavLink>

        <div className="hidden items-center gap-5 lg:flex xl:gap-8">
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
          className="hidden shrink-0 rounded-full bg-[#E75480] px-6 py-3 text-xs font-medium uppercase tracking-[2px] text-white shadow-md transition hover:bg-[#C93D68] lg:block"
        >
          Book Now
        </NavLink>

        <button
          onClick={() => setOpen(!open)}
          className="shrink-0 rounded-full border border-[#E75480]/25 bg-[#FFF5F8] px-5 py-2 text-xs font-medium uppercase tracking-[2px] text-[#E75480] shadow-sm transition hover:bg-[#FCE7EF] lg:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="absolute left-4 right-4 top-full mt-3 rounded-3xl border border-[#E75480]/10 bg-white/95 p-3 shadow-lg backdrop-blur sm:left-auto sm:right-6 sm:w-64 lg:hidden">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-xs uppercase tracking-[2px] transition ${
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
              className="rounded-2xl bg-[#E75480] px-4 py-3 text-center text-xs uppercase tracking-[2px] text-white"
            >
              Book Now
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}