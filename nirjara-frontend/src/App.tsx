import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

import Home from "./pages/public/Home";
import Services from "./pages/public/Services";
import Branches from "./pages/public/Branches";
import Academy from "./pages/public/Academy";
import Blog from "./pages/public/Blog";
import Contact from "./pages/public/Contact";
import Gallery from "./components/Gallery";
import Booking from "./pages/public/Booking";
import Careers from "./pages/public/Careers";

// ADMIN
import Login from "./pages/admin/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import BookingsAdmin from "./pages/admin/BookingsAdmin";
import ServicesAdmin from "./pages/admin/ServicesAdmin";
import GalleryAdmin from "./pages/admin/GalleryAdmin";
import CoursesAdmin from "./pages/admin/CoursesAdmin";
import ContactMessagesAdmin from "./pages/admin/ContactMessagesAdmin";
import BlogAdmin from "./pages/admin/BlogAdmin";
import AdminCareers from "./pages/admin/AdminCareers";

// PRODUCTS
import Products from "./pages/product/Products";
import ProductDetails from "./pages/product/ProductDetails";
import Cart from "./pages/product/Cart";
import Checkout from "./pages/product/Checkout";

// ADMIN ECOMMERCE
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";

//Admin Popup
import OfferPopup from "./components/OfferPopup";
import AdminPopup from "./pages/admin/AdminPopup";

//Admin Events
import AdminEvents from "./pages/admin/AdminEvents";
import Events from "./pages/public/Events";
import EventDetails from "./pages/public/EventDetails";

function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <OfferPopup />
      {/* FIXED NAVBAR SPACING */}
      <main >
        {children}
      </main>

      <Footer />

      <WhatsAppButton />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        {/* SERVICES */}
        <Route
          path="/services"
          element={
            <PublicLayout>
              <Services />
            </PublicLayout>
          }
        />

        {/* GALLERY */}
        <Route
          path="/gallery"
          element={
            <PublicLayout>
              <Gallery />
            </PublicLayout>
          }
        />

        {/* BRANCHES */}
        <Route
          path="/branches"
          element={
            <PublicLayout>
              <Branches />
            </PublicLayout>
          }
        />

        {/* ACADEMY */}
        <Route
          path="/academy"
          element={
            <PublicLayout>
              <Academy />
            </PublicLayout>
          }
        />

        {/* BLOG */}
        <Route
          path="/blog"
          element={
            <PublicLayout>
              <Blog />
            </PublicLayout>
          }
        />

        {/* CONTACT */}
        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />

        {/* BOOKING */}
        <Route
          path="/booking"
          element={
            <PublicLayout>
              <Booking />
            </PublicLayout>
          }
        />

        {/* PRODUCTS */}
        <Route
          path="/products"
          element={
            <PublicLayout>
              <Products />
            </PublicLayout>
          }
        />

        {/* PRODUCT DETAILS */}
        <Route
          path="/products/:id"
          element={
            <PublicLayout>
              <ProductDetails />
            </PublicLayout>
          }
        />

        {/* CART */}
        <Route
          path="/cart"
          element={
            <PublicLayout>
              <Cart />
            </PublicLayout>
          }
        />

        {/* CHECKOUT */}
        <Route
          path="/checkout"
          element={
            <PublicLayout>
              <Checkout />
            </PublicLayout>
          }
        />
        <Route 

        path="/careers"
         element={
          <PublicLayout>
           <Careers />
          </PublicLayout>
         } 
         />
        <Route
          path="/events/:id"
          element={
            <PublicLayout>
              <EventDetails />
            </PublicLayout>
          }
        />

        {/* ADMIN LOGIN */}
        <Route
          path="/admin/login"
          element={<Login />}
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />

        {/* ADMIN BOOKINGS */}
        <Route
          path="/admin/bookings"
          element={
            <AdminLayout>
              <BookingsAdmin />
            </AdminLayout>
          }
        />

        {/* ADMIN SERVICES */}
        <Route
          path="/admin/services"
          element={
            <AdminLayout>
              <ServicesAdmin />
            </AdminLayout>
          }
        />

        {/* ADMIN GALLERY */}
        <Route
          path="/admin/gallery"
          element={
            <AdminLayout>
              <GalleryAdmin />
            </AdminLayout>
          }
        />

        {/* ADMIN COURSES */}
        <Route
          path="/admin/courses"
          element={
            <AdminLayout>
              <CoursesAdmin />
            </AdminLayout>
          }
        />

        {/* ADMIN MESSAGES */}
        <Route
          path="/admin/messages"
          element={
            <AdminLayout>
              <ContactMessagesAdmin />
            </AdminLayout>
          }
        />

        {/* ADMIN BLOGS */}
        <Route
          path="/admin/blogs"
          element={
            <AdminLayout>
              <BlogAdmin />
            </AdminLayout>
          }
        />

        {/* ADMIN ORDERS */}
        <Route
          path="/admin/orders"
          element={
            <AdminLayout>
              <AdminOrders />
            </AdminLayout>
          }
        />

        {/* ADMIN PRODUCTS */}
        <Route
          path="/admin/products"
          element={
            <AdminLayout>
              <AdminProducts />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/popup"
          element={
            <AdminLayout>
              <AdminPopup />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/events"
          element={
            <AdminLayout>
              <AdminEvents />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/careers"
          element={
            <AdminLayout>
              <AdminCareers />
            </AdminLayout>
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
}