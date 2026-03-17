"use client";

import { motion } from "framer-motion";
import { 
  User, 
  Settings, 
  CreditCard, 
  ShieldCheck, 
  ChevronRight, 
  History,
  LogOut,
  Bell,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import AuthGuard from "@/components/AuthGuard";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const sections = [
    {
      title: "Account Overview",
      items: [
        { icon: User, label: "Personal Information", desc: "Manage your name and contact details" },
        { icon: ShieldCheck, label: "Login & Security", desc: "Update password and secure your account" },
      ]
    },
    {
      title: "Carenty Services",
      items: [
        { icon: CreditCard, label: "Payment Methods", desc: "Cards, Apple Pay, and transaction history" },
        { icon: History, label: "Rental History", desc: "Past journeys and digital receipts" },
        { icon: Bell, label: "Notifications", desc: "Alerts, marketing, and push settings" },
      ]
    }
  ];

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#f8f9fa] text-[#101010] flex">
        <Sidebar />
        
        <main className="flex-1 lg:pl-[120px] pb-32 pt-10 px-4 sm:px-12 max-w-7xl mx-auto w-full transition-all duration-300">
          
          {/* Profile Header */}
          <div className="relative mb-12 rounded-[48px] overflow-hidden glass-panel border-white/60 p-8 sm:p-12 shadow-2xl">
             <div className="absolute top-0 right-0 w-64 h-64 bg-black/5 blur-[120px] rounded-full -mr-24 -mt-24" />
             
             <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10 text-center sm:text-left">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[32px] bg-black text-white flex items-center justify-center text-4xl font-black shadow-2xl relative">
                   {user.name.charAt(0)}
                   <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white border-4 border-[#f8f9fa] rounded-full flex items-center justify-center text-black shadow-lg">
                      <CheckCircle2 size={20} />
                   </div>
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 mb-2">Member Profile</p>
                   <h1 className="font-syncopate-fluid mb-3">
                      {user.name}
                   </h1>
                   <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                      <span className="px-5 py-2 glass-dark rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white/90">
                         {user.role} Tier
                      </span>
                      <span className="text-[10px] font-bold text-black/20 uppercase tracking-[0.2em]">
                         Member Since 2024
                      </span>
                   </div>
                </div>
             </div>
          </div>

          {/* Settings Grid */}
          <div className="space-y-12">
             {sections.map((section, sIdx) => (
               <div key={sIdx}>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-black/30 mb-8 px-4 leading-none">
                     {section.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {section.items.map((item, iIdx) => (
                       <button 
                         key={iIdx}
                         className="flex items-center justify-between p-6 bg-white rounded-[32px] border border-black/5 hover:border-black/10 hover:shadow-xl transition-all group text-left"
                       >
                          <div className="flex items-center gap-5">
                             <div className="w-12 h-12 glass-panel rounded-2xl flex items-center justify-center text-black border-white/60 shadow-sm group-hover:scale-110 transition-transform">
                                <item.icon size={20} strokeWidth={2.5} />
                             </div>
                             <div>
                                <h4 className="font-black text-[14px] uppercase tracking-tight text-black/80">{item.label}</h4>
                                <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest mt-0.5">{item.desc}</p>
                             </div>
                          </div>
                          <ChevronRight size={18} className="text-black/10 group-hover:text-black group-hover:translate-x-1 transition-all" />
                       </button>
                     ))}
                  </div>
               </div>
             ))}
          </div>

          {/* Danger Zone */}
          <div className="mt-16 pt-16 border-t border-black/5 flex justify-center">
             <button 
               onClick={handleLogout}
               className="flex items-center gap-4 text-black/30 hover:text-red-500 font-black uppercase tracking-[0.3em] text-[10px] transition-all py-4 px-8 rounded-full hover:bg-red-50"
             >
                <LogOut size={16} /> Disconnect Session
             </button>
          </div>

        </main>

        <div className="lg:hidden">
          <BottomNav />
        </div>
      </div>
    </AuthGuard>
  );
}
