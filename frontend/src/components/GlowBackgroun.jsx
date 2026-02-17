import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function GlowBackground() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  // Parallax movement for the static background orbs
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 bg-[#fff7ed] overflow-hidden pointer-events-none">
      {/* 1. MOUSE FOLLOWING GLOW */}
      <motion.div
        animate={{ 
          x: mouse.x - 250, 
          y: mouse.y - 250 
        }}
        transition={{ type: "spring", damping: 30, stiffness: 60 }}
        className="absolute w-[500px] h-[500px] bg-orange-300/60 rounded-full blur-[100px]"
      />

      {/* 2. TOP LEFT FLOATING ORB (Parallax) */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[10%] left-[10%] w-64 h-64 bg-orange-400/20 rounded-full blur-[80px]"
      />

      {/* 3. BOTTOM RIGHT FLOATING ORB (Parallax) */}
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-[20%] right-[15%] w-80 h-80 bg-green-300/20 rounded-full blur-[100px]"
      />
    </div>
  );
}