"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone, Eye, EyeOff, ArrowLeft, Loader2, ArrowRight, Car, UserCircle } from "lucide-react";
import { authApi } from "@/lib/api";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().length(11, "Must be exactly 11 digits"),
  password: z.string().min(8, "Minimum 8 characters"),
  role: z.enum(["Driver", "Owner"]),
});
type FormData = z.infer<typeof schema>;

export default function SignupPage() {
  const [showPass, setShowPass] = useState(false);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"Driver" | "Owner">("Driver");
  const router = useRouter();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({ 
    resolver: zodResolver(schema),
    defaultValues: { role: "Driver" }
  });

  const onSubmit = async (data: FormData) => {
    setServerError("");
    setLoading(true);
    try {
      await authApi.signup(data);
      router.push("/login");
    } catch (err: any) {
      setServerError(err.response?.data?.message || "Registration failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (role: "Driver" | "Owner") => {
    setSelectedRole(role);
    setValue("role", role);
  };

  return (
    <div className="relative w-full min-h-[100dvh] bg-black overflow-hidden flex flex-col justify-center items-center px-6 py-12">
      
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
         <img 
           src="https://images.unsplash.com/photo-1544840897-dfa9ee86d4e8?q=80&w=1400&auto=format&fit=crop" 
           alt="Dark Luxury Car Interior"
           className="w-full h-full object-cover object-center scale-105 opacity-40"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
      </div>

      {/* Fixed Desktop Back Button */}
      <button onClick={() => router.back()} className="fixed top-6 left-6 md:top-8 md:left-8 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
         <ArrowLeft size={22} />
      </button>

      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6 }}
         className="w-full max-w-md relative z-10 flex flex-col"
      >
        
        {/* Header */}
        <div className="mb-8 pl-2 text-center md:text-left">
           <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tighter leading-none mb-3 italic uppercase" style={{ fontFamily: "'Syncopate', sans-serif" }}>
             Join<br/>
             <span className="text-white/40">Carenty.</span>
           </h1>
           <p className="text-[11px] text-white/30 font-black uppercase tracking-[0.3em]">Create your premium identity</p>
        </div>

        {/* Form Container */}
        <div className="glass-dark rounded-[40px] p-8 border border-white/5 relative overflow-hidden backdrop-blur-3xl bg-white/[0.02]">
           
           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Role Selection */}
              <div className="grid grid-cols-2 gap-4 mb-2">
                 <button 
                   type="button"
                   onClick={() => handleRoleSelect("Driver")}
                   className={`h-24 rounded-3xl border flex flex-col items-center justify-center gap-2 transition-all ${selectedRole === "Driver" ? "bg-white text-black border-white shadow-xl scale-[1.02]" : "bg-white/5 border-white/5 text-white/40 hover:border-white/10"}`}
                 >
                    <UserCircle size={24} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Driver</span>
                 </button>
                 <button 
                   type="button"
                   onClick={() => handleRoleSelect("Owner")}
                   className={`h-24 rounded-3xl border flex flex-col items-center justify-center gap-2 transition-all ${selectedRole === "Owner" ? "bg-white text-black border-white shadow-xl scale-[1.02]" : "bg-white/5 border-white/5 text-white/40 hover:border-white/10"}`}
                 >
                    <Car size={24} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Owner</span>
                 </button>
              </div>

              <InputRow label="Full Name" icon={User} error={errors.name?.message} register={register("name")} placeholder="John Doe" />
              <InputRow label="Email Address" icon={Mail} error={errors.email?.message} register={register("email")} placeholder="name@example.com" type="email" />
              <InputRow label="Phone Number" icon={Phone} error={errors.phone?.message} register={register("phone")} placeholder="08012345678" type="tel" maxLength={11} />

              <div>
                 <div className="flex justify-between items-baseline mb-2">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pl-1 block">Password</label>
                    {errors.password && <span className="text-red-400 text-[10px] font-black uppercase tracking-widest">{errors.password.message}</span>}
                 </div>
                 <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      {...register("password")}
                      type={showPass ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 pl-12 pr-12 text-[15px] font-bold text-white focus:outline-none focus:border-white/40 transition-all placeholder:text-white/20 placeholder:font-normal"
                      style={{ WebkitTextFillColor: 'white' }}
                    />
                     <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all p-1">
                       {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
                     </button>
                 </div>
              </div>

              {serverError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-[12px] font-black uppercase tracking-widest text-center">
                  {serverError}
                </div>
              )}

              <button type="submit" disabled={loading} className="group w-full rounded-full p-2 flex items-center justify-between bg-white text-black hover:bg-white/90 transition-all mt-8">
                 <span className="pl-8 font-black text-[13px] uppercase tracking-[0.2em]">
                   {loading ? "Initializing..." : "Register"}
                 </span>
                 <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center transition-all group-hover:scale-105 shadow-xl">
                   {loading ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={20} />}
                 </div>
              </button>
           </form>

           <div className="text-center mt-8">
              <p className="text-[12px] text-white/30 font-black uppercase tracking-widest">
                 Authorized already? <Link href="/login" className="text-white hover:text-white/70 transition-colors ml-1 underline decoration-white/20 underline-offset-4">Sign In</Link>
              </p>
           </div>
        </div>

      </motion.div>
    </div>
  );
}

function InputRow({ label, icon: Icon, error, register, placeholder, type = "text", maxLength }: any) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
         <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pl-1 block">{label}</label>
         {error && <span className="text-red-400 text-[10px] font-black uppercase tracking-widest pr-1">{error}</span>}
      </div>
      <div className="relative">
        <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
         <input
          {...register}
          type={type}
          maxLength={maxLength}
          placeholder={placeholder}
          className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 pl-12 pr-4 text-[15px] font-bold text-white focus:outline-none focus:border-white/40 transition-all placeholder:text-white/20 placeholder:font-normal"
          style={{ 
            WebkitTextFillColor: 'white',
          }}
        />
      </div>
    </div>
  );
}
