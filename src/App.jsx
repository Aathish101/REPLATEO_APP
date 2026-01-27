import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// 🔐 ADMIN
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/Dashboard";
import Analytics from "./pages/Admin/Analytics";
import Orders from "./pages/Admin/Orders";
import Receivers from "./pages/Admin/Receivers";
import Settings from "./pages/Admin/Settings";
import UserManagement from "./pages/Admin/UserManagement";
import AdminRoute from "./components/AdminRoute";

// 🌍 USER
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

export default function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  const [authOpen, setAuthOpen] = useState(false);
  const [donationOpen, setDonationOpen] = useState(false);
  const [saleOpen, setSaleOpen] = useState(false);
  const [donationType, setDonationType] = useState(null);

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {/* ✅ Hide Navbar on Admin Pages */}
      {!isAdminPage && (
        <Navbar openAuthModal={() => setAuthOpen(true)} />
      )}

      <Routes>
        {/* 🌍 PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />

        <Route
          path="/edible"
          element={
            <GoodFood
              openDonationModal={() => {
                setDonationType("food");
                setDonationOpen(true);
              }}
              openSaleModal={() => setSaleOpen(true)}
            />
          }
        />

        <Route
          path="/non-edible"
          element={
            <NonEdible
              openDonationModal={() => {
                setDonationType("non-edible");
                setDonationOpen(true);
              }}
            />
          }
        />

        <Route
          path="/listings"
          element={<PublicListings openAuthModal={() => setAuthOpen(true)} />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard openAuthModal={() => setAuthOpen(true)} />}
        />

        <Route path="/directory" element={<Directory />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* 🔐 ADMIN AUTH */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* 🔐 ADMIN LAYOUT + PAGES */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="orders" element={<Orders />} />
          <Route path="receivers" element={<Receivers />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 🔁 FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* 🔔 MODALS (USER ONLY) */}
      {!isAdminPage && (
        <>
          <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />

          <DonationModal
            open={donationOpen}
            type={donationType}
            onClose={() => {
              setDonationOpen(false);
              setDonationType(null);
            }}
          />

          <SaleModal open={saleOpen} onClose={() => setSaleOpen(false)} />
        </>
      )}
    </div>
  );
}
