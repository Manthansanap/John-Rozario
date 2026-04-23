"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Phone, Mail, CheckCircle2, ArrowRight, Gavel } from "lucide-react";

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const times = ["10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "06:00 PM"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-12 rounded-3xl max-w-lg text-center space-y-6 gold-glow"
        >
          <div className="bg-gold/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-gold" />
          </div>
          <h2 className="text-4xl font-serif font-bold text-white">Booking <span className="text-gold italic">Confirmed</span></h2>
          <p className="text-gray-400">Your appointment has been scheduled. Adv. Rozario John's office will reach out to confirm the details shortly.</p>
          <button 
            onClick={() => window.location.href = "/"}
            className="bg-gold-gradient text-rich-black px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform mt-4"
          >
            Return to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-rich-black min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/20">
            <Gavel className="text-gold" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Book a <span className="text-gold italic">Consultation</span></h1>
          <p className="text-gray-400">Secure your private legal session with Adv. Rozario John.</p>
        </div>

        <div className="glass p-8 md:p-12 rounded-3xl border-gold/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full" />
          
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Steps Visualizer */}
            <div className="flex items-center justify-center gap-4 mb-12">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s}
                  className={`h-2 w-12 rounded-full transition-all ${step >= s ? "bg-gold" : "bg-white/10"}`}
                />
              ))}
            </div>

            {/* Step 1: Personal Details */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <h3 className="text-2xl font-serif font-bold flex items-center gap-2"><User size={24} className="text-gold" /> Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-gold/50 outline-none text-white transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Contact Number</label>
                    <input 
                      required
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+91..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-gold/50 outline-none text-white transition-all" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address (Optional)</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="name@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-gold/50 outline-none text-white transition-all" 
                  />
                </div>
                <button 
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full md:w-auto bg-gold-gradient px-12 py-4 rounded-xl text-rich-black font-black text-lg flex items-center justify-center gap-3 gold-glow hover:scale-105 transition-all"
                >
                  Next Step <ArrowRight size={20} />
                </button>
              </motion.div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <h3 className="text-2xl font-serif font-bold flex items-center gap-2"><Calendar size={24} className="text-gold" /> Schedule Session</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Select Date</label>
                    <input 
                      type="date" 
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-gold/50 outline-none text-white transition-all cursor-pointer invert opacity-80" 
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Available Time Slots</label>
                    <div className="grid grid-cols-2 gap-3">
                      {times.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setFormData({...formData, time: t})}
                          className={`p-3 rounded-xl border transition-all text-xs font-bold ${formData.time === t ? "bg-gold text-rich-black border-gold" : "bg-white/5 border-white/10 text-gray-400 hover:border-gold/30"}`}
                        >
                          <Clock size={14} className="inline mr-2" /> {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 text-gray-500 font-bold hover:text-white transition-colors">Go Back</button>
                  <button 
                    type="button"
                    disabled={!formData.date || !formData.time}
                    onClick={() => setStep(3)}
                    className="flex-[2] bg-gold-gradient px-12 py-4 rounded-xl text-rich-black font-black text-lg flex items-center justify-center gap-3 gold-glow hover:scale-105 disabled:opacity-50 transition-all"
                  >
                    Next Step <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Final Brief */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <h3 className="text-2xl font-serif font-bold flex items-center gap-2"><Mail size={24} className="text-gold" /> Brief your Case</h3>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">How can we help you? (Optional)</label>
                  <textarea 
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Describe your legal requirement briefly..." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-gold/50 outline-none text-white transition-all resize-none"
                  />
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={() => setStep(2)} className="flex-1 py-4 text-gray-500 font-bold hover:text-white transition-colors">Go Back</button>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="flex-[2] bg-gold-gradient px-12 py-4 rounded-xl text-rich-black font-black text-lg flex items-center justify-center gap-3 gold-glow hover:scale-105 disabled:opacity-50 transition-all"
                  >
                    {loading ? "Processing..." : "Confirm Booking"} <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
