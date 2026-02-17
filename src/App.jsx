// src/App.jsx
import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Terms from "./pages/sections/terms";
import Privacy from "./pages/sections/Privacy";
import Guidelines from "./pages/sections/Guidelines";
import FAQs from "./pages/sections/FAQs";
import Security from "./pages/sections/Security";


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
import FoodWasteCollection from "./pages/Admin/FoodWasteCollection";
import Donors from "./pages/Admin/Donors";

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
import ResetPassword from "./components/ResetPassword";

export default function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  const isLegalPage = location.pathname.startsWith("/legal");
  const shouldHideNavbar = isAdminPage || isLegalPage;


  const [authOpen, setAuthOpen] = useState(false);
  const [donationOpen, setDonationOpen] = useState(false);
  const [saleOpen, setSaleOpen] = useState(false);
  const [donationType, setDonationType] = useState(null);

  return (
    <div className="w-full min-h-screen overflow-x-hidden">

      {/* ✅ Navbar */}
      {!shouldHideNavbar && <Navbar />}


      {/* ✅ Show Navbar only on USER pages */}
      {/* MODALS */}
      {!shouldHideNavbar && (
        <>
          <Navbar />
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
        <Route path="/reset-password" element={<ResetPassword />} />

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
          <Route path="food-waste" element={<FoodWasteCollection />} />
          <Route path="donors" element={<Donors />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="orders" element={<Orders />} />
          <Route path="receivers" element={<Receivers />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        {/* ⚖️ LEGAL ROUTES */}
        <Route path="/legal/terms" element={<Terms />} />
        <Route path="/legal/privacy" element={<Privacy />} />
        <Route path="/legal/guidelines" element={<Guidelines />} />
        <Route path="/legal/faqs" element={<FAQs />} />
        <Route path="/legal/security" element={<Security />} />


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