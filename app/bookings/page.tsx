"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CalendarDays, Zap, MoreVertical } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import AuthGuard from "@/components/AuthGuard";
import BottomNav from "@/components/BottomNav";
import PremiumAnimation from "@/components/PremiumAnimation";

export default function BookingsPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#f8f9fa] text-[#101010] flex">
        <Sidebar />
        
        <main className="flex-1 lg:pl-[120px] pb-32 pt-10 px-4 sm:px-12 max-w-7xl mx-auto w-full transition-all duration-300">
           
           <div className="flex justify-between items-center mb-10 pt-4 md:pt-8">
              <div>
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 mb-1">Fleet Records</p>
                  <h1 className="font-syncopate-fluid mb-1">
                    My <span className="text-black/30">Bookings</span>
                  </h1>
              </div>
              <button className="w-12 h-12 glass-panel rounded-2xl flex items-center justify-center text-black/40 shadow-sm border-white/60">
                 <CalendarDays size={18} />
              </button>
           </div>

           {/* Empty State - High Fidelity */}
           <div className="relative overflow-hidden rounded-[48px] bg-white border border-black/5 p-12 flex flex-col items-center justify-center text-center min-h-[440px] shadow-sm">
              {/* Decorative Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-black/5 blur-[120px] rounded-full" />
              
              <div className="relative z-10 w-full max-w-xs h-40">
                  <PremiumAnimation type="loading" className="opacity-100" />
               </div>
               <div className="relative z-10">
                  <h2 className="text-2xl font-black uppercase tracking-tight mb-4">No Active Journeys</h2>
                  <p className="text-sm font-medium text-black/40 max-w-[280px] leading-relaxed mx-auto mb-10">
                     Your luxury fleet is waiting. Discover the most premium rental experience on the market today.
                  </p>
                  
                  <Link href="/cars" className="premium-button">
                     Explore Fleet
                     <div className="premium-button-icon">
                        <ArrowRight size={20} strokeWidth={2.5} />
                     </div>
                  </Link>
               </div>

               {/* Decorative Gradient Line */}
               <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-black/10 to-transparent opacity-30" />
           </div>

           {/* Quick Tips */}
           <div className="mt-12">
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-black/30 mb-8 px-2">RENTAL ESSENTIALS</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <TipCard 
                   icon={Zap} 
                   title="Swift Pick-up" 
                   desc="All bookings include priority check-in at our premium hubs. No waiting, just driving." 
                 />
                 <TipCard 
                   icon={CalendarDays} 
                   title="Flexible Scheduling" 
                   desc="Modify or extend your journey up to 2 hours before pick-up with zero extra cost." 
                 />
              </div>
           </div>
        </main>

        <div className="lg:hidden">
          <BottomNav />
        </div>
      </div>
    </AuthGuard>
  );
}

function TipCard({ icon: Icon, title, desc }: any) {
  return (
    <div className="p-8 rounded-[40px] bg-white border border-black/5 hover:border-black/10 hover:shadow-md transition-all group">
       <div className="w-12 h-12 glass-panel text-black rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform border-white/60">
          <Icon size={20} strokeWidth={2.5} />
       </div>
       <h4 className="font-black uppercase tracking-widest text-[11px] mb-3 text-black/80">{title}</h4>
       <p className="text-[13px] font-medium text-black/40 leading-relaxed">{desc}</p>
    </div>
  )
}
