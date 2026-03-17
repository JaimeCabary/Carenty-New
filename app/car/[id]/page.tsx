"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Phone, 
  
  ArrowUpRight,
  ArrowRight,
  User,
  Star, 
  Gauge, 
  Zap, 
  Loader2,
  CalendarDays
} from "lucide-react";
import { nhtsaApi } from "@/lib/nhtsa";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

const getCarImage = (brand: string) => {
  const b = brand.toLowerCase();
  if (b.includes("tesla") || b.includes("porsche")) return "/porsche.png";
  if (b.includes("mercedes")) return "/mercedes.png";
  if (b.includes("audi")) return "/audi.png";
  return "/porsche.png";
};

export default function CarDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [liked, setLiked] = useState(false);
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!params?.id) return;
      setLoading(true);
      try {
        const [modelId] = (params.id as string).split("-");
        const match = await nhtsaApi.getModelsForMake("Tesla");
        const selected = match.find(m => m.Model_ID.toString() === modelId) || match[0];
        
        setCar({
          brand: selected.Make_Name.toUpperCase(),
          model: selected.Model_Name.toUpperCase(),
          price: 180,
          rating: 4.9,
          desc: "ENGINEERED FOR EXCELLENCE. THE TAYCAN IS THE SOUL OF PORSCHE, ELECTRIFIED. STUNNING PERFORMANCE MEETS MINIMALIST LUXURY.",
          image: getCarImage(selected.Make_Name),
          specs: [
            { icon: User, label: "Capacity", value: "4 SEATER" },
            { icon: Gauge, label: "Top Speed", value: "260 KM/H" },
            { icon: Zap, label: "Engine", value: "ELECTRIC" },
            { icon: Star, label: "Safety", value: "5 STARS" },
          ]
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [params?.id]);

  if (loading) return (
    <div className="min-h-screen bg-[#fdf2f0] flex items-center justify-center">
       <Loader2 size={40} className="animate-spin text-black/10" />
    </div>
  );

  return (
      <div className="min-h-screen bg-[#f8f9fa] text-[#101010] flex">
        <Sidebar />
        
        <main className="flex-1 lg:pl-[120px] pb-32 pt-10 px-4 sm:px-12 max-w-7xl mx-auto w-full relative transition-all duration-300">
        
        {/* Navigation Actions */}
        <div className="flex justify-between items-center mb-8 sm:mb-12">
           <button 
             onClick={() => router.back()}
             className="w-12 h-12 bg-white border border-black/5 rounded-2xl flex items-center justify-center text-black/40 hover:text-black hover:shadow-md transition-all"
           >
              <ArrowLeft size={20} />
           </button>
           <div className="flex gap-3">
              <button 
                onClick={() => setLiked(!liked)}
                className={`w-12 h-12 bg-white border border-black/5 rounded-2xl flex items-center justify-center transition-all shadow-sm ${liked ? 'text-red-500' : 'text-black/40 hover:text-black'}`}
              >
                 <Heart size={20} className={liked ? 'fill-red-500' : ''} />
              </button>
              <button className="w-12 h-12 bg-white border border-black/5 rounded-2xl flex items-center justify-center text-black/40 hover:text-black transition-all shadow-sm">
                 <Share2 size={20} />
              </button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
           {/* Car Visualization */}
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             className="relative"
           >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-black/5 rounded-full blur-[120px] pointer-events-none" />
              <img 
                src={car.image} 
                alt={car.model} 
                className="w-full h-auto object-contain relative z-10 drop-shadow-[0_30px_60px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-700" 
              />
              <div className="w-[80%] h-8 bg-black/10 blur-2xl rounded-[100%] mx-auto -mt-6 opacity-40" />
           </motion.div>

           {/* Details & Interactive Sections */}
           <div className="space-y-10">
              <div className="space-y-4">
                 <p className="text-black/30 text-[9px] font-black uppercase tracking-[0.4em]">Extreme Performance</p>
                  <h1 className="font-syncopate-fluid">
                    {car.brand}<br/><span className="text-black/40">{car.model}</span>
                  </h1>
                 <p className="text-black/40 text-[12px] font-medium leading-relaxed max-w-md">
                   {car.desc}
                 </p>
              </div>

              {/* Technical Specifications */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                 {car.specs.map((spec: any, idx: number) => (
                   <div key={idx} className="bg-white p-5 rounded-[32px] border border-black/5 shadow-sm flex items-center gap-4 hover:border-black/10 transition-all">
                      <div className="w-10 h-10 glass-panel text-black rounded-xl flex items-center justify-center border-white/60">
                         <spec.icon size={18} />
                      </div>
                      <div>
                         <p className="text-[8px] font-black text-black/20 uppercase tracking-widest mb-0.5">{spec.label}</p>
                         <p className="text-[12px] font-black uppercase tracking-tight">{spec.value}</p>
                      </div>
                   </div>
                 ))}
              </div>

              {/* Booking Container - Diamond Glass */}
              <div className="glass-panel p-5 rounded-[40px] flex items-center justify-between shadow-xl border-white/40">
                 <div className="pl-6">
                    <p className="text-black/30 text-[9px] font-black uppercase tracking-widest mb-0.5">Rental Rate</p>
                    <div className="flex items-baseline gap-1 text-black">
                       <span className="text-3xl font-black italic">${car.price}</span>
                       <span className="text-[10px] font-semibold text-black/40 uppercase">/ Day</span>
                    </div>
                 </div>
                  <button className="premium-button min-w-[220px]">
                     Reserve Now
                     <div className="premium-button-icon">
                        <ArrowRight size={20} strokeWidth={2.5} />
                     </div>
                  </button>
              </div>
           </div>
        </div>

      </main>

      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
