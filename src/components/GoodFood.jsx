// src/components/GoodFood.jsx
import React, { useState, useEffect } from "react";
import {
  HandHeart,
  UploadCloud,
  ShieldCheck,
  Truck,
  Utensils,
  Heart,
  ChevronRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function GoodFood({ openDonationModal }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { t } = useTranslation();

  useEffect(() => {
    const handleMouseMove = (e) => {
      // same behaviour as before: track cursor and update glow
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="page-section relative overflow-hidden min-h-screen bg-white pb-20">
      {/* HIGH-VISIBILITY DYNAMIC GLOW (Home Page Style) */}
      <div className="absolute inset-0 -z-5 pointer-events-none">
        {/* Primary Large Glow */}
        <div
          className="absolute w-[900px] h-[900px] bg-orange-300/40 rounded-full blur-[140px] transition-transform duration-700 ease-out"
          style={{
            transform: `translate(${mousePos.x - 450}px, ${
              mousePos.y - 450
            }px)`,
            background:
              "radial-gradient(circle, rgba(251,146,60,0.4) 0%, rgba(251,146,60,0) 70%)",
          }}
        />
        {/* Secondary Intense Core */}
        <div
          className="absolute w-[500px] h-[500px] bg-orange-400/30 rounded-full blur-[100px] transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePos.x - 250}px, ${
              mousePos.y - 250
            }px)`,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        {/* HEADER SECTION */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black text-orange-900 mb-6 tracking-tight">
            {t("home.title").split("Surplus Food")[0]}
            <br />
            <span className="text-orange-600">
              {t("home.title").includes("Surplus Food")
                ? "Surplus Food"
                : t("home.title")}
            </span>
          </h1>
          <p className="text-gray-700 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            {t("home.subtitle")}
          </p>
        </div>

        {/* ACTION CARDS */}
        <div className="grid md:grid-cols-2 gap-10 items-stretch max-w-5xl mx-auto mb-28">
          {/* DONATE CARD */}
          <div className="bg-white/70 backdrop-blur-md p-12 rounded-[45px] shadow-2xl shadow-orange-200/40 border border-white flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 group">
            <div className="bg-orange-600 p-6 rounded-3xl mb-8 shadow-lg shadow-orange-300 group-hover:rotate-6 transition-transform">
              <HandHeart className="text-white w-10 h-10" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {t("home.cardDonate.title")}
            </h3>
            <p className="text-gray-700 text-lg mb-10 flex-grow leading-relaxed">
              {t("home.cardDonate.text")}
            </p>
            <button
              onClick={openDonationModal}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-12 rounded-2xl transition-all shadow-lg shadow-orange-300 active:scale-95"
            >
              {t("buttons.donate")} <ChevronRight size={20} />
            </button>
          </div>

          {/* EXPLORE CARD */}
          <div className="bg-white/70 backdrop-blur-md p-12 rounded-[45px] shadow-2xl shadow-orange-200/40 border border-white flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 group">
            <div className="bg-orange-600 p-6 rounded-3xl mb-8 shadow-lg shadow-orange-300 group-hover:rotate-6 transition-transform">
              <UploadCloud className="text-white w-10 h-10" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {t("home.cardListings.title")}
            </h3>
            <p className="text-gray-700 text-lg mb-10 flex-grow leading-relaxed">
              {t("home.cardListings.text")}
            </p>
            <a
              href="/listings"
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-12 rounded-2xl transition-all shadow-lg shadow-orange-300 active:scale-95"
            >
              {t("buttons.listings")} <ChevronRight size={20} />
            </a>
          </div>
        </div>

        {/* BOTTOM SECTION: WHY DONATE */}
        <div className="relative bg-orange-100/40 backdrop-blur-sm rounded-[50px] p-16 overflow-hidden border border-orange-200/50">
          <Utensils className="absolute top-10 right-10 text-orange-300/30 w-24 h-24 -rotate-12" />
          <Heart className="absolute bottom-10 left-10 text-orange-300/30 w-20 h-20 rotate-12" />

          <h2 className="text-4xl font-black text-center text-orange-900 mb-16 relative z-10">
            {t("edible.why.title")}
          </h2>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto relative z-10">
            {/* Safety First */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-white p-5 rounded-2xl mb-6 shadow-md shadow-orange-100">
                <ShieldCheck className="text-orange-600 w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                {t("edible.why.safety.title")}
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {t("edible.why.safety.text")}
              </p>
            </div>

            {/* Immediate Impact */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-white p-5 rounded-2xl mb-6 shadow-md shadow-orange-100">
                <Truck className="text-orange-600 w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                {t("edible.why.impact.title")}
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {t("edible.why.impact.text")}
              </p>
            </div>

            {/* Empower Lives */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-white p-5 rounded-2xl mb-6 shadow-md shadow-orange-100">
                <Heart className="text-orange-600 w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                {t("edible.why.empower.title")}
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {t("edible.why.empower.text")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}