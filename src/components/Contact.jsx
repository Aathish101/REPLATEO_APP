import { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import { useToast } from "../context/ToastContext";

export default function Contact() {
  const { addToast } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // 1. Setup Mouse Tracking for Glow
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

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast("Your message has been sent!", "success");

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section className="page-section relative min-h-screen overflow-hidden bg-white">
      
      {/* ================= INTERACTIVE ORANGE GLOW ================= */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          style={{
            x: mouseX,
            y: mouseY,
            // High intensity orange gradient matching the home page
            background: "radial-gradient(circle, rgba(255, 120, 40, 0.45) 0%, rgba(255, 160, 80, 0.25) 35%, rgba(255, 255, 255, 0) 70%)"
          }}
          className="absolute w-[800px] h-[800px] rounded-full blur-[90px]"
        />
      </div>

      <div className="page-container relative z-10">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-5xl font-extrabold text-orange-800 drop-shadow-sm">
            Contact & Support
          </h2>
          <p className="text-lg text-orange-700 mt-3 max-w-2xl mx-auto">
            Have questions, need help, or want to partner with us?  
            We’re here to support you.
          </p>
        </div>

        {/* FORM CARD */}
        <div
          className="
            max-w-xl mx-auto p-10 rounded-3xl
            bg-white/40 backdrop-blur-xl border border-white/30
            shadow-xl shadow-orange-300/30
          "
        >
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* NAME */}
            <div>
              <label className="text-orange-800 font-semibold">Full Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter your name"
                className="
                  w-full p-3 mt-1 rounded-xl 
                  bg-white/50 border border-white/40
                  focus:ring-2 focus:ring-orange-400 
                  focus:bg-white/70 transition
                "
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-orange-800 font-semibold">Email Address</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Enter your email"
                className="
                  w-full p-3 mt-1 rounded-xl 
                  bg-white/50 border border-white/40
                  focus:ring-2 focus:ring-orange-400 
                  focus:bg-white/70 transition
                "
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label className="text-orange-800 font-semibold">Message</label>
              <textarea
                rows="5"
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="How can we assist you?"
                className="
                  w-full p-3 mt-1 rounded-xl 
                  bg-white/50 border border-white/40
                  focus:ring-2 focus:ring-orange-400 
                  focus:bg-white/70 transition
                "
              ></textarea>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="
                w-full py-3 rounded-xl font-semibold text-white 
                bg-orange-600 hover:bg-orange-700 
                shadow-lg shadow-orange-400/40 
                transition
              "
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}