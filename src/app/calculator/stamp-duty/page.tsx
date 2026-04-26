import React from "react";
import StampDutyClient from "./StampDutyClient";
import { Calculator } from "lucide-react";

export const metadata = {
  title: "Stamp Duty Calculator Maharashtra | Adv. Rozario John",
  description: "Calculate property stamp duty and registration fees in Maharashtra. Get accurate estimates for Pune and urban/rural areas including women rebate concessions.",
  keywords: "stamp duty calculator maharashtra, property registration fee pune, women rebate property, gst real estate maharashtra, legal agreement costs",
};

export default function StampDutyPage() {
  return (
    <div className="bg-rich-black min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/20">
            <Calculator className="text-gold" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">Stamp Duty <span className="text-gold italic">Calculator</span></h1>
          <p className="text-gray-400">Estimate your property registration costs for Pune and Maharashtra regions.</p>
        </div>

        <StampDutyClient />

        {/* Legal Writeup Section */}
        <div className="mt-20 glass p-8 md:p-12 rounded-3xl border-gold/10 space-y-8">
          <h2 className="text-3xl font-serif font-bold text-white border-b border-white/10 pb-4">About This Calculator</h2>
          
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <div>
              <h3 className="text-xl font-bold text-gold mb-2">What this calculator does</h3>
              <p>This calculator helps property buyers estimate the total out-of-pocket expenses required for legal property registration in Maharashtra, dynamically applying specific urban/rural rates and municipal cesses.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gold mb-2">Why users need it</h3>
              <p>Before purchasing property, understanding the true cost of acquisition—including government levies—is essential. Registration fees and stamp duty can severely impact your property investment budget.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gold mb-2">Maharashtra-Specific Context</h3>
              <p>In Maharashtra, the Stamp Duty rate generally stands at 5% to 7% of the agreement value (or Ready Reckoner Rate, whichever is higher). This variation depends on whether the property falls within Municipal Corporation limits (Urban) or outside (Rural), adding elements like Metro Cess (1%) and Local Body Surcharge (1%).</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h4 className="font-bold text-white mb-2">Women Concession</h4>
                <p className="text-sm">Maharashtra offers a 1% rebate in stamp duty if the property is solely or jointly owned by women (with no male co-owners).</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h4 className="font-bold text-white mb-2">Registration Fee</h4>
                <p className="text-sm">The registration fee is generally 1% of the property value, capped at a maximum of ₹30,000 for properties above ₹30 Lakh.</p>
              </div>
            </div>

            <div className="text-sm border-l-4 border-gold pl-4 mt-6 italic text-gray-400">
              <span className="font-bold text-white block mb-1">Disclaimer</span>
              The calculations provided are estimates based on standard generalized rules in Maharashtra. Exact stamp duty may be impacted by GST properties, floor rises, parking allotments, and the exact Ready Reckoner rate of the zone. Always consult with a legal professional before concluding transactions.
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
