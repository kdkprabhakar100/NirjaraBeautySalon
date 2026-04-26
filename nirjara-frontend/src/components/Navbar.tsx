type NavbarProps = {
  currentPage: string;
  setCurrentPage: (page: string) => void;
};

const navItems = ["Home", "Services", "Branches", "Academy", "Blog", "Contact"];

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const goToPage = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[#C9A84C]/20 bg-[#0F0D0A]/95 px-6 py-5 backdrop-blur md:px-12">
      <div className="flex items-center justify-between">
        <button
          onClick={() => goToPage("Home")}
          className="font-serif text-2xl tracking-[3px] text-[#C9A84C]"
        >
          NIRJARA <span className="italic text-[#E8D5A3]">Beauty</span>
        </button>

        <div className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => goToPage(item)}
              className={`text-xs uppercase tracking-[2px] transition ${
                currentPage === item ? "text-[#C9A84C]" : "text-[#A09070]"
              } hover:text-[#C9A84C]`}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          onClick={() => goToPage("Booking")}
          className="hidden border border-[#C9A84C] px-5 py-2 text-xs uppercase tracking-[2px] text-[#C9A84C] transition hover:bg-[#C9A84C] hover:text-[#0F0D0A] md:block"
        >
          Book Now
        </button>
      </div>
    </nav>
  );
}