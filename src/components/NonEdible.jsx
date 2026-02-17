// src/components/NonEdible.jsx
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Recycle, Sprout, ArrowRight, Leaf, Factory, Droplets } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function NonEdible({ openDonationModal }) {
  const { scrollY } = useScroll();
  const { t } = useTranslation();

  // Smooth trailing cursor glow
  const mouseX = useSpring(0, { stiffness: 45, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 45, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Center the glow around the cursor
      mouseX.set(e.clientX - 400);
      mouseY.set(e.clientY - 400);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Parallax effect for the bottom section
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#fbfdfc]">
      {/* ================= INTERACTIVE HEADING-MATCHED GREEN GLOW ================= */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          style={{
            x: mouseX,
            y: mouseY,
            background:
              "radial-gradient(circle, rgba(6, 95, 70, 0.45) 0%, rgba(16, 185, 129, 0.2) 35%, rgba(16, 185, 129, 0) 70%)",
          }}
          className="absolute w-[800px] h-[800px] rounded-full blur-[90px]"
        />
      </div>

      {/* ================= CONTENT SECTION ================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* HEADER */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block p-3 bg-emerald-100 text-emerald-600 rounded-2xl mb-6"
          >
            <Recycle size={32} />
          </motion.div>

          {/* ✅ Big 2-line title, short text only */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-emerald-900 leading-tight mb-4">
            {t("nonEdible.hero.titleLine1")}
            <br />
            <span className="text-emerald-600">
              {t("nonEdible.hero.titleLine2")}
            </span>
          </h2>

          {/* ✅ Smaller subtitle paragraph */}
          <p className="text-base md:text-lg lg:text-xl text-emerald-800/70 mt-3 max-w-3xl mx-auto font-medium leading-relaxed">
            {t("nonEdible.hero.subtitle")}
          </p>
        </motion.div>

        {/* ACTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          {/* RECYCLING CARD */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -10 }}
            className="group relative p-12 rounded-[3rem] shadow-2xl bg-white/60 backdrop-blur-2xl border border-white/50 transition-all overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-12 text-emerald-500/5 group-hover:scale-110 transition-transform">
              <Factory size={180} />
            </div>

            <div className="bg-emerald-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-emerald-200">
              <Recycle size={32} />
            </div>

            <h3 className="text-3xl font-black text-emerald-900 mb-4">
              {t("nonEdible.cards.recycling.title")}
            </h3>
            <p className="text-emerald-800/70 text-lg mb-8 font-medium leading-relaxed">
              {t("nonEdible.cards.recycling.text")}
            </p>

            <motion.a
              href="/directory"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-emerald-600 text-white py-4 px-10 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition shadow-xl"
            >
              {t("nonEdible.cards.recycling.button")} <ArrowRight size={20} />
            </motion.a>
          </motion.div>

          {/* AGRICULTURE CARD */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -10 }}
            className="group relative p-12 rounded-[3rem] shadow-2xl bg-white/60 backdrop-blur-2xl border border-white/50 transition-all overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-12 text-emerald-500/5 group-hover:scale-110 transition-transform">
              <Leaf size={180} />
            </div>

            <div className="bg-emerald-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-emerald-200">
              <Sprout size={32} />
            </div>

            <h3 className="text-3xl font-black text-emerald-900 mb-4">
              {t("nonEdible.cards.agriculture.title")}
            </h3>
            <p className="text-emerald-800/70 text-lg mb-8 font-medium leading-relaxed">
              {t("nonEdible.cards.agriculture.text")}
            </p>

            <motion.button
              onClick={openDonationModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-emerald-900 text-white py-4 px-10 rounded-2xl font-bold text-lg hover:bg-black transition shadow-xl"
            >
              {t("nonEdible.cards.agriculture.button")} <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </div>

        {/* EXTRA INFO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{ y: y1 }}
          className="bg-emerald-900 rounded-[4rem] p-16 text-center text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-black mb-6">
              {t("nonEdible.info.title")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6">
                <div className="text-emerald-400 mb-4 flex justify-center">
                  <Droplets size={40} />
                </div>
                <h4 className="font-bold text-xl mb-2">
                  {t("nonEdible.info.methane.title")}
                </h4>
                <p className="text-emerald-100/70">
                  {t("nonEdible.info.methane.text")}
                </p>
              </div>

              <div className="p-6">
                <div className="text-emerald-400 mb-4 flex justify-center">
                  <Leaf size={40} />
                </div>
                <h4 className="font-bold text-xl mb-2">
                  {t("nonEdible.info.soil.title")}
                </h4>
                <p className="text-emerald-100/70">
                  {t("nonEdible.info.soil.text")}
                </p>
              </div>

              <div className="p-6">
                <div className="text-emerald-400 mb-4 flex justify-center">
                  <Recycle size={40} />
                </div>
                <h4 className="font-bold text-xl mb-2">
                  {t("nonEdible.info.energy.title")}
                </h4>
                <p className="text-emerald-100/70">
                  {t("nonEdible.info.energy.text")}
                </p>
              </div>
            </div>
          </div>

          {/* Background icon pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none flex flex-wrap gap-10 p-10">
            {[...Array(15)].map((_, i) => (
              <Recycle key={i} size={100} />
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}