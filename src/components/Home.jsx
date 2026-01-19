import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion"; 
import { useNavigate } from "react-router-dom"; 
import FoodPlate from "../assets/ReplateoSoru.png"; 
import { Instagram } from "lucide-react";

import { 
  Leaf, Users, Utensils, CheckCircle2, 
  Mail, Phone, MapPin, Heart, ArrowRight, Recycle,
  InstagramIcon
} from "lucide-react";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  const navigate = useNavigate(); 
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  // Hover states for dynamic images
  const [isHoveringDonate, setIsHoveringDonate] = useState(false);
  const [isHoveringRecycle, setIsHoveringRecycle] = useState(false);

  // Parallax effect for background orbs
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  useEffect(() => {
    const move = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Images for the scrolling gallery
  const foodImages = [
    "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=400",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400",
    "https://images.unsplash.com/photo-1543353071-10c8ba85a904?q=80&w=400",
    "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=400",
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=400",
    "https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=400",
  ];

  return (
    <>
      {/* INTERACTIVE BACKGROUND */}
      <div className="fixed inset-0 -z-50 bg-[#fff7ed] overflow-hidden">
        <motion.div 
          animate={{ x: mouse.x - 250, y: mouse.y - 250 }}
          transition={{ type: "spring", damping: 30, stiffness: 60 }}
          className="absolute w-[500px] h-[500px] bg-orange-300/60 rounded-full blur-[100px] pointer-events-none"
        />

        <motion.div 
          style={{ y: y1 }}
          className="absolute top-[10%] left-[10%] w-64 h-64 bg-orange-400/20 rounded-full blur-[80px]"
        />

        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-[20%] right-[15%] w-80 h-80 bg-green-300/20 rounded-full blur-[100px]"
        />
      </div>

      <section className="relative z-10 overflow-x-hidden">
        {/* ================= HERO SECTION ================= */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 py-36 min-h-screen items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 
              whileHover={{ scale: 1.02, color: "#ff6600" }}
              className="text-7xl font-black text-[#ff4500] leading-[1.1] mb-6 drop-shadow-sm cursor-default transition-colors duration-300 max-w-[600px]"
            >
              Giving Food A <br /> Second Chance.
            </motion.h1>
            
            <p className="text-2xl text-black font-extrabold max-w-lg mb-4">Zero Food Waste. Share. Recycle. Sustain.</p>
            
            <p className="text-lg text-slate-600 font-medium max-w-md mb-12 leading-relaxed">
              Join our smart platform connecting surplus resources with those who need them most. 
              Together, we can build a zero-waste future.
            </p>

            <div className="flex flex-wrap gap-6">
              <motion.button 
                onClick={() => navigate("/edible")} 
                onMouseEnter={() => setIsHoveringDonate(true)}
                onMouseLeave={() => setIsHoveringDonate(false)}
                whileHover={{ scale: 1.05, translateY: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-[#ff4500] text-white rounded-2xl font-bold text-lg shadow-xl shadow-orange-200"
              >
                I Have Edible Food
              </motion.button>
              
              <motion.button 
                onClick={() => navigate("/non-edible")} 
                onMouseEnter={() => setIsHoveringRecycle(true)}
                onMouseLeave={() => setIsHoveringRecycle(false)}
                whileHover={{ scale: 1.05, translateY: -2, backgroundColor: "#15803d" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-[#16a34a] text-white rounded-2xl font-bold text-lg shadow-xl shadow-green-200 transition-colors"
              >
                I Need Recycling
              </motion.button>
            </div>
          </motion.div>

          <div className="relative flex justify-center items-center min-h-[500px]">
             {/* 1. DEFAULT FOOD PLATE */}
             <motion.img 
                src={FoodPlate} 
                alt="Traditional Sustainable Food"
                animate={{ 
                    opacity: (isHoveringDonate || isHoveringRecycle) ? 0 : 1, 
                    scale: (isHoveringDonate || isHoveringRecycle) ? 0.8 : 1,
                    filter: (isHoveringDonate || isHoveringRecycle) ? "blur(10px)" : "blur(0px)"
                }}
                transition={{ duration: 0.5 }}
                className="absolute w-full max-w-2xl drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] z-10 select-none"
             />

             {/* 2. EDIBLE FOOD (Smiling Children) */}
             <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                    opacity: isHoveringDonate ? 1 : 0, 
                    scale: isHoveringDonate ? 1 : 0.9,
                }}
                className="absolute z-20 w-full max-w-xl"
             >
                <div className="relative p-3 bg-white/40 backdrop-blur-xl rounded-[3rem] border-4 border-white shadow-2xl overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200" 
                        alt="Smiling children" 
                        className="w-full h-[400px] object-cover rounded-[2.5rem]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-600/60 to-transparent flex items-end justify-center pb-8">
                        <div className="flex items-center gap-2 text-white font-black uppercase tracking-widest text-sm bg-orange-600/40 px-4 py-2 rounded-full backdrop-blur-md">
                          <Heart size={18} fill="white" /> Your Action Saves Lives
                        </div>
                    </div>
                </div>
             </motion.div>

             {/* 3. RECYCLING (Farmer / Agriculture) */}
             <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                    opacity: isHoveringRecycle ? 1 : 0, 
                    scale: isHoveringRecycle ? 1 : 0.9,
                }}
                className="absolute z-20 w-full max-w-xl"
             >
                <div className="relative p-3 bg-white/40 backdrop-blur-xl rounded-[3rem] border-4 border-white shadow-2xl overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200" 
                        alt="Farmer in agriculture field" 
                        className="w-full h-[400px] object-cover rounded-[2.5rem]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-700/60 to-transparent flex items-end justify-center pb-8">
                        <div className="flex items-center gap-2 text-white font-black uppercase tracking-widest text-sm bg-green-700/40 px-4 py-2 rounded-full backdrop-blur-md">
                          <Recycle size={18} /> Supporting Sustainable Farming
                        </div>
                    </div>
                </div>
             </motion.div>
          </div>
        </div>

        {/* ================= HOW IT WORKS ================= */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="py-32 bg-white/30 backdrop-blur-xl border-y border-white/50"
        >
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.h2 variants={fadeInUp} className="text-5xl font-black text-black mb-4">How It Works</motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 font-bold mb-20 text-lg">Simple, transparent, and impactful. Just three steps.</motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { id: "01", title: "List Your Food", desc: "Post edible surplus food items.", icon: <Utensils size={40}/> },
                { id: "02", title: "NGOs Discover", desc: "Nearby NGOs claim what they need.", icon: <Users size={40}/> },
                { id: "03", title: "Make Impact", desc: "Food reaches those in need. Zero waste.", icon: <Leaf size={40}/> }
              ].map((card, i) => (
                <motion.div 
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -25, scale: 1.05, boxShadow: "0 40px 80px -20px rgba(255,102,0,0.2)" }}
                  className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-orange-50 text-left group transition-all"
                >
                  <div className="flex justify-between items-center mb-10">
                    <span className="text-6xl font-black text-[#ff660011] group-hover:text-[#ff660033] transition-colors">{card.id}</span>
                    <div className="p-5 bg-orange-50 text-[#ff6600] rounded-[2rem] group-hover:bg-[#ff6600] group-hover:text-white group-hover:rotate-12 transition-all">
                      {card.icon}
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-4">{card.title}</h3>
                  <p className="text-gray-500 font-bold leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ================= IMPACT SECTION ================= */}
        <div className="py-40">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <motion.h2 variants={fadeInUp} className="text-6xl font-black text-black mb-10 leading-tight">
                Making Real Impact <br/> <span className="text-[#ff4500]">in Communities</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-gray-600 font-bold leading-relaxed mb-12">
                Every day, millions of tons of food go to waste while people go hungry. Replate bridges this gap by creating a sustainable food ecosystem.
              </motion.p>
              <div className="space-y-6">
                {["Reduce Food Waste", "Combat Hunger", "Build Community"].map((item, i) => (
                  <motion.div key={i} variants={fadeInUp} whileHover={{ x: 20 }} className="flex items-center gap-6 text-2xl font-black text-gray-800">
                    <div className="bg-[#ff4500] p-2 rounded-full text-white shadow-xl"><CheckCircle2 size={24}/></div>
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="bg-white p-20 rounded-[4rem] shadow-[0_50px_100px_rgba(255,102,0,0.15)] border-4 border-orange-50"
            >
              <div className="space-y-16">
                {[{v: "50", l: "Tonnes Saved From Landfill"}, {v: "80", l: "People Fed This Year"}, {v: "100", l: "Value of Food Redistributed"}].map((stat, i) => (
                  <div key={i}>
                    <h3 className="text-7xl font-black text-[#ff4500] mb-2">{stat.v}</h3>
                    <p className="text-gray-400 font-black uppercase tracking-widest text-sm">{stat.l}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ================= SUCCESS STORIES ================= */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={staggerContainer} 
          className="py-32 bg-orange-50/50 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <motion.h2 variants={fadeInUp} className="text-5xl font-black text-black mb-4">Success Stories</motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-gray-600 font-bold">Real moments of change from our community.</motion.p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800", tag: "Community", title: "Feeding  Children", desc: "Surplus from a local wedding was redistributed to provide nutritious meals." },
                { img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800", tag: "Zero Waste", title: "Redirecting Fresh Harvest", desc: "Local farmers connected with NGOs to save 200kg of fresh vegetables." },
                { img: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=800", tag: "Impact", title: "Empowering Local Heroes", desc: "Bridging the gap between restaurants and those struggling with food insecurity." }
              ].map((story, i) => (
                <motion.div key={i} variants={fadeInUp} whileHover={{ y: -10 }} className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-orange-100 group">
                  <div className="h-64 overflow-hidden relative">
                    <img src={story.img} alt={story.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-xs font-black text-orange-600 uppercase tracking-widest">{story.tag}</div>
                  </div>
                  <div className="p-10">
                    <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-orange-500 transition-colors">{story.title}</h3>
                    <p className="text-gray-500 font-bold leading-relaxed">{story.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ================= FOOD IMAGES SCROLLING & DONATE CTA ================= */}
        <div className="py-24 overflow-hidden">
          <div className="text-center mb-12 px-6">
            <h2 className="text-4xl font-black text-black mb-4">Every Meal Shared Is a Life Changed</h2>
            <p className="text-gray-600 font-bold">See the fresh resources being saved right now</p>
          </div>

          <div className="flex w-full overflow-hidden relative">
            <motion.div 
              className="flex gap-6 whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            >
              {[...foodImages, ...foodImages].map((url, i) => (
                <div key={i} className="w-80 h-56 flex-shrink-0 rounded-[2rem] overflow-hidden shadow-lg border-4 border-white">
                  <img src={url} alt="Shared food" className="w-full h-full object-cover" />
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto mt-20 px-6 text-center">
            <div className="bg-[#ff4500] rounded-[3rem] p-12 shadow-2xl shadow-orange-200 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform">
                <Heart size={150} color="white" fill="white" />
              </div>
              <h3 className="text-4xl font-black text-white mb-6 relative z-10">Ready to make a difference today?</h3>
              <p className="text-orange-100 font-bold text-lg mb-10 max-w-xl mx-auto relative z-10">
                Don't let good food go to landfill. Your surplus can become someone's next meal.
              </p>
              <motion.button
                onClick={() => navigate("/edible")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#ff4500] px-12 py-5 rounded-2xl font-black text-xl shadow-xl flex items-center gap-3 mx-auto relative z-10"
              >
                Donate Now <ArrowRight size={24} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* ================= FOOTER ================= */}
        <footer className="bg-[#111] text-white pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-20">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#ff4500] rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg">R</div>
                <span className="text-3xl font-black tracking-tighter">REPLATEO</span>
              </div>
              <p className="text-gray-400 font-bold leading-relaxed text-lg">Giving food a second chance. <br/> Connect, share, and save lives.</p>
            </div>
            <div>
              <h4 className="text-xl font-black mb-10 text-[#ff4500] uppercase tracking-widest text-sm">Quick Links</h4>
              <ul className="space-y-5 text-gray-400 font-bold text-lg">
                {["Home", "Edible", "Non-Edible", "Directory", "Support"].map(link => (
                  <li key={link} className="hover:text-white transition-colors cursor-pointer" onClick={() => navigate(`/${link.toLowerCase().replace(' ', '-')}`)}>{link}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-black mb-10 text-[#ff4500] uppercase tracking-widest text-sm">For Donors</h4>
              <ul className="space-y-5 text-gray-400 font-bold text-lg">
                {["Post Food", "My Donations", "FAQs", "Guidelines"].map(link => (
                  <li key={link} className="hover:text-white transition-colors cursor-pointer">{link}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-black mb-10 text-[#ff4500] uppercase tracking-widest text-sm">Contact</h4>
              <ul className="space-y-6 text-gray-400 font-bold text-lg">
                <li className="flex items-center gap-4 hover:text-white transition-colors cursor-pointer"><Mail size={24} className="text-[#ff4500]"/> support@replate.com</li>
                <li className="flex items-center gap-4 hover:text-white transition-colors cursor-pointer"><Phone size={24} className="text-[#ff4500]"/> +1-800-REPLATE</li>
                <li className="flex items-center gap-4 hover:text-white transition-colors cursor-pointer"><MapPin size={24} className="text-[#ff4500]"/> Across 50+ Cities</li>
                  <li className="flex items-center gap-4 hover:text-white transition-colors cursor-pointer">
  <a
    href="https://www.instagram.com/replateo?utm_source=qr&igsh=MWhrZ283dXRkZmhpaA=="
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-4"
  >
    <Instagram size={24} className="text-[#ff4500]" />
  </a>
  Replateo
</li>

              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 mt-32 pt-10 border-t border-white/5 flex justify-between items-center">
            <p className="text-gray-500 font-bold flex items-center gap-3">Made with <Heart size={20} className="text-[#ff4500] fill-[#ff4500]"/> to end food waste</p>
            <p className="text-gray-500 font-bold">© 2026 REPLATE. All rights reserved.</p>
          </div>
        </footer>
      </section>
    </>
  );
}