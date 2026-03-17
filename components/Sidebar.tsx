"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Home, 
  Compass, 
  CalendarDays, 
  User, 
  LogOut, 
  Shield, 
  PanelLeft,
  Settings,
  Bell
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navItems = [
    { href: "/home", icon: Home, label: "Console" },
    { href: "/cars", icon: Compass, label: "Fleet" },
    { href: "/bookings", icon: CalendarDays, label: "Records" },
    { href: "/profile", icon: User, label: "Account" },
  ];

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isExpanded ? 260 : 88 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className="hidden lg:flex flex-col h-screen fixed left-0 top-0 glass-panel z-50 rounded-r-[40px] py-12 items-center justify-between border-l-0 shadow-2xl"
    >
      
      {/* Interaction Controls */}
      <div className="flex flex-col items-center gap-12 w-full px-4">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-black/40 hover:text-black transition-all hover:bg-white/50"
        >
          <PanelLeft size={20} className={isExpanded ? "rotate-180 transition-transform" : "transition-transform"} />
        </button>
      </div>

      {/* Navigation - Ultra Clean */}
      <nav className="flex flex-col gap-4 w-full px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href}
              className={`group flex items-center h-14 rounded-2xl transition-all relative ${
                isActive 
                  ? "bg-white/90 shadow-md text-black" 
                  : "text-black/40 hover:text-black hover:bg-white/60"
              } ${isExpanded ? 'justify-start px-5' : 'justify-center'}`}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} className="relative z-10" />
              <AnimatePresence mode="wait">
                {isExpanded && (
                  <motion.span 
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    transition={{ duration: 0.2 }}
                    className="ml-4 text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap relative z-10"
                    style={{ fontFamily: "'Syncopate', sans-serif" }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && (
                <motion.div 
                  layoutId="active-nav"
                  className="absolute inset-1 bg-white rounded-xl shadow-inner -z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="flex flex-col gap-6 w-full px-3 pt-8 border-t border-black/5">
        <button 
          onClick={handleLogout}
          className={`group flex items-center h-14 rounded-2xl text-black/40 hover:text-red-500 transition-all ${isExpanded ? 'justify-start px-5' : 'justify-center'}`}
        >
          <LogOut size={20} className="shrink-0" />
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.span 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                transition={{ duration: 0.2 }}
                className="ml-4 text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap"
              >
                Disconnect
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        
        <div className={`p-2 rounded-[24px] glass-panel transition-all h-16 overflow-hidden border-white/60 ${isExpanded ? 'w-full flex items-center gap-4 px-4' : 'w-14 mx-auto'}`}>
           <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center text-[12px] font-black shrink-0 shadow-xl">
             {user?.name?.charAt(0) || "U"}
           </div>
           {isExpanded && (
             <div className="truncate">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black leading-none mb-1">{user?.name?.split(' ')[0]}</p>
               <p className="text-[8px] font-bold text-black/30 uppercase tracking-tighter">{user?.role} Tier</p>
             </div>
           )}
        </div>
      </div>
    </motion.aside>
  );
}
