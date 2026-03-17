"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Heart, 
  Star, 
  Gauge, 
  Loader2,
  ArrowRight,
  User,
  LayoutGrid,
  Map as MapIcon,
  Plus,
  TrendingUp,
  ShieldCheck,
  Users,
  Car
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import BottomNav from "@/components/BottomNav";
import Sidebar from "@/components/Sidebar";
import FleetMap from "@/components/FleetMap";
import { nhtsaApi, NhtsaModel } from "@/lib/nhtsa";

const FILTERS = [
  { name: "All" },
  { name: "Tesla" },
  { name: "Mercedes-Benz" },
  { name: "Porsche" },
  { name: "Audi" },
];

const getCarImage = (brand: string) => {
  const b = brand.toLowerCase();
  if (b.includes("tesla") || b.includes("porsche")) return "/porsche.png";
  if (b.includes("mercedes")) return "/mercedes.png";
  if (b.includes("audi")) return "/audi.png";
  return "/porsche.png";
};

export default function CarListingPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  useEffect(() => {
    const fetchFleet = async () => {
      setLoading(true);
      try {
        let results: NhtsaModel[] = [];
        if (activeFilter === "All") {
          const tesla = await nhtsaApi.getModelsForMake("Tesla");
          const porsche = await nhtsaApi.getModelsForMake("Porsche");
          results = [...tesla.slice(0, 4), ...porsche.slice(0, 4)];
        } else {
          results = await nhtsaApi.getModelsForMake(activeFilter);
        }

        const mappedCars = results.slice(0, 15).map((m, idx) => ({
          id: `${m.Model_ID}-${idx}`,
          brand: m.Make_Name.toUpperCase(),
          model: m.Model_Name.toUpperCase(),
          seats: 4,
          speed: Math.floor(Math.random() * 80) + 240,
          rating: (Math.random() * 0.4 + 4.6).toFixed(1),
          price: Math.floor(Math.random() * 150) + 100,
          image: getCarImage(m.Make_Name),
        }));

        setCars(mappedCars);
      } catch (error) {
        console.error("Failed to load car data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFleet();
  }, [activeFilter]);

  const filtered = searchQuery.trim() === "" 
    ? cars 
    : cars.filter(c => c.brand.toLowerCase().includes(searchQuery.toLowerCase()) || c.model.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#101010] flex">
      <Sidebar />
      
      <main className="flex-1 lg:pl-[120px] pb-32 pt-10 px-4 sm:px-12 max-w-7xl mx-auto w-full transition-all duration-300">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
           <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 mb-1">Global Database</p>
               <h1 className="font-syncopate-fluid mb-1">
                 Discovery <span className="text-black/30">Fleet</span>
               </h1>
           </div>
           
           <div className="flex glass-panel p-1 rounded-[24px] w-full md:w-auto shadow-sm">
              <button 
                onClick={() => setViewMode("list")}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-[20px] text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === "list" ? "bg-black text-white shadow-lg" : "text-black/30 hover:text-black/60"}`}
              >
                <LayoutGrid size={14} /> Grid
              </button>
              <button 
                onClick={() => setViewMode("map")}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-[20px] text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === "map" ? "bg-black text-white shadow-lg" : "text-black/30 hover:text-black/60"}`}
              >
                <MapIcon size={14} /> Map
              </button>
           </div>
        </div>

        {/* Search & Actions */}
         <div className="flex gap-4 mb-14">
            <div className="relative flex-1">
               <Search size={20} className="absolute left-7 top-1/2 -translate-y-1/2 text-black/20" />
               <input 
                 type="text" 
                 placeholder="Search models..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full h-16 bg-white border border-black/5 rounded-full pl-16 pr-6 text-[14px] focus:ring-1 ring-black/5 focus:outline-none transition-all font-medium shadow-sm"
               />
            </div>
            <button className="w-16 h-16 glass-dark text-white rounded-full flex items-center justify-center shrink-0 shadow-xl">
               <SlidersHorizontal size={22} strokeWidth={2} />
            </button>
         </div>

        {/* List Content */}
        <AnimatePresence mode="wait">
           {loading ? (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-24">
                <Loader2 size={48} className="animate-spin text-black/10 mb-6" />
                <p className="text-[10px] font-black text-black/20 uppercase tracking-[0.5em] italic">Accessing Data...</p>
             </motion.div>
           ) : viewMode === "list" ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {filtered.map((car, idx) => (
                  <motion.div 
                    key={car.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group relative h-[380px] rounded-[48px] overflow-hidden shadow-xl cursor-pointer border border-black/5 transition-all hover:shadow-2xl"
                    onClick={() => router.push(`/car/${car.id}`)}
                  >
                     {/* Background Image */}
                     <img 
                       src={car.image} 
                       alt={car.model}
                       className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                     />
                     
                     {/* Overlay Content */}
                     <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent">
                        <div className="flex justify-between items-end">
                           <div>
                              <h4 className="text-white/50 text-[10px] font-black uppercase tracking-[0.3em] mb-1">{car.brand}</h4>
                              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter italic leading-none mb-4 text-white" style={{ fontFamily: "'Syncopate', sans-serif" }}>
                                {car.model}
                              </h1>
                              <div className="flex gap-3">
                                 <span className="flex items-center gap-1.5 text-[9px] font-black text-white/40 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-xl">
                                    <User size={12} /> {car.seats}
                                 </span>
                                 <span className="flex items-center gap-1.5 text-[9px] font-black text-white/40 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-xl">
                                    <Star size={12} className="fill-white text-transparent" /> {car.rating}
                                 </span>
                              </div>
                           </div>
                           <div className="glass-panel p-4 rounded-[28px] text-black border-white/40">
                              <p className="text-[14px] italic font-black leading-none">${car.price}<span className="text-[10px] opacity-40">/d</span></p>
                           </div>
                        </div>
                     </div>

                     <div className="absolute top-8 right-8 w-11 h-11 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all shadow-lg">
                        <Heart size={18} />
                     </div>
                  </motion.div>
                ))}
             </div>
           ) : (
             <div className="h-[600px] rounded-[48px] overflow-hidden border border-black/5 shadow-xl glass-panel relative">
                <FleetMap />
             </div>
           )}
        </AnimatePresence>
      </main>

      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
