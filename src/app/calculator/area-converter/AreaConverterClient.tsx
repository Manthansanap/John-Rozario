"use client";
import React, { useState, useEffect } from "react";
import { Info, Maximize, FileText, ArrowRight } from "lucide-react";

export default function AreaConverterClient() {
  const [inputValue, setInputValue] = useState<number>(1);
  const [inputUnit, setInputUnit] = useState<string>("sqft");
  
  const [results, setResults] = useState({
    sqft: 0,
    sqmtr: 0,
    acre: 0,
    hectare: 0,
    guntha: 0,
    are: 0
  });

  useEffect(() => {
    // Standard conversions based on 1 Sq.ft as base:
    // 1 Sq. Mtr = 10.7639 Sq.ft
    // 1 Acre = 43,560 Sq.ft
    // 1 Hectare = 107,639 Sq.ft
    // 1 Guntha = 1089 Sq.ft
    // 1 Are = 1076.39 Sq.ft

    const multipliers_to_sqft: Record<string, number> = {
      "sqft": 1,
      "sqmtr": 10.7639,
      "acre": 43560,
      "hectare": 107639,
      "guntha": 1089,
      "are": 1076.39
    };

    if (inputValue >= 0) {
      const baseSqft = inputValue * multipliers_to_sqft[inputUnit];

      setResults({
        sqft: baseSqft,
        sqmtr: baseSqft / 10.7639,
        acre: baseSqft / 43560,
        hectare: baseSqft / 107639,
        guntha: baseSqft / 1089,
        are: baseSqft / 1076.39
      });
    }
  }, [inputValue, inputUnit]);

  const units = [
    { id: "sqft", label: "Square Feet" },
    { id: "sqmtr", label: "Square Meters" },
    { id: "acre", label: "Acre" },
    { id: "hectare", label: "Hectare" },
    { id: "guntha", label: "Guntha" },
    { id: "are", label: "Are" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      {/* Inputs */}
      <div className="glass p-8 rounded-3xl border-gold/10 space-y-6">
        <h3 className="text-xl font-serif font-bold text-gold flex items-center gap-2">
          <Maximize size={20} /> Input Measurement
        </h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Input Value</label>
            <input 
              type="number" 
              value={inputValue || ""} 
              onChange={(e) => setInputValue(Number(e.target.value))}
              placeholder="e.g. 1"
              step="0.01"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold/50 outline-none text-xl font-bold transition-all text-white" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Measurement Unit</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {units.map((unit) => (
                <button 
                  key={unit.id}
                  onClick={() => setInputUnit(unit.id)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border ${inputUnit === unit.id ? "bg-gold/10 border-gold text-gold" : "border-white/10 text-gray-400 hover:text-white bg-white/5"}`}
                >
                  {unit.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gold/5 border border-gold/20 p-4 rounded-xl flex gap-3 items-start">
           <Info className="text-gold shrink-0 mt-0.5" size={18} />
           <p className="text-xs text-gray-400 leading-relaxed">
             Guntha, Are, and Hectares are officially recognized measurement units used extensively in Maharashtra\'s 7/12 land extracts.
           </p>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        <div className="glass p-10 rounded-3xl border-gold/20 gold-glow relative overflow-hidden bg-gold-gradient/[0.03]">
          <h3 className="text-xl font-serif font-bold mb-8 text-white flex items-center gap-2">
            <FileText size={20} className="text-gold" /> Converted Values
          </h3>
          
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <div className="border-b border-white/5 pb-2">
              <div className="text-gray-400 text-xs mb-1">Square Feet</div>
              <div className="font-bold text-white text-lg">{results.sqft.toLocaleString(undefined, { maximumFractionDigits: 2 })} <span className="text-xs font-normal text-gray-500">sq.ft</span></div>
            </div>
            
            <div className="border-b border-white/5 pb-2">
              <div className="text-gray-400 text-xs mb-1">Square Meters</div>
              <div className="font-bold text-white text-lg">{results.sqmtr.toLocaleString(undefined, { maximumFractionDigits: 2 })} <span className="text-xs font-normal text-gray-500">sq.m</span></div>
            </div>
            
            <div className="border-b border-white/5 pb-2">
              <div className="text-gray-400 text-xs mb-1">Guntha</div>
              <div className="font-bold text-gold text-lg">{results.guntha.toLocaleString(undefined, { maximumFractionDigits: 4 })} <span className="text-xs font-normal text-gray-500">guntha</span></div>
            </div>
            
            <div className="border-b border-white/5 pb-2">
              <div className="text-gray-400 text-xs mb-1">Are</div>
              <div className="font-bold text-gold text-lg">{results.are.toLocaleString(undefined, { maximumFractionDigits: 4 })} <span className="text-xs font-normal text-gray-500">are</span></div>
            </div>

            <div className="border-b border-white/5 pb-2">
              <div className="text-gray-400 text-xs mb-1">Acre</div>
              <div className="font-bold text-white text-lg">{results.acre.toLocaleString(undefined, { maximumFractionDigits: 4 })} <span className="text-xs font-normal text-gray-500">acre</span></div>
            </div>
            
            <div className="border-b border-white/5 pb-2">
              <div className="text-gray-400 text-xs mb-1">Hectare</div>
              <div className="font-bold text-white text-lg">{results.hectare.toLocaleString(undefined, { maximumFractionDigits: 4 })} <span className="text-xs font-normal text-gray-500">ha</span></div>
            </div>
          </div>

          <div className="mt-8">
            <button 
              onClick={() => window.location.href = "/contact"}
              className="w-full bg-white text-rich-black py-4 rounded-xl font-black flex items-center justify-center gap-3 hover:bg-gold transition-all"
            >
              Verify Title Deeds <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
