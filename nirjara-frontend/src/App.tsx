import { useState } from "react";

// Public Pages
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

// Admin Pages
import Login from "./pages/admin/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import BookingsAdmin from "./pages/admin/BookingsAdmin";
import ServicesAdmin from "./pages/admin/ServicesAdmin";
import GalleryAdmin from "./pages/admin/GalleryAdmin";
import CoursesAdmin from "./pages/admin/CoursesAdmin";

export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [activeAdminPage, setActiveAdminPage] = useState("Dashboard");

  const renderAdminPage = () => {
    switch (activeAdminPage) {
      case "Dashboard":
        return <Dashboard />;

      case "Bookings":
        return <BookingsAdmin />;

      case "Services":
        return <ServicesAdmin />;

      case "Gallery":
        return <GalleryAdmin />;

      case "Courses":
        return <CoursesAdmin />;

      default:
        return <Dashboard />;
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "Home":
        return <Home setCurrentPage={setCurrentPage} />;

      case "Services":
        return <Services />;

      case "Booking":
        return <Booking />;

      case "Gallery":
        return <Gallery />;

      case "Branches":
        return <Branches setCurrentPage={setCurrentPage} />;

      case "Academy":
        return <Academy />;

      case "Blog":
        return <Blog />;

      case "Contact":
        return <Contact />;

      case "Login":
        return <Login setCurrentPage={setCurrentPage} />;

      case "Admin": {
        const token = localStorage.getItem("adminToken");

        if (!token) {
          return <Login setCurrentPage={setCurrentPage} />;
        }

        return (
          <AdminLayout
            activeAdminPage={activeAdminPage}
            setActiveAdminPage={setActiveAdminPage}
            setCurrentPage={setCurrentPage}
          >
            {renderAdminPage()}
          </AdminLayout>
        );
      }

      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <>
      {currentPage !== "Admin" && currentPage !== "Login" && (
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}

      {renderPage()}

      {currentPage !== "Admin" && currentPage !== "Login" && (
        <Footer setCurrentPage={setCurrentPage} />
      )}

      {currentPage !== "Admin" && currentPage !== "Login" && <WhatsAppButton />}
    </>
  );
}