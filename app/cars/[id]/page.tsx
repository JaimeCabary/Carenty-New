"use client";

import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Star, Heart, Gauge, Fuel, Users, ShieldCheck } from "lucide-react";
import AuthGuard from "@/components/AuthGuard";

export default function CarDetail() {
  const { id } = useParams();
  const router = useRouter();

  return (
    <AuthGuard>
      <div className="min-h-dvh flex flex-col" style={{ background: "#08080e" }}>
        
        {/* Detail Hero Image bg glow */}
        <div className="absolute top-0 left-0 right-0 h-96 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(245,166,35,0.15), transparent)" }} />

        {/* Header */}
        <div className="px-6 pt-14 pb-4 flex items-center justify-between relative z-10">
          <button onClick={() => router.back()} className="w-10 h-10 rounded-full glass-card flex items-center justify-center backdrop-blur-md">
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm font-semibold">Car Detail</span>
          <button className="w-10 h-10 rounded-full glass-card flex items-center justify-center backdrop-blur-md">
            <Heart size={18} />
          </button>
        </div>

        {/* 3D Model / Image Placeholder */}
        <div className="relative h-64 flex items-center justify-center z-10">
           {/* Mock stage platform */}
           <div className="absolute bottom-10 w-64 h-8 rounded-[100%] bg-white/5 blur-xl"></div>
           <div className="text-[120px] animate-float drop-shadow-2xl">🚘</div>
        </div>

        {/* Info Card */}
        <div className="flex-1 bg-gradient-to-b from-[#111118] to-black rounded-t-[40px] px-6 pt-8 pb-32 border-t border-white/5 relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h1 className="text-2xl font-black mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>Mercedes Benz S-Class</h1>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Luxury Sedan • 2024</p>
            </div>
            <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg">
              <Star size={14} style={{ color: "var(--gold)" }} className="fill-current" />
              <span className="text-sm font-bold">4.8</span>
            </div>
          </div>

          <p className="text-sm leading-relaxed mt-4 mb-6" style={{ color: "var(--text-dim)" }}>
            Experience unparalleled luxury and performance. The ultimate executive sedan with premium leather interior, advanced driver assistance, and an ultra-smooth ride.
          </p>

          <h2 className="text-base font-bold mb-4">Specifications</h2>
          <div className="grid grid-cols-2 gap-3 mb-8">
             <SpecCard icon={Gauge} label="Top Speed" value="250 km/h" />
             <SpecCard icon={Fuel} label="Fuel Type" value="Petrol" />
             <SpecCard icon={Users} label="Capacity" value="4 Seats" />
             <SpecCard icon={ShieldCheck} label="Insurance" value="Included" />
          </div>
        </div>

        {/* Fixed Bottom Booking Bar */}
        <div className="fixed bottom-0 left-0 right-0 p-6 z-50 rounded-t-3xl" style={{ background: "rgba(11,11,16,0.9)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
           <div className="flex items-center justify-between">
              <div>
                <p className="text-xs" style={{ color: "var(--text-dim)" }}>Rent Price</p>
                <p className="text-2xl font-black">
                  $110<span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>/day</span>
                </p>
              </div>
              <button className="btn-primary w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 shadow-[0_0_20px_rgba(245,166,35,0.3)] min-w-[160px]">
                Book Now
              </button>
           </div>
           <div className="w-1/3 h-1 mx-auto bg-white/20 rounded-full mt-4" />
        </div>
      </div>
    </AuthGuard>
  );
}

function SpecCard({ icon: Icon, label, value }: any) {
  return (
    <div className="glass-card p-3 flex gap-3 items-center">
      <div className="w-10 h-10 rounded-xl flex flex-shrink-0 items-center justify-center bg-white/5">
        <Icon size={18} style={{ color: "var(--gold)" }} />
      </div>
      <div>
        <p className="text-[10px] uppercase font-bold tracking-wider" style={{ color: "var(--text-dim)" }}>{label}</p>
        <p className="text-xs font-semibold">{value}</p>
      </div>
    </div>
  );
}
