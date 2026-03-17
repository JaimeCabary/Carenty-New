"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, ArrowRight } from "lucide-react";
import { authApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});
type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [serverError, setServerError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setServerError("");
    try {
      const res = await authApi.login(data);
      const { token, name, role, id } = res.data;
      login(token, name, data.email, id, role);
      router.push("/home");
    } catch (err: unknown) {
      setServerError("Invalid credentials.");
    }
  };

  return (
    <div className="relative w-full min-h-[100dvh] bg-black overflow-hidden flex flex-col justify-center items-center px-6 py-12">
      
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
         <img 
           src="https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=1400&auto=format&fit=crop" 
           alt="Dark Luxury Car"
           className="w-full h-full object-cover object-center scale-105 opacity-50 contrast-125"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/60" />
      </div>

      {/* Fixed Desktop Back Button */}
      <button onClick={() => router.back()} className="fixed top-6 left-6 md:top-8 md:left-8 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
         <ArrowLeft size={22} />
      </button>

      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6 }}
         className="w-full max-w-md relative z-10"
      >
        
        {/* Header */}
        <div className="mb-10 pl-2 text-center md:text-left">
           <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tighter leading-none mb-4 italic uppercase" style={{ fontFamily: "'Syncopate', sans-serif" }}>
             Welcome<br/>
             <span className="text-white/40">Back.</span>
           </h1>
           <p className="text-[11px] text-white/30 font-black uppercase tracking-[0.4em]">Authorized Access Only</p>
        </div>

        {/* Form Container */}
        <div className="glass-dark rounded-[40px] p-8 border border-white/5 relative overflow-hidden backdrop-blur-3xl bg-white/[0.02]">
           
           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div>
                 <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2 block pl-1">Email Identity</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <input 
                      {...register("email")}
                      type="email"
                      placeholder="name@example.com" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 pl-12 pr-4 text-[15px] font-bold text-white focus:outline-none focus:border-white/40 transition-all placeholder:text-white/20 placeholder:font-normal"
                      style={{ WebkitTextFillColor: 'white' }}
                    />
                  </div>
                  {errors.email && <span className="text-red-400 text-[10px] mt-2 font-black uppercase tracking-widest pl-1 block">{errors.email.message}</span>}
              </div>

              <div>
                 <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2 block pl-1">Security Key</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      {...register("password")}
                      type={showPass ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 pl-12 pr-12 text-[15px] font-bold text-white focus:outline-none focus:border-white/40 transition-all placeholder:text-white/20 placeholder:font-normal"
                      style={{ WebkitTextFillColor: 'white' }}
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all p-1">
                      {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                 <div className="flex justify-end mt-2 px-1">
                   <button type="button" className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors">Emergency Reset?</button>
                 </div>
              </div>

              {serverError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-[11px] font-black uppercase tracking-widest text-center">
                  {serverError}
                </div>
              )}

              <button type="submit" className="group w-full rounded-full p-2 flex items-center justify-between bg-white text-black hover:bg-white/90 transition-all mt-8">
                 <span className="pl-8 font-black text-[13px] uppercase tracking-[0.2em]">Enter Carenty</span>
                 <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center transition-all group-hover:scale-105 shadow-xl">
                   <ArrowRight size={20} />
                 </div>
              </button>
           </form>

           <div className="text-center mt-10">
              <p className="text-[12px] text-white/30 font-black uppercase tracking-widest leading-loose">
                 New to the fleet?<br/>
                 <Link href="/signup" className="text-white hover:text-white/70 font-black transition-colors underline decoration-white/20 underline-offset-4">Apply for Access</Link>
              </p>
           </div>
        </div>

      </motion.div>
    </div>
  );
}
