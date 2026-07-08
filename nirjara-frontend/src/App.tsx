import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import OfferPopup from "./components/OfferPopup";

import Home from "./pages/public/Home";
import Services from "./pages/public/Services";
import Branches from "./pages/public/Branches";
import Academy from "./pages/public/Academy";
import Blog from "./pages/public/Blog";
import Contact from "./pages/public/Contact";
import Gallery from "./components/Gallery";
import Booking from "./pages/public/Booking";
import Events from "./pages/public/Events";
import EventDetails from "./pages/public/EventDetails";
import Careers from "./pages/public/Careers";

import Login from "./pages/admin/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import BookingsAdmin from "./pages/admin/BookingsAdmin";
import ServicesAdmin from "./pages/admin/ServicesAdmin";
import GalleryAdmin from "./pages/admin/GalleryAdmin";
import CoursesAdmin from "./pages/admin/CoursesAdmin";
import ContactMessagesAdmin from "./pages/admin/ContactMessagesAdmin";
import BlogAdmin from "./pages/admin/BlogAdmin";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminPopup from "./pages/admin/AdminPopup";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminCareers from "./pages/admin/AdminCareers";

import Products from "./pages/product/Products";
import ProductDetails from "./pages/product/ProductDetails";
import Cart from "./pages/product/Cart";
import Checkout from "./pages/product/Checkout";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <OfferPopup />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
        <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
        <Route path="/branches" element={<PublicLayout><Branches /></PublicLayout>} />
        <Route path="/academy" element={<PublicLayout><Academy /></PublicLayout>} />
        <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/booking" element={<PublicLayout><Booking /></PublicLayout>} />
        <Route path="/products" element={<PublicLayout><Products /></PublicLayout>} />
        <Route path="/products/:id" element={<PublicLayout><ProductDetails /></PublicLayout>} />
        <Route path="/cart" element={<PublicLayout><Cart /></PublicLayout>} />
        <Route path="/checkout" element={<PublicLayout><Checkout /></PublicLayout>} />
        <Route path="/events" element={<PublicLayout><Events /></PublicLayout>} />
        <Route path="/events/:id" element={<PublicLayout><EventDetails /></PublicLayout>} />
        <Route path="/careers" element={<PublicLayout><Careers /></PublicLayout>} />

        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/admin/bookings" element={<AdminLayout><BookingsAdmin /></AdminLayout>} />
        <Route path="/admin/services" element={<AdminLayout><ServicesAdmin /></AdminLayout>} />
        <Route path="/admin/gallery" element={<AdminLayout><GalleryAdmin /></AdminLayout>} />
        <Route path="/admin/courses" element={<AdminLayout><CoursesAdmin /></AdminLayout>} />
        <Route path="/admin/messages" element={<AdminLayout><ContactMessagesAdmin /></AdminLayout>} />
        <Route path="/admin/blogs" element={<AdminLayout><BlogAdmin /></AdminLayout>} />
        <Route path="/admin/orders" element={<AdminLayout><AdminOrders /></AdminLayout>} />
        <Route path="/admin/products" element={<AdminLayout><AdminProducts /></AdminLayout>} />
        <Route path="/admin/popup" element={<AdminLayout><AdminPopup /></AdminLayout>} />
        <Route path="/admin/events" element={<AdminLayout><AdminEvents /></AdminLayout>} />
        <Route path="/admin/careers" element={<AdminLayout><AdminCareers /></AdminLayout>} />
      </Routes>
    </BrowserRouter>
  );
}