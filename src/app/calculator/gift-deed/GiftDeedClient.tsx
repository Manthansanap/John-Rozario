"use client";
import React, { useState, useEffect } from "react";
import { Info, Gift, Receipt, ArrowRight } from "lucide-react";

export default function GiftDeedClient() {
  const [propertyValue, setPropertyValue] = useState<number>(0);
  const [relation, setRelation] = useState<string>("immediate"); // immediate, blood_other, non_family
  
  const [results, setResults] = useState({
    stampDuty: 0,
    lbtSurcharge: 0,
    registrationFee: 0,
    totalPayable: 0
  });

  useEffect(() => {
    // Maharashtra Gift Deed estimation:
    // Immediate Family (Spouse, Son, Daughter, Grandparents): Stamp Duty is generally Rs. 200
    // However, 1% LBT/Metro Cess is often applicable in urban areas based on property value.
    // Blood Relatives (Brother/Sister): 3% Stamp Duty + 1% LBT
    // Non-Family: Regular Stamp Duty (e.g. 5% + 1% + 1% = 7%)
    // Registration Fee: 1% (Max 30,000)

    let calculatedStampDuty = 200;
    let lbtSurcharge = 0;
    
    if (relation === "immediate") {
      calculatedStampDuty = 200;
      // Estimation of LBT/Metro Cess on family transfer
      lbtSurcharge = (propertyValue * 1) / 100;
    } else if (relation === "blood_other") {
      calculatedStampDuty = (propertyValue * 3) / 100;
      lbtSurcharge = (propertyValue * 1) / 100;
    } else {
      // Non family (Standard)
      calculatedStampDuty = (propertyValue * 5) / 100;
      lbtSurcharge = (propertyValue * 2) / 100;
    }

    // Reg fee
    let calculatedRegFee = Math.min((propertyValue * 1) / 100, 30000);
    if(relation === "immediate" && propertyValue === 0) calculatedRegFee = 200; // Edge case if blank

    setResults({
      stampDuty: calculatedStampDuty,
      lbtSurcharge: lbtSurcharge,
      registrationFee: calculatedRegFee,
      totalPayable: calculatedStampDuty + lbtSurcharge + calculatedRegFee
    });
  }, [propertyValue, relation]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      {/* Inputs */}
      <div className="glass p-8 rounded-3xl border-gold/10 space-y-6">
        <h3 className="text-xl font-serif font-bold text-gold flex items-center gap-2">
          <Gift size={20} /> Transfer Details
        </h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Property Value (₹)</label>
            <input 
              type="number" 
              value={propertyValue || ""} 
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              placeholder="e.g. 5000000"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold/50 outline-none text-xl font-bold transition-all text-white" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Recipient Relation to Donor</label>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setRelation("immediate")}
                className={`py-3 px-4 rounded-xl text-sm font-bold text-left transition-all border ${relation === "immediate" ? "bg-gold/10 border-gold text-gold" : "border-white/10 text-gray-400 hover:text-white bg-white/5"}`}
              >
                Immediate Family (Spouse, Child, Grandchild)
              </button>
              <button 
                onClick={() => setRelation("blood_other")}
                className={`py-3 px-4 rounded-xl text-sm font-bold text-left transition-all border ${relation === "blood_other" ? "bg-gold/10 border-gold text-gold" : "border-white/10 text-gray-400 hover:text-white bg-white/5"}`}
              >
                Other Blood Relative (Brother, Sister)
              </button>
              <button 
                onClick={() => setRelation("non_family")}
                className={`py-3 px-4 rounded-xl text-sm font-bold text-left transition-all border ${relation === "non_family" ? "bg-gold/10 border-gold text-gold" : "border-white/10 text-gray-400 hover:text-white bg-white/5"}`}
              >
                Non-Family Member / Third Party
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gold/5 border border-gold/20 p-4 rounded-xl flex gap-3 items-start">
           <Info className="text-gold shrink-0 mt-0.5" size={18} />
           <p className="text-xs text-gray-400 leading-relaxed">
             Family relations benefit from significant exemptions under the Maharashtra Stamp Act. However, 1% Local Body Tax or Metro Cess may still apply based on municipal zones.
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
              <div className="text-gray-400">Basic Stamp Duty</div>
              <div className="font-bold text-white">₹ {results.stampDuty.toLocaleString()}</div>
            </div>
            
            <div className="flex justify-between items-end border-b border-white/5 pb-2">
              <div className="text-gray-400">LBT / Metro Surcharge</div>
              <div className="text-lg font-bold text-gold">₹ {results.lbtSurcharge.toLocaleString()}</div>
            </div>
            
            <div className="flex justify-between items-end border-b border-white/5 pb-4">
              <div className="text-gray-400">Registration Fee (1% till 30k)</div>
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
              Draft Gift Deed <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-600 text-center italic">
          * Note: Municipal corporations often charge a 1% LBT even on Rs. 200 base-rate family gift deeds. Ensure verification via ready reckoner rates.
        </p>
      </div>
    </div>
  );
}
