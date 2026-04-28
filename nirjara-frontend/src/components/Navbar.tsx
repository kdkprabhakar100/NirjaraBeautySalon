type NavbarProps = {
  currentPage: string;
  setCurrentPage: (page: string) => void;
};

const navItems = ["Home", "Services", "Gallery", "Branches", "Academy", "Blog", "Contact"];

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const goToPage = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[#E75480]/15 bg-white/90 px-6 py-5 shadow-sm backdrop-blur md:px-12">
      <div className="flex items-center justify-between">
        <button
          onClick={() => goToPage("Home")}
          className="font-serif text-2xl tracking-[3px] text-[#E75480]"
        >
          NIRJARA <span className="italic text-[#C77A95]">Beauty</span>
        </button>

        <div className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => goToPage(item)}
              className={`text-xs uppercase tracking-[2px] transition ${
                currentPage === item ? "text-[#E75480]" : "text-[#8A6F78]"
              } hover:text-[#E75480]`}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          onClick={() => goToPage("Booking")}
          className="hidden rounded-full bg-[#E75480] px-6 py-3 text-xs font-medium uppercase tracking-[2px] text-white shadow-md transition hover:bg-[#C93D68] md:block"
        >
          Book Now
        </button>
      </div>
    </nav>
  );
}