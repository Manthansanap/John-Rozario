"use client";
import React, { useState, useEffect } from "react";
import { Info, Home, Receipt, ArrowRight } from "lucide-react";

export default function LeaveLicenseClient() {
  const [monthlyRent, setMonthlyRent] = useState<number>(0);
  const [securityDeposit, setSecurityDeposit] = useState<number>(0);
  const [tenureMonths, setTenureMonths] = useState<number>(11);
  const [area, setArea] = useState<string>("urban");
  
  const [results, setResults] = useState({
    totalRentA: 0,
    depositInterestB: 0,
    totalTaxableAandB: 0,
    stampDuty: 0,
    registrationFee: 0,
    totalPayable: 0
  });

  useEffect(() => {
    // Formula for Maharashtra L&L:
    // A = Total Rent for the period (Monthly Rent * Tenure in Months)
    // B = 10% per annum interest on non-refundable deposit/refundable deposit (For simple calculation, it's (Deposit * 10% * Tenure in Months) / 12)
    // Total Taxable Value = A + B
    // Stamp Duty = 0.25% of Total Taxable Value
    // Registration Fee = Rs. 1000 (Urban) or Rs. 500 (Rural)
    
    const rentTotal = monthlyRent * tenureMonths;
    const depositInterest = (securityDeposit * 10 * tenureMonths) / (12 * 100);
    const taxableValue = rentTotal + depositInterest;
    
    const calculatedStampDuty = Math.round((taxableValue * 0.25) / 100);
    const calculatedRegFee = area === "urban" ? 1000 : 500;

    setResults({
      totalRentA: rentTotal,
      depositInterestB: depositInterest,
      totalTaxableAandB: taxableValue,
      stampDuty: calculatedStampDuty,
      registrationFee: calculatedRegFee,
      totalPayable: calculatedStampDuty + calculatedRegFee
    });
  }, [monthlyRent, securityDeposit, tenureMonths, area]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      {/* Inputs */}
      <div className="glass p-8 rounded-3xl border-gold/10 space-y-6">
        <h3 className="text-xl font-serif font-bold text-gold flex items-center gap-2">
          <Home size={20} /> Agreement Details
        </h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Monthly Rent (₹)</label>
            <input 
              type="number" 
              value={monthlyRent || ""} 
              onChange={(e) => setMonthlyRent(Number(e.target.value))}
              placeholder="e.g. 25000"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold/50 outline-none text-xl font-bold transition-all text-white" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Security Deposit (₹)</label>
            <input 
              type="number" 
              value={securityDeposit || ""} 
              onChange={(e) => setSecurityDeposit(Number(e.target.value))}
              placeholder="e.g. 100000"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold/50 outline-none text-xl font-bold transition-all text-white" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Tenure (In Months)</label>
            <input 
              type="number" 
              value={tenureMonths || ""} 
              onChange={(e) => setTenureMonths(Number(e.target.value))}
              placeholder="e.g. 11, 24, 36"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold/50 outline-none text-xl font-bold transition-all text-white" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Property Location</label>
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
            <button 
              onClick={() => setArea("urban")}
              className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${area === "urban" ? "bg-gold text-rich-black" : "text-gray-400 hover:text-white"}`}
            >
              Urban (Corp. Area)
            </button>
            <button 
              onClick={() => setArea("rural")}
              className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${area === "rural" ? "bg-gold text-rich-black" : "text-gray-400 hover:text-white"}`}
            >
              Rural (Panchayat)
            </button>
          </div>
        </div>

        <div className="bg-gold/5 border border-gold/20 p-4 rounded-xl flex gap-3 items-start">
           <Info className="text-gold shrink-0 mt-0.5" size={18} />
           <p className="text-xs text-gray-400 leading-relaxed">
             This calculation uses the standard Maharashtra logic (0.25% stamp duty on taxable rent + interest value). Registration logic applies dynamically based on zone.
           </p>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        <div className="glass p-10 rounded-3xl border-gold/20 gold-glow relative overflow-hidden bg-gold-gradient/[0.03]">
          <h3 className="text-xl font-serif font-bold mb-8 text-white flex items-center gap-2">
            <Receipt size={20} className="text-gold" /> Stamp & Registration
          </h3>
          
          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-end border-b border-white/5 pb-2">
              <div className="text-gray-400">Taxable Rent & Deposit Interest</div>
              <div className="font-bold text-white">₹ {Math.round(results.totalTaxableAandB).toLocaleString()}</div>
            </div>
            
            <div className="flex justify-between items-end border-b border-white/5 pb-2">
              <div className="text-gray-400">Stamp Duty (0.25%)</div>
              <div className="text-lg font-bold text-gold">₹ {results.stampDuty.toLocaleString()}</div>
            </div>
            
            <div className="flex justify-between items-end border-b border-white/5 pb-4">
              <div className="text-gray-400">Registration Fee ({area === "urban" ? "₹1000" : "₹500"})</div>
              <div className="text-lg font-bold text-white">₹ {results.registrationFee.toLocaleString()}</div>
            </div>

            <div className="pt-4">
              <div className="text-xs text-gold font-bold uppercase tracking-widest mb-2">Total Government Payable</div>
              <div className="text-4xl font-serif font-black text-white">
                ₹ {results.totalPayable.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button 
              onClick={() => window.location.href = "/contact"}
              className="w-full bg-white text-rich-black py-4 rounded-xl font-black flex items-center justify-center gap-3 hover:bg-gold transition-all"
            >
              Draft & Register Agreement <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-600 text-center italic">
          * Note: Professional drafting and lawyer fees are separate from government stamp duty and registration fees. Contact us for the complete drafting structure.
        </p>
      </div>
    </div>
  );
}
