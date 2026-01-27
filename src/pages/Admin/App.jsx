import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// --- USER COMPONENTS ---
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import GoodFood from "./components/GoodFood";
import NonEdible from "./components/NonEdible";
import PublicListings from "./components/PublicListings";
import Dashboard from "./components/Dashboard";
import Directory from "./components/Directory";
import Contact from "./components/Contact";
import AuthPage from "./components/AuthPage";
import ForgotPassword from "./components/ForgotPassword";

import AuthModal from "./components/AuthModal";
import DonationModal from "./components/DonationModal";
import SaleModal from "./components/SaleModal";

// --- ADMIN ---
import AdminLogin from "./pages/admin/AdminLogin";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import { AdminAuthProvider } from "./context/AdminAuthContext";

import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/Dashboard";
import FoodWasteCollection from "./components/admin/FoodWasteCollection";
import Donors from "./components/admin/Donors";
import Receivers from "./components/admin/Receivers";
import Orders from "./components/admin/Orders";
import Analytics from "./components/admin/Analytics";
import UserManagement from "./components/admin/UserManagement";
import Settings from "./components/admin/Settings";

export default function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const [donationOpen, setDonationOpen] = useState(false);
  const [saleOpen, setSaleOpen] = useState(false);
  const [donationType, setDonationType] = useState(null);

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <AdminAuthProvider>
      <div className="w-full min-h-screen overflow-x-hidden">

        {/* USER NAVBAR */}
        {!isAdminRoute && (
          <Navbar openAuthModal={() => setAuthOpen(true)} />
        )}

        <Routes>

          {/* ---------- USER ROUTES ---------- */}
          <Route path="/" element={<Home />} />
          <Route path="/edible" element={<GoodFood />} />
          <Route path="/non-edible" element={<NonEdible />} />
          <Route path="/listings" element={<PublicListings />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

         {/* --- ADMIN ROUTES --- */}
<Route path="/admin/login" element={<AdminLogin />} />

<Route
  path="/admin"
  element={
    <AdminProtectedRoute>
      <AdminLayout />
    </AdminProtectedRoute>
  }
>
  <Route path="dashboard" element={<AdminDashboard />} />
  <Route path="food-waste" element={<FoodWasteCollection />} />
  <Route path="donors" element={<Donors />} />
  <Route path="receivers" element={<Receivers />} />
  <Route path="orders" element={<Orders />} />
  <Route path="analytics" element={<Analytics />} />
  <Route path="users" element={<UserManagement />} />
  <Route path="settings" element={<Settings />} />
</Route>

          {/* ---------- FALLBACK ---------- */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

        {/* ---------- MODALS ---------- */}
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
        <DonationModal
          open={donationOpen}
          type={donationType}
          onClose={() => setDonationOpen(false)}
        />
        <SaleModal open={saleOpen} onClose={() => setSaleOpen(false)} />

      </div>
    </AdminAuthProvider>
  );
}