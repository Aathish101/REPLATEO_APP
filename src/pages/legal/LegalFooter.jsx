import React from "react";
import { Link } from "react-router-dom";

export default function LegalFooter() {
  return (
    <footer className="w-full bg-[#f8f9fa] border-t border-gray-200 mt-20">
      
      {/* ✅ ADDED: mx-auto to perfectly center the content and remove the weird left gap */}
      <div className="w-full max-w-6xl mx-auto px-8 md:px-12 py-16">
        
        {/* Adjusted grid to distribute columns evenly */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-16">
          
          {/* Column 1: Company Info */}
          <div>
            <h5 className="text-gray-900 font-bold uppercase tracking-widest text-[12px] mb-5">Company</h5>
            <ul className="flex flex-col gap-3 text-[14px] text-gray-500 font-medium">
                <li><Link to="/" className="hover:text-black transition-colors">Who We Are</Link></li>
                <li><Link to="/" className="hover:text-black transition-colors">Impact</Link></li>
                <li><Link to="/" className="hover:text-black transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 2: Legal Access */}
          <div>
            <h5 className="text-gray-900 font-bold uppercase tracking-widest text-[12px] mb-5">Legal Access</h5>
            <ul className="flex flex-col gap-3 text-[14px] text-gray-500 font-medium">
                <li><Link to="/legal/terms" className="hover:text-black transition-colors">Terms of Service</Link></li>
                <li><Link to="/legal/privacy" className="hover:text-black transition-colors">Privacy Policy</Link></li>
                <li><Link to="/legal/guidelines" className="hover:text-black transition-colors">Guidelines</Link></li>
                <li><Link to="/legal/faqs" className="hover:text-black transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Column 3: Partner Info */}
          <div>
            <h5 className="text-gray-900 font-bold uppercase tracking-widest text-[12px] mb-5">For Partners</h5>
            <ul className="flex flex-col gap-3 text-[14px] text-gray-500 font-medium">
                <li><Link to="/" className="hover:text-black transition-colors">Caterers</Link></li>
                <li><Link to="/" className="hover:text-black transition-colors">NGO Partners</Link></li>
            </ul>
          </div>

          {/* Column 4: Selectors (Right-aligned on desktop) */}
          <div className="flex flex-col items-start md:items-end space-y-4">
              <div className="flex items-center gap-3 w-36 border border-gray-300 px-4 py-2.5 rounded-lg bg-white text-[13px] text-gray-700 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="text-base">🇮🇳</span> <span className="font-medium">India</span>
              </div>
              <div className="flex items-center gap-3 w-36 border border-gray-300 px-4 py-2.5 rounded-lg bg-white text-[13px] text-gray-700 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="text-base text-blue-600">🌐</span> <span className="font-medium">English</span>
              </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 mb-8" />
        
        {/* Copyright and Bottom Text */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 text-[13px] text-gray-500 leading-relaxed">
          <div className="max-w-3xl">
            <p className="mb-2">
              Replateo is a digital platform dedicated to reducing food waste by connecting verified caterers with NGOs. 
              By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. 
            </p>
            <p className="text-gray-400">
              All trademarks are properties of their respective owners. 2020-2026 © Replateo Technologies Ltd. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}