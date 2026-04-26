import React from "react";
import AreaConverterClient from "./AreaConverterClient";
import { Maximize } from "lucide-react";

export const metadata = {
  title: "Maharashtra Area Converter | Adv. Rozario John",
  description: "Convert land measurement units used in Maharashtra property documents. Acre, Guntha, Are, Hectare to Sq.ft calculator.",
  keywords: "area converter, guntha to sq ft, hectare to acre, maharashtra land measurement, are to sq ft",
};

export default function AreaConverterPage() {
  return (
    <div className="bg-rich-black min-h-screen py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/20">
            <Maximize className="text-gold" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">Area Converter <span className="text-gold italic">Calculator</span></h1>
          <p className="text-gray-400">Convert standard Maharashtra land measurements across legal formats.</p>
        </div>

        <AreaConverterClient />

        {/* Legal Writeup Section */}
        <div className="mt-20 glass p-8 md:p-12 rounded-3xl border-gold/10 space-y-8">
          <h2 className="text-3xl font-serif font-bold text-white border-b border-white/10 pb-4">About This Measurement System</h2>
          
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <div>
              <h3 className="text-xl font-bold text-gold mb-2">What this calculator does</h3>
              <p>This structural tool translates common residential unit metrics (like Square Feet) into localized agricultural dimensions (like Guntha, Are, and Hectares) and vice versa, without any mathematical error propagation.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gold mb-2">Why users need it</h3>
              <p>Reading localized property documents like the "Satbara" (7/12 Extract) or "Ferfar" isn\'t straightforward for modern residential buyers, as these documents historically denote land size in Hectares, Ares, and Gunthas. Buyers need to translate these to square footage to gauge actual habitable size.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gold mb-2">Maharashtra Land Measurement Standards</h3>
              <p>In Maharashtra, the standardized unit metrics flow as: 1 Guntha equals approx 1,089 Sq.Ft (or 33x33 feet). 40 Gunthas make an Acre. As per metric state conversions, property extracts commonly use 1 Are (approx 1076.39 Sq.ft) which is almost identical to 1 Guntha (hence the frequent confusion). 100 Ares make a Hectare.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h4 className="font-bold text-white mb-2">The "Are" vs "Guntha" Dilemma</h4>
                <p className="text-sm">While older documents reference Gunthas, modern digitized 7/12 land records strictly utilize "Hectare - Are - Sq.Mtr" formatting to conform with uniform metric standards.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h4 className="font-bold text-white mb-2">Legal Implications in Deeds</h4>
                <p className="text-sm">Miscalculation of area conversions during the drafting of a Sale Deed can lead to boundary disputes and incorrect stamp duty payment, rendering documents liable for civic fines.</p>
              </div>
            </div>

            <div className="text-sm border-l-4 border-gold pl-4 mt-6 italic text-gray-400">
              <span className="font-bold text-white block mb-1">Disclaimer</span>
              Local village dialects sometimes vary fractional measurements of a Guntha based on topography limits. For critical title deed drafting and boundary demarcation, a sanctioned City Survey (CTS) measurement by authorized architects is mandatory.
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
