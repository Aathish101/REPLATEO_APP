// src/components/Directory.jsx
import React, { useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import { useToast } from "../context/ToastContext";
import { useTranslation } from "react-i18next";

export default function Directory() {
  const { addToast } = useToast();
  const { t } = useTranslation();

  /* ================= CURSOR GLOW ================= */
  const mouseX = useSpring(0, { stiffness: 40, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 40, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 400);
      mouseY.set(e.clientY - 400);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const cards = [
    {
      img: "https://i.ibb.co/8D9F3L14/24721219-6896001.jpg",
      titleKey: "directory.card1.title",
      textKey: "directory.card1.text",
      buttonKey: "directory.card1.button",
      toastKey: "directory.toast.contact",
      color: "orange",
    },
    {
      img: "https://i.ibb.co/hRhnYrLb/assortment-compost-made-rotten-food-with-copy-space.jpg",
      titleKey: "directory.card2.title",
      textKey: "directory.card2.text",
      buttonKey: "directory.card2.button",
      toastKey: "directory.toast.pickup",
      color: "emerald",
    },
    {
      img: "https://i.ibb.co/n8rjK4kF/Idyllic-farm-sunset-with-red-barn-tractor-and-freerange-chickens-Premium-AI-generated-image.jpg",
      titleKey: "directory.card3.title",
      textKey: "directory.card3.text",
      buttonKey: "directory.card3.button",
      toastKey: "directory.toast.farm",
      color: "emerald",
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* ================= GLOW ================= */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          style={{
            x: mouseX,
            y: mouseY,
            background:
              "radial-gradient(circle, rgba(255,120,40,0.45) 0%, rgba(255,160,80,0.25) 35%, rgba(255,255,255,0) 70%)",
          }}
          className="absolute w-[800px] h-[800px] rounded-full blur-[90px]"
        />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* HEADER */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-extrabold text-orange-800">
            {t("directory.title")}
          </h2>
          <p className="mt-4 text-lg text-orange-700 max-w-2xl mx-auto">
            {t("directory.subtitle")}
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-14 place-items-center">
          {cards.map((p, index) => (
            <div
              key={index}
              className="
                w-full max-w-sm h-full
                flex flex-col items-center text-center
                p-10 rounded-3xl
                bg-white/50 backdrop-blur-xl
                border border-white/30
                shadow-xl shadow-orange-200/30
                transition-transform
                hover:scale-[1.03]
              "
            >
              {/* IMAGE */}
              <img
                src={p.img}
                alt={t(p.titleKey)}
                className="w-28 h-28 rounded-2xl object-cover shadow-md mb-6"
              />

              {/* TITLE */}
              <h3 className="text-2xl font-bold text-orange-800">
                {t(p.titleKey)}
              </h3>

              {/* TEXT */}
              <p className="mt-4 text-orange-700 flex-grow">
                {t(p.textKey)}
              </p>

              {/* BUTTON */}
              <button
                onClick={() => addToast(t(p.toastKey), "success")}
                className={`
                  mt-8 px-8 py-3 rounded-xl text-white font-medium
                  shadow-md hover:shadow-lg transition
                  ${
                    p.color === "orange"
                      ? "bg-orange-600 hover:bg-orange-700"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  }
                `}
              >
                {t(p.buttonKey)}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}