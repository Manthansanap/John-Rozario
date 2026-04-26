"use client";
import React, { useState, useEffect } from "react";
import { Info, Percent, Receipt, ArrowRight } from "lucide-react";

export default function LoanEmiClient() {
  const [principal, setPrincipal] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [tenureYears, setTenureYears] = useState<number>(0);
  
  const [results, setResults] = useState({
    monthlyEmi: 0,
    totalInterest: 0,
    totalPayment: 0
  });

  useEffect(() => {
    // EMI Formula: E = P x r x (1+r)^n / ((1+r)^n - 1)
    if (principal > 0 && interestRate > 0 && tenureYears > 0) {
      const p = principal;
      const r = interestRate / 12 / 100;
      const n = tenureYears * 12;

      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = emi * n;
      const totalInterest = totalPayment - p;

      setResults({
        monthlyEmi: Math.round(emi),
        totalInterest: Math.round(totalInterest),
        totalPayment: Math.round(totalPayment)
      });
    } else {
      setResults({
        monthlyEmi: 0,
        totalInterest: 0,
        totalPayment: 0
      });
    }
  }, [principal, interestRate, tenureYears]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      {/* Inputs */}
      <div className="glass p-8 rounded-3xl border-gold/10 space-y-6">
        <h3 className="text-xl font-serif font-bold text-gold flex items-center gap-2">
          <Percent size={20} /> Loan Details
        </h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Principal Loan Amount (₹)</label>
            <input 
              type="number" 
              value={principal || ""} 
              onChange={(e) => setPrincipal(Number(e.target.value))}
              placeholder="e.g. 5000000"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold/50 outline-none text-xl font-bold transition-all text-white" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Annual Interest Rate (%)</label>
            <input 
              type="number" 
              value={interestRate || ""} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              placeholder="e.g. 8.5"
              step="0.1"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold/50 outline-none text-xl font-bold transition-all text-white" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Loan Tenure (Years)</label>
            <input 
              type="number" 
              value={tenureYears || ""} 
              onChange={(e) => setTenureYears(Number(e.target.value))}
              placeholder="e.g. 15"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold/50 outline-none text-xl font-bold transition-all text-white" 
            />
          </div>
        </div>

        <div className="bg-gold/5 border border-gold/20 p-4 rounded-xl flex gap-3 items-start">
           <Info className="text-gold shrink-0 mt-0.5" size={18} />
           <p className="text-xs text-gray-400 leading-relaxed">
             This calculation relies on the standard reducing balance method used by Indian banking institutions for Home Loans and Mortgages.
           </p>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        <div className="glass p-10 rounded-3xl border-gold/20 gold-glow relative overflow-hidden bg-gold-gradient/[0.03]">
          <h3 className="text-xl font-serif font-bold mb-8 text-white flex items-center gap-2">
            <Receipt size={20} className="text-gold" /> Repayment Breakdown
          </h3>
          
          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-end border-b border-white/5 pb-2">
              <div className="text-gray-400">Principal Amount</div>
              <div className="font-bold text-white">₹ {principal.toLocaleString()}</div>
            </div>
            
            <div className="flex justify-between items-end border-b border-white/5 pb-2">
              <div className="text-gray-400">Total Interest Payable</div>
              <div className="text-lg font-bold text-gold">₹ {results.totalInterest.toLocaleString()}</div>
            </div>
            
            <div className="flex justify-between items-end border-b border-white/5 pb-4">
              <div className="text-gray-400">Total Payment (Principal + Interest)</div>
              <div className="text-lg font-bold text-white">₹ {results.totalPayment.toLocaleString()}</div>
            </div>

            <div className="pt-4">
              <div className="text-xs text-gold font-bold uppercase tracking-widest mb-2">Equated Monthly Installment (EMI)</div>
              <div className="text-5xl font-serif font-black text-white">
                ₹ {results.monthlyEmi.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button 
              onClick={() => window.location.href = "/contact"}
              className="w-full bg-white text-rich-black py-4 rounded-xl font-black flex items-center justify-center gap-3 hover:bg-gold transition-all"
            >
              Consult for Mortgage Registration <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-600 text-center italic">
          * Note: Actual EMI may vary based on bank processing fees, fluctuating repo rates (floating vs fixed), and specific moratoriums.
        </p>
      </div>
    </div>
  );
}
