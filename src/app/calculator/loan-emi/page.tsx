import React from "react";
import LoanEmiClient from "./LoanEmiClient";
import { Percent } from "lucide-react";

export const metadata = {
  title: "Loan EMI Calculator | Adv. Rozario John",
  description: "Calculate housing loan EMI, total interest, and property repayment structure. Perfect for evaluating mortgage viability in Maharashtra.",
  keywords: "loan emi calculator, housing loan emi, property mortgage interest pune, emi reduction balance",
};

export default function LoanEmiPage() {
  return (
    <div className="bg-rich-black min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/20">
            <Percent className="text-gold" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">Loan EMI <span className="text-gold italic">Calculator</span></h1>
          <p className="text-gray-400">Plan your housing loan and calculate your monthly interest estimations.</p>
        </div>

        <LoanEmiClient />

        {/* Legal Writeup Section */}
        <div className="mt-20 glass p-8 md:p-12 rounded-3xl border-gold/10 space-y-8">
          <h2 className="text-3xl font-serif font-bold text-white border-b border-white/10 pb-4">About This Calculator</h2>
          
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <div>
              <h3 className="text-xl font-bold text-gold mb-2">What this calculator does</h3>
              <p>This mathematical tool processes your principal loan quantity against varying banking interest rates and tenure blocks to compute the exact Equated Monthly Installment (EMI) you owe your lender.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gold mb-2">Why users need it for Housing Loans</h3>
              <p>When purchasing property, bank financing is notoriously difficult to model manually. By plotting the exact monthly outflow, buyers can budget effectively, ensuring their EMI-to-Income ratio stays below the required 50% safety margin threshold expected by Indian banks.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gold mb-2">Interest vs Principal Allocation</h3>
              <p>EMI payments are structured on a "reducing balance method." In the early years of a 20-year home loan, almost 70-80% of your EMI goes purely towards paying off the bank\'s interest, with very little principal reduction. Understanding this curve is critical for prepayments.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h4 className="font-bold text-white mb-2">Legal Implications of EMI Default</h4>
                <p className="text-sm">Defaulting on 3 consecutive EMIs allows banks to invoke the SARFAESI Act, potentially liquidating the property without entering a prolonged civil court battle.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h4 className="font-bold text-white mb-2">Maharashtra-specific Context</h4>
                <p className="text-sm">To enforce recovery actions smoothly, banks in Maharashtra strictly mandate the registration of your "Equitable Mortgage" at the sub-registrar, incurring a 0.1% cost.</p>
              </div>
            </div>

            <div className="text-sm border-l-4 border-gold pl-4 mt-6 italic text-gray-400">
              <span className="font-bold text-white block mb-1">Disclaimer</span>
              The calculator provides fixed-rate estimations. If your loan is tied to consecutive rep-rate hikes (floating rate), your EMI or your loan tenure will dynamically expand. Overdue EMIs will also trigger severe penal interest logic.
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
