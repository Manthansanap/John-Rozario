import React from "react";
import MortgageClient from "./MortgageClient";
import { Briefcase } from "lucide-react";

export const metadata = {
  title: "Mortgage Stamp Duty Calculator Maharashtra | Adv. Rozario John",
  description: "Calculate stamp duty and registration fees for mortgage deeds and deposit of title deeds in Maharashtra.",
  keywords: "mortgage stamp duty maharashtra, deposit of title deed pune, equitable mortgage registration, loan stamp duty",
};

export default function MortgagePage() {
  return (
    <div className="bg-rich-black min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/20">
            <Briefcase className="text-gold" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">Mortgage Stamp Duty <span className="text-gold italic">Calculator</span></h1>
          <p className="text-gray-400">Estimate the stamp duty required for your loan or title deed deposits.</p>
        </div>

        <MortgageClient />

        {/* Legal Writeup Section */}
        <div className="mt-20 glass p-8 md:p-12 rounded-3xl border-gold/10 space-y-8">
          <h2 className="text-3xl font-serif font-bold text-white border-b border-white/10 pb-4">About This Calculator</h2>
          
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <div>
              <h3 className="text-xl font-bold text-gold mb-2">What this calculator does</h3>
              <p>This calculator determines the government stamp duty strictly for property mortgages. It distinguishes between standard simple mortgages and equitable mortgages involving the deposit of title deeds.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gold mb-2">Mortgage Deed Registration</h3>
              <p>Registering a mortgage is critical. It creates a formal charge on your property\'s encumbrance certificate (EC), ensuring that the lender\'s financial interest is formally recorded in the Sub-Registrar\'s office.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gold mb-2">Equitable Mortgage (Deposit of Title Deed)</h3>
              <p>The most common form of bank loan security in Maharashtra. Here, the original property documents are deposited with the bank. The state offers a heavily discounted stamp duty rate (0.1% to 0.2%) usually capped at ₹10 Lakhs to facilitate banking liquidity without crushing the borrower.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h4 className="font-bold text-white mb-2">Loan-based Stamp Duty Rules</h4>
                <p className="text-sm">Stamp Duty applies primarily on the secured loan amount (Sanctioned Limit) rather than the property\'s ready reckoner value.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h4 className="font-bold text-white mb-2">Possession Consequence</h4>
                <p className="text-sm">If the mortgage requires you to hand over physical possession of the property to the lender (Usufructuary), the stamp duty is treated identically to a Sale Deed (5-7%).</p>
              </div>
            </div>

            <div className="text-sm border-l-4 border-gold pl-4 mt-6 italic text-gray-400">
              <span className="font-bold text-white block mb-1">Disclaimer</span>
              The calculator computes standard non-possession mortgage logic. Commercial project funding, consortium loans, or mortgages with multiple properties spreading across state lines fall under specialized composite stamp clauses.
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
