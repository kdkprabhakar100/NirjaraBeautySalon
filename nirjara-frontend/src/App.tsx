import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

import Home from "./pages/public/Home";
import Services from "./pages/public/Services";
import Booking from "./pages/public/Booking";
import Branches from "./pages/public/Branches";
import Academy from "./pages/public/Academy";
import Blog from "./pages/public/Blog";
import Contact from "./pages/public/Contact";
import Gallery from "./components/Gallery";

export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");

  const renderPage = () => {
    switch (currentPage) {
      case "Home":
        return <Home setCurrentPage={setCurrentPage} />;

      case "Services":
        return <Services setCurrentPage={setCurrentPage} />;

      case "Booking":
        return <Booking />;

      case "Gallery":
        return <Gallery />;

      case "Branches":
        return <Branches setCurrentPage={setCurrentPage} />;

      case "Academy":
        return <Academy setCurrentPage={setCurrentPage} />;

      case "Blog":
        return <Blog />;

      case "Contact":
        return <Contact />;

      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {renderPage()}

      <Footer setCurrentPage={setCurrentPage} />
      <WhatsAppButton />
    </>
  );
}