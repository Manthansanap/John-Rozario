"use client";
import React, { useState, useEffect } from "react";
import { Info, Briefcase, Receipt, ArrowRight } from "lucide-react";

export default function MortgageClient() {
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [mortgageType, setMortgageType] = useState<string>("equitable"); // equitable vs simple
  
  const [results, setResults] = useState({
    stampDuty: 0,
    registrationFee: 0,
    totalPayable: 0
  });

  useEffect(() => {
    // Mortgage logic Maharashtra
    // Equitable Mortgage (Deposit of Title Deeds): 0.1% or 0.2%. Let's use 0.1%
    // Simple Mortgage (Without possession): 0.5%
    // Registration Fee: 1% max 30,000

    let calculatedStampDuty = 0;
    
    if (mortgageType === "equitable") {
      // 0.1% of loan amount, usually capped, but we'll show raw
      calculatedStampDuty = (loanAmount * 0.1) / 100;
    } else {
      // Simple mortgage without possession
      calculatedStampDuty = (loanAmount * 0.5) / 100;
      // Cap at 10 lakh for equitable, simple usually doesn't have a cap but let's keep logic simple
    }

    if (mortgageType === "equitable" && calculatedStampDuty > 1000000) {
      calculatedStampDuty = 1000000;
    }

    const calculatedRegFee = Math.min((loanAmount * 1) / 100, 30000);

    setResults({
      stampDuty: Math.round(calculatedStampDuty),
      registrationFee: Math.round(calculatedRegFee),
      totalPayable: Math.round(calculatedStampDuty + calculatedRegFee)
    });
  }, [loanAmount, mortgageType]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      {/* Inputs */}
      <div className="glass p-8 rounded-3xl border-gold/10 space-y-6">
        <h3 className="text-xl font-serif font-bold text-gold flex items-center gap-2">
          <Briefcase size={20} /> Loan Details
        </h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Secured Loan Amount (₹)</label>
            <input 
              type="number" 
              value={loanAmount || ""} 
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              placeholder="e.g. 7500000"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold/50 outline-none text-xl font-bold transition-all text-white" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Nature of Mortgage</label>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setMortgageType("equitable")}
                className={`py-3 px-4 rounded-xl text-sm font-bold text-left transition-all border ${mortgageType === "equitable" ? "bg-gold/10 border-gold text-gold" : "border-white/10 text-gray-400 hover:text-white bg-white/5"}`}
              >
                Equitable Mortgage<br/> <span className="text-xs font-normal text-gray-400">(Deposit of Title Deeds - Usually 0.1%)</span>
              </button>
              <button 
                onClick={() => setMortgageType("simple")}
                className={`py-3 px-4 rounded-xl text-sm font-bold text-left transition-all border ${mortgageType === "simple" ? "bg-gold/10 border-gold text-gold" : "border-white/10 text-gray-400 hover:text-white bg-white/5"}`}
              >
                Simple Mortgage<br/> <span className="text-xs font-normal text-gray-400">(Without Possession - Usually 0.5%)</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gold/5 border border-gold/20 p-4 rounded-xl flex gap-3 items-start">
           <Info className="text-gold shrink-0 mt-0.5" size={18} />
           <p className="text-xs text-gray-400 leading-relaxed">
             Bank loans typically utilize Equitable Mortgages. Registration is highly advised to create a clear charge on the encumbrance certificate.
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
              <div className="text-gray-400">Mortgage Stamp Duty</div>
              <div className="font-bold text-white">₹ {results.stampDuty.toLocaleString()}</div>
            </div>
            
            <div className="flex justify-between items-end border-b border-white/5 pb-4">
              <div className="text-gray-400">Registration Fee (1% max ₹30,000)</div>
              <div className="text-lg font-bold text-white">₹ {results.registrationFee.toLocaleString()}</div>
            </div>

            <div className="pt-4">
              <div className="text-xs text-gold font-bold uppercase tracking-widest mb-2">Total Estimated Payable</div>
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
              Consult Mortgage Rules <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-600 text-center italic">
          * Note: If possession of the property is handed over to the mortgagee, stamp duty spikes to regular sale deed rates (5-7%).
        </p>
      </div>
    </div>
  );
}
