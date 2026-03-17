"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, GaugeCircle, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const SLIDES = [
  {
    id: 0,
    title: (
      <>
        Get Ready to <br/>Drive <GaugeCircle size={36} className="text-white ml-1 inline" strokeWidth={2} />
      </>
    ),
    subtitle: "Rent a car effortlessly anytime, anywhere.",
    image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1400&auto=format&fit=crop", // Yellow sports car
  },
  {
    id: 1,
    title: "Premium Fleet at Your Fingertips",
    subtitle: "Choose from a curated selection of luxury and sports vehicles.",
    image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=1400&auto=format&fit=crop", // Dark Audi/Sports
  },
  {
    id: 2,
    title: "Transparent & Seamless Pricing",
    subtitle: "No hidden fees. What you see is exactly what you pay.",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=1400&auto=format&fit=crop", // Sleek EV
  },
  {
    id: 3,
    title: "Instant Approval & Support",
    subtitle: "Get verified in minutes and hit the road immediately.",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1400&auto=format&fit=crop", // McLaren
  },
  {
    id: 4,
    title: "Unlock Your Next Adventure",
    subtitle: "Your dream car is waiting. Let's get started.",
    image: "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1400&auto=format&fit=crop", // Audi
  }
];

export default function WelcomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [isMounting, setIsMounting] = useState(true);

  useEffect(() => {
    setIsMounting(false);
    if (!isLoading && isAuthenticated) {
      router.replace("/home");
    }
  }, [isAuthenticated, isLoading, router]);

  const nextSlide = () => {
    if (currentSlide < SLIDES.length - 1) {
      setDirection(1);
      setCurrentSlide(s => s + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(s => s - 1);
    }
  };

  const skipToLogin = () => {
    router.push("/login");
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : direction < 0 ? "-100%" : 0,
      opacity: 0,
      scale: 1.1,
      filter: "blur(20px)",
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : direction > 0 ? "-100%" : 0,
      opacity: 0,
      scale: 0.9,
      filter: "blur(20px)",
    }),
  };

  const contentVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  if (isMounting || isLoading || isAuthenticated) {
    return <div className="fixed inset-0 bg-[#0a0a0a]" />;
  }

  return (
    <div className="fixed inset-0 w-full h-[100dvh] bg-[#0a0a0a] overflow-hidden flex flex-col items-center">
      
      {/* Absolute Header - Skip */}
      <div className="absolute top-0 left-0 w-full pt-10 px-6 z-50 flex justify-end pointer-events-none">
         <div className="pointer-events-auto">
            {currentSlide < SLIDES.length - 1 && (
              <button 
                onClick={skipToLogin} 
                className="text-white/80 hover:text-white font-semibold text-[13px] px-5 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 transition-colors shadow-lg"
              >
                Skip
              </button>
            )}
         </div>
      </div>

       {/* Branding - Centered on mobile, top-left on desktop */}
      <AnimatePresence>
        {currentSlide === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute  md:inset-auto md:top-14 md:left-10 z-40 pointer-events-none flex items-center justify-center md:block md:pt-0"
          >
            <span 
              className="font-black text-[3.5rem] sm:text-[4.5rem] md:text-[5rem] lg:text-[6rem] tracking-tighter text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] leading-none uppercase" 
              style={{ fontFamily: "'Syncopate', sans-serif", letterSpacing: "-0.05em" }}
            >
              CARENTY
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Background Image Transitions */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
           key={currentSlide}
           custom={direction}
           variants={variants}
           initial="enter"
           animate="center"
           exit="exit"
           transition={{
             x: { type: "spring", stiffness: 200, damping: 30 },
             opacity: { duration: 0.8 },
             scale: { duration: 1.2 },
             filter: { duration: 1.2 },
           }}
           className="absolute inset-0 w-full h-full"
        >
           <img 
             src={SLIDES[currentSlide].image} 
             alt={`Slide ${currentSlide}`}
             className="w-full h-full object-cover object-center scale-105"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#0a0a0a]" />
        </motion.div>
      </AnimatePresence>

      {/* Content Container (Fixed Bottom) */}
      <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none flex justify-center">
        <div className="w-full max-w-md px-6 pb-12 pt-24 text-white pointer-events-auto flex flex-col justify-end bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent">
          
           <AnimatePresence mode="wait" custom={direction}>
          <motion.div
             key={`content-${currentSlide}`}
             custom={direction}
             variants={contentVariants}
             initial="enter"
             animate="center"
             exit="exit"
             transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
             className="mb-10"
          >
            <h1 className="text-[44px] leading-[1.1] font-bold tracking-tight mb-4 text-white drop-shadow-lg">
              {SLIDES[currentSlide].title}
            </h1>
            <p className="text-lg text-white/80 font-medium max-w-[280px] leading-snug drop-shadow-md">
              {SLIDES[currentSlide].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="flex gap-2 mb-8">
           {SLIDES.map((slide, i) => (
             <div 
               key={slide.id} 
               className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? "w-8 bg-white" : "w-2 bg-white/30"}`}
             />
           ))}
        </div>

        {/* Action Button */}
        {currentSlide < SLIDES.length - 1 ? (
          <div className="w-full glass-panel rounded-full p-2 flex items-center justify-between shadow-2xl backdrop-blur-md border-white/10 bg-black">
             {currentSlide === 0 ? (
               <span className="pl-6 font-semibold text-lg text-white tracking-wide">Next</span>
             ) : (
               <button onClick={prevSlide} className="pl-6 font-semibold text-lg text-white/80 hover:text-white tracking-wide transition-colors">Previous</button>
             )}
             <motion.button
               onClick={nextSlide}
               whileTap={{ scale: 0.98 }}
               className="w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-colors shadow-lg border border-white/10"
             >
               <ArrowRight size={24} className="text-white" />
             </motion.button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Link href="/login" className="w-full glass-panel rounded-full p-2 flex items-center justify-between shadow-2xl backdrop-blur-xl border-white/20 bg-white/10 group">
               <span className="pl-6 font-bold text-lg text-white tracking-wide">Get Started</span>
               <div className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center transition-all group-hover:scale-105 shadow-lg shadow-white/20">
                 <ChevronRight size={24} strokeWidth={3} />
               </div>
            </Link>
          </motion.div>
        )}

        </div>
      </div>

    </div>
  );
}
