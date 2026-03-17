"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Compass, CalendarDays, User } from "lucide-react";
import { motion } from "framer-motion";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/home", icon: Home },
    { href: "/cars", icon: Compass },
    { href: "/bookings", icon: CalendarDays },
    { href: "/profile", icon: User },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-[400px] z-[100] lg:hidden">
      <nav className="glass-pill h-[72px] rounded-full px-4 flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href} 
              className="relative w-12 h-12 flex items-center justify-center transition-all duration-500"
            >
              {isActive && (
                <motion.div 
                  layoutId="bottom-nav-active-pill"
                  className="absolute w-10 h-10 bg-white shadow-[0_0_25px_rgba(255,255,255,0.4)] rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <item.icon 
                 size={22} 
                 className={`relative z-10 transition-colors duration-500 ${isActive ? "text-black" : "text-white/20"}`} 
                 strokeWidth={isActive ? 2.5 : 2}
              />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
