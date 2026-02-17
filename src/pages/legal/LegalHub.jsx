import React, { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import LegalFooter from "./LegalFooter"; 

export default function LegalHub() {
  const location = useLocation();

  // Scroll content to top whenever the URL changes
  useEffect(() => {
    const contentArea = document.getElementById("legal-content-area");
    if (contentArea) {
      contentArea.scrollTop = 0;
    }
  }, [location.pathname]);

  return (
    <div className="h-screen bg-white font-sans flex flex-col overflow-hidden">
      
      {/* 1. TOP HEADER */}
      <div className="w-full border-b border-gray-200 bg-white h-16 flex-none z-50">
        <div className="w-full px-4 h-full flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
                 <div className="w-8 h-8 bg-[#ff4500] rounded-lg flex items-center justify-center text-white font-bold text-lg">R</div>
                 <span className="text-2xl font-black text-gray-900 tracking-tight">REPLATEO</span>
            </Link>
            <div className="hidden md:flex gap-6 text-[14px] font-medium text-gray-500">
                <Link to="/" className="hover:text-black transition-colors">Back to Home</Link>
            </div>
        </div>
      </div>

      {/* 2. SPLIT LAYOUT */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT SIDEBAR (Using NavLink for auto-active states) */}
        <aside className="w-full md:w-64 flex-shrink-0 border-r border-gray-200 h-full overflow-y-auto bg-white hidden md:block">
          <div className="py-8 pl-4 pr-2">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 pl-2">
                Legal & Compliance
            </h2>
            <nav className="flex flex-col space-y-1">
              <SidebarLink to="/legal/guidelines" label="Guidelines and Policies" />
              <SidebarLink to="/legal/privacy" label="Privacy Policy" />
              <SidebarLink to="/legal/terms" label="Terms of Service" />
              <SidebarLink to="/legal/faqs" label="FAQs" />
              <SidebarLink to="/legal/security" label="Security" />
            </nav>
          </div>
        </aside>

        {/* RIGHT CONTENT AREA */}
        <main id="legal-content-area" className="flex-1 h-full overflow-y-auto px-6 md:pl-12 pt-8 pb-0 flex flex-col">
          
          <div className="flex-grow">
            {/* ✅ OUTLET: This is where React Router injects Terms.jsx, Privacy.jsx, etc. */}
            <Outlet />
          </div>

          <LegalFooter />

        </main>
      </div>
    </div>
  );
}

// Sidebar Link Component using NavLink
const SidebarLink = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      w-full text-left pl-4 pr-4 py-3 text-[14px] transition-all duration-150 block
      ${isActive 
        ? "border-l-[4px] border-[#ff4500] bg-orange-50 text-black font-bold" 
        : "border-l-[4px] border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50"}
    `}
  >
    {label}
  </NavLink>
);