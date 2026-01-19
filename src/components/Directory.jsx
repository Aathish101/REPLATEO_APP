import React, { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import { useToast } from "../context/ToastContext";

export default function Directory() {
  const { addToast } = useToast();

  // 1. Setup Mouse Tracking with "High Intensity" Spring settings
  // Stiffness and damping adjusted for a smooth but responsive trail
  const mouseX = useSpring(0, { stiffness: 40, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 40, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Centers the 800px glow on the cursor
      mouseX.set(e.clientX - 400);
      mouseY.set(e.clientY - 400);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="page-section relative min-h-screen overflow-hidden">
      
      {/* ================= HIGH INTENSITY ORANGE GLOW ================= */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          style={{
            x: mouseX,
            y: mouseY,
            // Increased opacity and added a stronger middle color stop for better visibility
            background: "radial-gradient(circle, rgba(255, 120, 40, 0.45) 0%, rgba(255, 160, 80, 0.25) 35%, rgba(255, 255, 255, 0) 70%)"
          }}
          className="absolute w-[800px] h-[800px] rounded-full blur-[90px]"
        />
      </div>

      {/* BACKGROUND FALLBACK */}
      <div className="absolute inset-0 -z-10 bg-white" />

      {/* ================= CONTENT SECTION ================= */}
      <div className="page-container relative z-10">
        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-5xl font-extrabold text-orange-800 drop-shadow-sm">
            Recycling & NGO Directory
          </h2>
          <p className="text-lg text-orange-700 mt-3 max-w-2xl mx-auto">
            Connect with trusted recycling partners, NGOs, and agricultural organizations
            who responsibly manage food waste.
          </p>
        </div>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
          {[
            {
              img: "https://i.ibb.co/8D9F3L14/24721219-6896001.jpg",
              title: "Community Food Bank",
              text: "Accepts edible surplus food and distributes to shelters & child-care centers.",
              action: "Contact",
              toast: "Contact request sent!",
              color: "orange",
            },
            {
              img: "https://i.ibb.co/hRhnYrLb/assortment-compost-made-rotten-food-with-copy-space.jpg",
              title: "GreenCycle Composters",
              text: "Transforms non-edible food waste into compost and bio-organic fertilizer.",
              action: "Request Pickup",
              toast: "Pickup request created!",
              color: "emerald",
            },
            {
              img: "https://i.ibb.co/n8rjK4kF/Idyllic-farm-sunset-with-red-barn-tractor-and-freerange-chickens-Premium-AI-generated-image.jpg",
              title: "AgroFarm Collective",
              text: "Works with farmers to recycle food byproducts into soil boosters.",
              action: "Send Request",
              toast: "Farm request submitted!",
              color: "emerald",
            },
          ].map((p, index) => (
            <div
              key={index}
              className="
                flex gap-6 p-8 rounded-3xl 
                bg-white/40 backdrop-blur-xl border border-white/30 
                shadow-xl shadow-orange-200/30 transition-all
                hover:scale-[1.02] hover:shadow-orange-300/40
              "
            >
              {/* IMAGE */}
              <div className="w-28 h-28 flex-shrink-0">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full rounded-2xl object-cover shadow-md"
                />
              </div>

              {/* CONTENT */}
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-orange-800">{p.title}</h3>
                <p className="text-orange-700 mt-3">{p.text}</p>

                <button
                  onClick={() => addToast(p.toast, "success")}
                  className={`mt-6 py-2 px-6 rounded-xl text-white shadow-md hover:shadow-lg transition
                    ${p.color === "orange" ? "bg-orange-600 hover:bg-orange-700" : ""}
                    ${p.color === "emerald" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                    ${p.color === "purple" ? "bg-purple-600 hover:bg-purple-700" : ""}
                  `}
                >
                  {p.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}