"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, Gavel } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-rich-black flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass w-full max-w-md p-10 rounded-3xl border-gold/10 gold-glow space-y-8"
      >
        <div className="text-center space-y-4">
          <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/20">
            <Gavel className="text-gold" size={32} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-white uppercase tracking-wider">Access <span className="text-gold italic">Legal Portal</span></h1>
          <p className="text-gray-500 text-sm">Secure login for clients and administrators.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-4 py-3 rounded-xl text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 focus:border-gold/50 outline-none text-white transition-all" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Secure Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 focus:border-gold/50 outline-none text-white transition-all" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gold-gradient py-5 rounded-xl text-rich-black font-black text-lg flex items-center justify-center gap-3 gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {loading ? "Authenticating..." : "Sign In"} <ArrowRight size={20} />
          </button>
        </form>

        <div className="text-center space-y-4">
          <p className="text-gray-500 text-sm">
            Don't have an account? <Link href="/register" className="text-gold font-bold hover:underline">Register Now</Link>
          </p>
          <Link href="/" className="text-gray-600 text-xs hover:text-gray-400 block transition-colors">Return to Home</Link>
        </div>
      </motion.div>
    </div>
  );
}
