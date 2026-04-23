"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, Info, Landmark, Receipt, ArrowRight } from "lucide-react";

export default function CalculatorPage() {
  const [propertyValue, setPropertyValue] = useState<number>(0);
  const [gender, setGender] = useState<string>("male");
  const [area, setArea] = useState<string>("urban"); // urban vs rural
  
  const [results, setResults] = useState({
    stampDuty: 0,
    registrationFee: 0,
    total: 0,
    percentage: 0
  });

  useEffect(() => {
    // Basic Maharashtra/Pune Logic
    // Urban: 7% (5% Stamp + 1% Surcharge + 1% Metro Cess)
    // Female: 1% concession usually
    // Registration: 1% or max 30,000
    
    let stampRate = area === "urban" ? 7 : 6;
    if (gender === "female") stampRate -= 1;

    const stampDuty = (propertyValue * stampRate) / 100;
    const registrationFee = Math.min((propertyValue * 1) / 100, 30000);
    const total = stampDuty + registrationFee;

    setResults({
      stampDuty,
      registrationFee,
      total,
      percentage: stampRate
    });
  }, [propertyValue, gender, area]);

  return (
    <div className="bg-rich-black min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/20"
          >
            <Calculator className="text-gold" size={32} />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">Stamp Duty <span className="text-gold italic">Calculator</span></h1>
          <p className="text-gray-400">Estimate your property registration costs for Pune and Maharashtra regions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Inputs */}
          <div className="glass p-8 rounded-3xl border-gold/10 space-y-8">
            <h3 className="text-xl font-serif font-bold text-gold flex items-center gap-2">
              <Landmark size={20} /> Property Details
            </h3>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Property Agreement Value (₹)</label>
              <input 
                type="number" 
                value={propertyValue || ""} 
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                placeholder="e.g. 5000000"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-gold/50 outline-none text-2xl font-bold transition-all text-white" 
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Gender</label>
                <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
                  <button 
                    onClick={() => setGender("male")}
                    className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${gender === "male" ? "bg-gold text-rich-black" : "text-gray-400 hover:text-white"}`}
                  >
                    Male
                  </button>
                  <button 
                    onClick={() => setGender("female")}
                    className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${gender === "female" ? "bg-gold text-rich-black" : "text-gray-400 hover:text-white"}`}
                  >
                    Female
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Area Type</label>
                <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
                  <button 
                    onClick={() => setArea("urban")}
                    className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${area === "urban" ? "bg-gold text-rich-black" : "text-gray-400 hover:text-white"}`}
                  >
                    Urban
                  </button>
                  <button 
                    onClick={() => setArea("rural")}
                    className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${area === "rural" ? "bg-gold text-rich-black" : "text-gray-400 hover:text-white"}`}
                  >
                    Rural
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gold/5 border border-gold/20 p-4 rounded-xl flex gap-3 items-start">
               <Info className="text-gold shrink-0 mt-0.5" size={18} />
               <p className="text-xs text-gray-400 leading-relaxed">
                 Calculations are based on 2024 Maharashtra Stamp Act norms for Pune. Includes 1% Metro Cess and 1% Local Body Surcharge where applicable.
               </p>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            <div className="glass p-10 rounded-3xl border-gold/20 gold-glow relative overflow-hidden bg-gold-gradient/[0.03]">
              <h3 className="text-xl font-serif font-bold mb-8 text-white flex items-center gap-2">
                <Receipt size={20} className="text-gold" /> Estimated Breakdown
              </h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-white/5 pb-4">
                  <div className="text-sm text-gray-400 uppercase tracking-widest">Stamp Duty ({results.percentage}%)</div>
                  <div className="text-2xl font-serif font-black text-gold">₹ {results.stampDuty.toLocaleString()}</div>
                </div>
                
                <div className="flex justify-between items-end border-b border-white/5 pb-4">
                  <div className="text-sm text-gray-400 uppercase tracking-widest">Registration Fee (1%)</div>
                  <div className="text-2xl font-serif font-black text-white">₹ {results.registrationFee.toLocaleString()}</div>
                </div>

                <div className="pt-6">
                  <div className="text-xs text-gold font-bold uppercase tracking-widest mb-2">Total Estimated Payable</div>
                  <div className="text-5xl font-serif font-black text-white">
                    ₹ {results.total.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <button 
                  onClick={() => window.location.href = "/contact"}
                  className="w-full bg-white text-rich-black py-4 rounded-xl font-black flex items-center justify-center gap-3 hover:bg-gold transition-all"
                >
                  Contact for Verification <ArrowRight size={20} />
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-600 text-center italic">
              * Note: These are estimated values. Actual costs may vary based on exact location (Ready Reckoner Rates) and specific government updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
