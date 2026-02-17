import React from "react";
import { Link } from "react-router-dom";

export default function Security() {
  return (
    <div className="animate-fade-in max-w-4xl">
       <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-6">
          <Link to="/" className="hover:text-black">Home</Link> 
          <span className="text-gray-300">/</span>
          <span className="text-gray-800">Security</span>
       </div>
       <div className="w-full h-60 bg-gray-800 rounded-lg mb-8 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40"></div>
          <h1 className="relative z-10 text-4xl font-bold text-white">Security @ Replateo</h1>
       </div>
       
       <h3 className="text-lg font-bold text-gray-800 mb-2">Help keep Replateo safe</h3>
       <p className="text-gray-600 leading-7 text-[15px]">
          We take security seriously at Replateo. If you are a security researcher, 
          we would appreciate you disclosing any issues to us responsibly.
       </p>
    </div>
  );
}