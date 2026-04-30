import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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

import Login from "./pages/admin/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import BookingsAdmin from "./pages/admin/BookingsAdmin";
import ServicesAdmin from "./pages/admin/ServicesAdmin";
import GalleryAdmin from "./pages/admin/GalleryAdmin";
import CoursesAdmin from "./pages/admin/CoursesAdmin";
import ContactMessagesAdmin from "./pages/admin/ContactMessagesAdmin";
import BlogAdmin from "./pages/admin/BlogAdmin";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function ProtectedAdmin({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        <Route
          path="/services"
          element={
            <PublicLayout>
              <Services />
            </PublicLayout>
          }
        />

        <Route
          path="/gallery"
          element={
            <PublicLayout>
              <Gallery />
            </PublicLayout>
          }
        />

        <Route
          path="/booking"
          element={
            <PublicLayout>
              <Booking />
            </PublicLayout>
          }
        />

        <Route
          path="/branches"
          element={
            <PublicLayout>
              <Branches />
            </PublicLayout>
          }
        />

        <Route
          path="/academy"
          element={
            <PublicLayout>
              <Academy />
            </PublicLayout>
          }
        />

        <Route
          path="/blog"
          element={
            <PublicLayout>
              <Blog />
            </PublicLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<Login />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={<Navigate to="/admin/dashboard" replace />}
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdmin>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedAdmin>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <ProtectedAdmin>
              <AdminLayout>
                <BookingsAdmin />
              </AdminLayout>
            </ProtectedAdmin>
          }
        />

        <Route
          path="/admin/services"
          element={
            <ProtectedAdmin>
              <AdminLayout>
                <ServicesAdmin />
              </AdminLayout>
            </ProtectedAdmin>
          }
        />

        <Route
          path="/admin/gallery"
          element={
            <ProtectedAdmin>
              <AdminLayout>
                <GalleryAdmin />
              </AdminLayout>
            </ProtectedAdmin>
          }
        />

        <Route
          path="/admin/courses"
          element={
            <ProtectedAdmin>
              <AdminLayout>
                <CoursesAdmin />
              </AdminLayout>
            </ProtectedAdmin>
          }
        />

        <Route
          path="/admin/messages"
          element={
            <ProtectedAdmin>
              <AdminLayout>
                <ContactMessagesAdmin />
              </AdminLayout>
            </ProtectedAdmin>
          }
        />

        <Route
          path="/admin/blogs"
          element={
            <ProtectedAdmin>
              <AdminLayout>
                <BlogAdmin />
              </AdminLayout>
            </ProtectedAdmin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}