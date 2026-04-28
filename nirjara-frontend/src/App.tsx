import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/public/Home";
import Services from "./pages/public/Services";
import Booking from "./pages/public/Booking";
import Branches from "./pages/public/Branches";

export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");

  return (
    <>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {currentPage === "Home" && <Home setCurrentPage={setCurrentPage} />}

      {currentPage === "Services" && <Services setCurrentPage={setCurrentPage} />}

      {currentPage === "Booking" && <Booking />}

      {currentPage === "Branches" && <Branches setCurrentPage={setCurrentPage} />}

      {currentPage !== "Home" && currentPage !== "Services" && currentPage !== "Booking" && currentPage !== "Branches" && (
        <main className="min-h-screen bg-[#0F0D0A] px-6 pt-32 text-[#F5F0E8]">
          <h1 className="font-serif text-5xl text-[#C9A84C]">
            {currentPage}
          </h1>
          <p className="mt-4 text-[#A09070]">
            This page will be built next.
          </p>
        </main>
      )}
    </>
  );
}