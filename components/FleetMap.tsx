"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, Map as MapIcon, Layers } from "lucide-react";

export default function FleetMap() {
  // Mock car locations
  const markers = [
    { id: 1, top: "30%", left: "40%", price: "$150", color: "bg-white" },
    { id: 2, top: "50%", left: "60%", price: "$98", color: "bg-white/40" },
    { id: 3, top: "20%", left: "20%", price: "$120", color: "bg-white" },
    { id: 4, top: "70%", left: "30%", price: "$180", color: "bg-white/20" },
  ];

  return (
    <div className="relative w-full h-full rounded-[40px] overflow-hidden bg-[#1a1a1a] border border-white/10 group">
      {/* Mock Map Background (Dark stylized) */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
         <img 
           src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop" 
           alt="Map Background"
           className="w-full h-full object-cover grayscale invert contrast-125"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Interactive Markers */}
      {markers.map((m) => (
        <motion.div 
          key={m.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: m.id * 0.2 }}
          style={{ top: m.top, left: m.left }}
          className="absolute z-10"
        >
           <motion.div 
             whileHover={{ scale: 1.1, y: -5 }}
             className={`px-3 py-1.5 rounded-full ${m.color} text-black text-[10px] font-black shadow-2xl flex items-center gap-2 cursor-pointer border-2 border-black`}
           >
              <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              {m.price}
           </motion.div>
           <div className={`absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black`} />
        </motion.div>
      ))}

      {/* Map Controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-3 z-20">
         <div className="p-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl text-white/40 hover:text-white transition-colors cursor-pointer">
            <Layers size={20} />
         </div>
         <div className="p-3 bg-white border-2 border-black rounded-2xl text-black shadow-xl cursor-pointer hover:scale-110 active:scale-95 transition-all">
            <Navigation size={20} strokeWidth={3} />
         </div>
      </div>

      {/* Overlay Text */}
      <div className="absolute top-6 left-6 z-20">
         <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Live Fleet Tracking</span>
         </div>
      </div>
    </div>
  );
}
