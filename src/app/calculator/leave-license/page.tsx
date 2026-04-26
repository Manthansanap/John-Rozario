import React from "react";
import LeaveLicenseClient from "./LeaveLicenseClient";
import { Home } from "lucide-react";

export const metadata = {
  title: "Leave & License Calculator Maharashtra | Adv. Rozario John",
  description: "Calculate rent agreement stamp duty and mandatory registration fees in Maharashtra. Get estimates for Leave & License registration.",
  keywords: "leave and license calculator maharashtra, rent agreement stamp duty pune, rental registration fee, tenancy agreement lawyer",
};

export default function LeaveLicensePage() {
  return (
    <div className="bg-rich-black min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/20">
            <Home className="text-gold" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">Leave & License <span className="text-gold italic">Calculator</span></h1>
          <p className="text-gray-400">Estimate mandatory registration and stamp duty for your rental agreements.</p>
        </div>

        <LeaveLicenseClient />

        {/* Legal Writeup Section */}
        <div className="mt-20 glass p-8 md:p-12 rounded-3xl border-gold/10 space-y-8">
          <h2 className="text-3xl font-serif font-bold text-white border-b border-white/10 pb-4">About This Calculator</h2>
          
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <div>
              <h3 className="text-xl font-bold text-gold mb-2">What this calculator does</h3>
              <p>This calculator figures out the 0.25% stamp duty and registration fees applied to Leave & License (rental) agreements in Maharashtra based on the rent, deposit, and term of the contract.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gold mb-2">Why users need it</h3>
              <p>Knowing the precise costs associated with renting out a property or taking a property on lease prevents unexpected financial burdens directly at the registrar\'s office. It ensures compliance with civil laws and safeguards the rights of both landlords and licensors.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gold mb-2">Maharashtra Mandatory Registration Rules</h3>
              <p>Under Section 55 of the Maharashtra Rent Control Act, 1999, it is mandatory to register all tenancy or Leave & License agreements, irrespective of the tenancy period (even if it is for 11 months). Failure to register an agreement places a penalty on the landlord and makes the document legally inadmissible in court.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h4 className="font-bold text-white mb-2">Stamp Duty Calculation</h4>
                <p className="text-sm">Calculated uniformly at 0.25% across Maharashtra based on Total Rent + (Deposit × 10% Interest Rate × Tenure).</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h4 className="font-bold text-white mb-2">Urban vs Rural Registration</h4>
                <p className="text-sm">Flat rate of ₹1,000 for properties located in Municipal Corporation (Urban) areas, and ₹500 for those in Rural/Gram Panchayat areas.</p>
              </div>
            </div>

            <div className="text-sm border-l-4 border-gold pl-4 mt-6 italic text-gray-400">
              <span className="font-bold text-white block mb-1">Disclaimer</span>
              The calculations provided are accurate estimates based on the Maharashtra Rent Control Act guidelines for standard contracts. Specific clauses, like non-refundable deposits or massive advance rents, could alter the exact taxable sum.
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
