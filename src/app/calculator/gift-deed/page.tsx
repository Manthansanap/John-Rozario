import React from "react";
import GiftDeedClient from "./GiftDeedClient";
import { Gift } from "lucide-react";

export const metadata = {
  title: "Gift Deed Stamp Duty Calculator Maharashtra | Adv. Rozario John",
  description: "Calculate stamp duty and registration charges for Gift Deeds in Maharashtra. Get exemptions for immediate family. Learn about LBT applies to family gifts.",
  keywords: "gift deed stamp duty maharashtra, family property transfer, lbt on gift deed pune, gift deed registration charges",
};

export default function GiftDeedPage() {
  return (
    <div className="bg-rich-black min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/20">
            <Gift className="text-gold" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">Gift Deed <span className="text-gold italic">Calculator</span></h1>
          <p className="text-gray-400">Calculate charges for transferring property to family members or others.</p>
        </div>

        <GiftDeedClient />

        {/* Legal Writeup Section */}
        <div className="mt-20 glass p-8 md:p-12 rounded-3xl border-gold/10 space-y-8">
          <h2 className="text-3xl font-serif font-bold text-white border-b border-white/10 pb-4">About This Calculator</h2>
          
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <div>
              <h3 className="text-xl font-bold text-gold mb-2">What this calculator does</h3>
              <p>This calculator identifies the heavy concessions afforded to blood relatives when executing a Gift Deed in Maharashtra, while still factoring in supplementary civic variables like Local Body Tax (LBT).</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gold mb-2">Gift Deed Transfer Rules</h3>
              <p>A Gift Deed allows property owners to transfer their assets without a monetary exchange. Legally under the Transfer of Property Act, to make the gift valid, it must be drafted, accepted by the donee during the lifetime of the donor, and formally registered.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gold mb-2">Family Relation Exemptions</h3>
              <p>Section 34 of the Maharashtra Stamp Act brings immense relief to families. For immediate lineal ascending/descending relatives (Husband, Wife, Son, Daughter, Grandson, Granddaughter, or wife of deceased son), the base stamp duty is fixed at a nominal ₹200. For siblings, it is mildly reduced to 3%.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h4 className="font-bold text-white mb-2">Local Body Tax Applicability</h4>
                <p className="text-sm">Even if the state exempts base stamp duty (Rs. 200), Municipal Corporations frequently impose a 1% LBT/Metro Cess calculated on the Ready Reckoner valuation of the property. This is inescapable in city limits.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h4 className="font-bold text-white mb-2">Registration Charges</h4>
                <p className="text-sm">The 1% registration fee (capped at ₹30,000) also still applies on the property\'s active valuation regardless of relation.</p>
              </div>
            </div>

            <div className="text-sm border-l-4 border-gold pl-4 mt-6 italic text-gray-400">
              <span className="font-bold text-white block mb-1">Disclaimer</span>
              Gift Deeds dealing with agricultural land vs municipal residential flats face completely different clearance rules. Non-blood relation gifts attract full market-rate stamp duty identically to standard sale deeds. Always seek professional legal counsel.
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
