"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  SlidersHorizontal, 
  User, 
  Star, 
  ArrowRight,
  Gauge, 
  Bell,
  MapPin,
  Heart,
  Plus,
  TrendingUp,
  ShieldCheck,
  Users,
  Car
} from "lucide-react";
import BottomNav from "@/components/BottomNav";
import Sidebar from "@/components/Sidebar";
import PremiumAnimation from "@/components/PremiumAnimation";
import { useAuth } from "@/context/AuthContext";

const BRANDS = [
  { name: "All", logo: null },
  { name: "Tesla", logo: "https://www.carlogos.org/car-logos/tesla-logo-2200x2800.png" },
  { name: "Mercedes", logo: "https://www.carlogos.org/car-logos/mercedes-benz-logo-2011.png" },
  { name: "Porsche", logo: "https://www.carlogos.org/car-logos/porsche-logo-2100x2800.png" },
  { name: "Audi", logo: "https://www.carlogos.org/car-logos/audi-logo-2016.png" },
];

const POPULAR_CARS = [
  {
    id: "m-s-class",
    brand: "MERCEDES BENZ",
    model: "EQS",
    desc: "PURE ELECTRIC LUXURY SEDAN",
    seats: 4,
    speed: 210,
    rating: 4.8,
    price: 180,
    image: "/mercedes.png",
    gradient: "from-[#1a1a1a] via-[#262626] to-[#0d0d0d]",
    textColor: "text-white"
  },
  {
    id: "h-sonata",
    brand: "PORSCHE",
    model: "TAYCAN",
    desc: "SOUL, ELECTRIFIED. PURE SPORTS PERFORMANCE.",
    seats: 4,
    speed: 260,
    rating: 4.9,
    price: 220,
    image: "/porsche.png",
    gradient: "from-[#262626] to-black",
    textColor: "text-white"
  }
];

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeBrand, setActiveBrand] = useState("All");

  if (!user) return null;

  const role = user.role || "Driver";

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#101010] flex">
      <Sidebar />
      
      <main className="flex-1 lg:pl-[120px] pb-32 pt-6 sm:pt-14 px-4 sm:px-12 max-w-7xl mx-auto w-full transition-all duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 sm:mb-12">
           <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-black/5 overflow-hidden">
                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="User" />
              </div>
              <div>
                 <p className="text-[9px] font-black uppercase tracking-[0.3em] text-black/30 mb-0.5">
                   {role} Console
                 </p>
                 <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tighter italic leading-none" style={{ fontFamily: "'Syncopate', sans-serif" }}>
                   {user.name.split(" ")[0]} <span className="text-black/30 font-normal">{user.name.split(" ")[1] || ""}</span>
                 </h1>
              </div>
           </div>
           <div className="flex gap-3">
              <button className="w-12 h-12 glass-panel rounded-2xl flex items-center justify-center text-black/40 hover:text-black transition-all">
                 <Bell size={18} />
              </button>
              <button className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all">
                 <Plus size={22} strokeWidth={2.5} />
              </button>
           </div>
        </div>

        {/* DRIVER DASHBOARD */}
        {role === "Driver" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {/* Main Branding - Intro Perfection */}
            <div className="mb-12 px-2">
               <h1 className="font-syncopate-fluid mb-6">
                  Explore <br /><span className="text-black/30">the Fleet</span>
               </h1>
               <Link href="/cars" className="premium-button">
                  Discover 
                  <div className="premium-button-icon">
                     <ArrowRight size={20} strokeWidth={2.5} />
                  </div>
               </Link>
            </div>

            {/* Search - Ultra Minimal */}
            <div className="relative mb-12 sm:mb-16">
               <Search size={18} className="absolute left-7 top-1/2 -translate-y-1/2 text-black/20" />
               <input 
                 type="text" 
                 placeholder="Search your next journey..." 
                 className="w-full h-16 bg-white border border-black/5 rounded-full pl-16 pr-6 text-[14px] focus:outline-none focus:ring-1 ring-black/5 transition-all font-medium shadow-sm"
               />
               <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 glass-dark text-white rounded-full flex items-center justify-center shadow-sm">
                  <SlidersHorizontal size={16} strokeWidth={2} />
               </button>
            </div>

            {/* Brands Filter */}
            <div className="mb-10 sm:mb-14">
               <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2">
                  {BRANDS.map(b => (
                    <button 
                      key={b.name}
                      onClick={() => setActiveBrand(b.name)}
                      className={`flex items-center gap-3 px-2 py-2 rounded-full border transition-all shrink-0 ${
                        activeBrand === b.name 
                          ? "bg-black border-black text-white shadow-xl" 
                          : "bg-white border-black/5 text-black/40 hover:border-black/10"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden ${activeBrand === b.name ? 'bg-white' : 'bg-black/5'}`}>
                         {b.logo ? (
                           <img src={b.logo} alt={b.name} className="w-5 h-5 object-contain" />
                         ) : (
                           <span className="text-[8px] font-black uppercase tracking-tighter">All</span>
                         )}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider pr-2">{b.name}</span>
                    </button>
                  ))}
               </div>
            </div>

            {/* Featured Cars (Background Images) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-10">
               {POPULAR_CARS.map((car, idx) => (
                 <motion.div 
                   key={car.id}
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: idx * 0.1 }}
                   className="group relative h-[420px] rounded-[48px] overflow-hidden shadow-2xl cursor-pointer border border-black/5"
                   onClick={() => router.push(`/car/${car.id}`)}
                 >
                    {/* Image Background */}
                    <img 
                      src={car.image} 
                      alt={car.model} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    
                    {/* Glass Overlays */}
                    <div className="absolute inset-x-0 bottom-0 p-8 pt-24 bg-gradient-to-t from-black via-black/40 to-transparent">
                       <div className="flex justify-between items-end">
                          <div>
                             <h4 className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mb-1">{car.brand}</h4>
                             <h5 className="text-white text-3xl font-black uppercase tracking-tighter italic leading-none mb-4" style={{ fontFamily: "'Syncopate', sans-serif" }}>
                               {car.model}
                             </h5>
                              <div className="flex gap-3">
                                 <span className="flex items-center gap-1.5 text-[9px] font-black text-white/40 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-xl">
                                    <Gauge size={12} /> {car.speed} KM/H
                                 </span>
                                 <span className="flex items-center gap-1.5 text-[9px] font-black text-white/40 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-xl">
                                    <Star size={12} className="fill-white text-transparent" /> {car.rating}
                                 </span>
                              </div>
                           </div>
                           <div className="glass-panel p-5 rounded-[32px] text-black border-white/40">
                              <p className="text-[8px] uppercase tracking-widest text-black/40 mb-1">Rate</p>
                              <p className="text-xl leading-none italic font-black">${car.price}<span className="text-[10px] opacity-40">/d</span></p>
                           </div>
                        </div>
                     </div>

                    {/* Like Button */}
                    <button className="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                       <Heart size={20} />
                    </button>
                 </motion.div>
               ))}
            </div>
          </motion.div>
        )}

        {/* OWNER DASHBOARD */}
        {role === "Owner" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
               <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-black/5 shadow-sm">
                  <div className="w-10 h-10 glass-panel rounded-xl flex items-center justify-center mb-4 text-black">
                     <TrendingUp size={18} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black italic">$12,850</h3>
                  <p className="text-[9px] font-black uppercase tracking-widest text-black/30 mt-1">Net Earnings</p>
               </div>
               <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-black/5 shadow-sm">
                  <div className="w-10 h-10 glass-dark text-white rounded-xl flex items-center justify-center mb-4">
                     <Car size={18} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black italic">08</h3>
                  <p className="text-[9px] font-black uppercase tracking-widest text-black/30 mt-1">Total Fleet</p>
               </div>
               <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-black/5 shadow-sm col-span-2 sm:col-span-1">
                  <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center mb-4 text-black/40">
                     <Users size={18} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black italic">42</h3>
                  <p className="text-[9px] font-black uppercase tracking-widest text-black/30 mt-1">Total Renters</p>
               </div>
            </div>

            {/* Performance Chart Placeholder */}
            <div className="glass-dark rounded-[48px] p-8 sm:p-10 text-white relative overflow-hidden h-[300px] flex flex-col justify-end shadow-2xl">
               <div className="absolute top-0 right-0 p-8">
                  <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest">Revenue Growth</span>
               </div>
               <div className="relative z-10 font-black italic">
                  <h4 className="text-5xl mb-2 tracking-tighter" style={{ fontFamily: "'Syncopate', sans-serif" }}>+24%</h4>
                  <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em]">Efficiency Rating</p>
               </div>
               {/* Visual Mock Element */}
               <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/10 via-transparent to-transparent opacity-30" />
            </div>

            {/* Asset List */}
            <div>
               <div className="flex justify-between items-center mb-6 px-2">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-black/40">FLEET MANAGEMENT</h3>
                  <Link href="/cars" className="text-[10px] font-black uppercase tracking-widest text-black/60 hover:text-black transition-all">View All</Link>
               </div>
               <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white rounded-[28px] p-4 border border-black/5 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
                       <div className="flex items-center gap-4">
                          <div className="w-16 h-12 bg-black/5 rounded-xl overflow-hidden relative">
                             <img src="/porsche.png" alt="Car" className="w-full h-full object-cover grayscale" />
                          </div>
                          <div>
                             <h4 className="font-black text-[13px] uppercase tracking-tight">Porsche Taycan 4S</h4>
                             <p className="text-[9px] font-bold text-black/30 uppercase tracking-widest">TSLA-982-S • ON SERVICE</p>
                          </div>
                       </div>
                       <div className="bg-black/80 px-4 h-10 rounded-full flex items-center shadow-lg">
                          <span className="text-[10px] font-black uppercase tracking-tighter text-white/90">$250/d</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </motion.div>
        )}

        {/* ADMIN DASHBOARD */}
        {role === "Admin" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="glass-panel rounded-[40px] p-10 border border-black/5 shadow-sm group hover:bg-black transition-all duration-500 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-white/10" />
                  <Users className="text-black/30 group-hover:text-white/40 mb-6 relative z-10" size={32} />
                  <h3 className="text-4xl font-black italic group-hover:text-white relative z-10" style={{ fontFamily: "'Syncopate', sans-serif" }}>1,412</h3>
                  <p className="text-[9px] font-black uppercase tracking-widest text-black/30 group-hover:text-white/30 mt-1 relative z-10">Total Network Users</p>
               </div>
               <div className="glass-dark rounded-[40px] p-10 border border-white/10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -mr-16 -mt-16" />
                  <ShieldCheck className="text-white/20 mb-6 relative z-10" size={32} />
                  <h3 className="text-4xl font-black italic text-white relative z-10" style={{ fontFamily: "'Syncopate', sans-serif" }}>99.9%</h3>
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mt-1 relative z-10">Core System Health</p>
               </div>
            </div>

            <div className="bg-white rounded-[48px] p-10 border border-black/5 shadow-sm">
               <h3 className="text-[12px] font-black uppercase tracking-[0.3em] text-black/30 mb-10">CORE SYSTEM ACTIVITY</h3>
               <div className="space-y-6">
                  {[1, 2, 3, 4].map(i => (
                     <div key={i} className="flex items-center justify-between py-3 border-b border-black/5 last:border-0 hover:pl-2 transition-all group">
                        <div className="flex items-center gap-6">
                           <div className={`w-2.5 h-2.5 rounded-full ${i % 2 === 0 ? 'bg-black/10' : 'bg-black shadow-lg shadow-black/20'}`} />
                           <p className="text-[12px] font-black uppercase tracking-tighter italic">
                              {i % 2 === 0 ? 'Withdrawal Request: $2,400' : 'New Fleet Entry: Porsche Taycan'}
                           </p>
                        </div>
                        <button className="text-[9px] font-black uppercase tracking-widest text-black/20 hover:text-black transition-all">Review</button>
                     </div>
                  ))}
               </div>
            </div>
          </motion.div>
        )}

      </main>

      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
