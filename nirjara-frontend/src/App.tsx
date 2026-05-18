import { BrowserRouter, Routes, Route } from "react-router-dom";

// PUBLIC LAYOUT
import PublicLayout from "./pages/public/PublicLayout";

// PUBLIC PAGES
import Home from "./pages/Home";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Branches from "./pages/Branches";
import Academy from "./pages/Academy";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

// PRODUCT PAGES
import Products from "./pages/product/Products";
import ProductDetails from "./pages/product/ProductDetails";
import Cart from "./pages/product/Cart";
import Checkout from "./pages/product/Checkout";

// ADMIN
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminServices from "./pages/admin/AdminServices";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AdminProducts from "./pages/admin/AdminProducts";

// AUTH
import Login from "./pages/admin/Login";

function App() {
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

        {/* PRODUCTS */}
        <Route
          path="/products"
          element={
            <PublicLayout>
              <Products />
            </PublicLayout>
          }
        />

        <Route
          path="/products/:id"
          element={
            <PublicLayout>
              <ProductDetails />
            </PublicLayout>
          }
        />

        <Route
          path="/cart"
          element={
            <PublicLayout>
              <Cart />
            </PublicLayout>
          }
        />

        <Route
          path="/checkout"
          element={
            <PublicLayout>
              <Checkout />
            </PublicLayout>
          }
        />

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<Login />} />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/services"
          element={
            <AdminLayout>
              <AdminServices />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/gallery"
          element={
            <AdminLayout>
              <AdminGallery />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/courses"
          element={
            <AdminLayout>
              <AdminCourses />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/blogs"
          element={
            <AdminLayout>
              <AdminBlogs />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminLayout>
              <AdminProducts />
            </AdminLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;