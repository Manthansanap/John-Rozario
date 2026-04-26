import React from "react";
import Link from "next/link";
import { Landmark, Home, Gift, Briefcase, Percent, Maximize, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Legal Calculators | Adv. Rozario John",
  description: "Free online legal calculators for Maharashtra property transactions including Stamp Duty, Leave & License, Gift Deed, EMI, and Area conversion.",
  keywords: "legal calculators maharashtra, property calculator pune, stamp duty calculator, emi calculator, leave and license fee",
};

const calculators = [
  {
    id: "stamp-duty",
    title: "Stamp Duty Calculator",
    description: "Calculate stamp duty and registration fees for property purchases in Maharashtra.",
    icon: Landmark,
    link: "/calculator/stamp-duty"
  },
  {
    id: "leave-license",
    title: "Leave & License Calculator",
    description: "Estimate mandatory registration and stamp duty for your rental agreements.",
    icon: Home,
    link: "/calculator/leave-license"
  },
  {
    id: "gift-deed",
    title: "Gift Deed Calculator",
    description: "Calculate charges for transferring property to family members or others.",
    icon: Gift,
    link: "/calculator/gift-deed"
  },
  {
    id: "mortgage",
    title: "Mortgage Stamp Duty",
    description: "Estimate the stamp duty required for your loan or title deed deposits.",
    icon: Briefcase,
    link: "/calculator/mortgage"
  },
  {
    id: "loan-emi",
    title: "Loan EMI Calculator",
    description: "Plan your housing loan and calculate your monthly interest estimations.",
    icon: Percent,
    link: "/calculator/loan-emi"
  },
  {
    id: "area-converter",
    title: "Area Converter",
    description: "Convert Maharashtra land measurements (Acre, Guntha, Are, Hectare).",
    icon: Maximize,
    link: "/calculator/area-converter"
  }
];

export default function CalculatorListingPage() {
  return (
    <div className="bg-rich-black min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 space-y-4">
          <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/20">
            <Landmark className="text-gold" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
            Legal & Property <span className="text-gold italic">Calculators</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Professional estimation tools designed for Maharashtra\'s legal compliance. Select a calculator below to get started. 
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculators.map((calc, idx) => {
            const Icon = calc.icon;
            return (
              <Link key={idx} href={calc.link} className="block group">
                <div className="glass h-full p-8 rounded-3xl border-gold/10 hover:border-gold/50 transition-all duration-300 space-y-6 flex flex-col justify-between">
                  <div>
                    <div className="bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                      <Icon className="text-gold" size={28} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-3 group-hover:text-gold transition-colors">
                      {calc.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {calc.description}
                    </p>
                  </div>
                  
                  <div className="pt-6 border-t border-white/5 flex items-center text-gold font-bold text-sm">
                    Open Calculator <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </div>
  );
}
