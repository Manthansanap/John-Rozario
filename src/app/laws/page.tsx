"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Gavel, LandPlot, Users, ChevronDown, ChevronUp, Scale } from "lucide-react";

export default function LawsPage() {
  const [laws, setLaws] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<number | string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/laws")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setLaws(data);
        setLoading(false);
      });
  }, []);

  const categories = ["All", "Property", "Civil", "Corporate"];

  const filteredLaws = laws.filter((law) => {
    const matchesSearch = law.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         law.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || law.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-rich-black min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-serif font-bold text-white">Legal <span className="text-gold italic">Knowledge</span> Hub</h1>
          <p className="text-gray-400 max-w-2xl mx-auto italic font-bold">"Ignorantia juris non excusat — Ignorance of the law is no excuse."</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="relative w-full md:w-2/3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search laws, acts, or procedures..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 focus:border-gold/50 outline-none transition-all placeholder:text-gray-600 font-bold" 
            />
          </div>
          
          <div className="flex flex-wrap gap-2 p-1 glass rounded-2xl border-gold/10 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap ${selectedCategory === cat ? "bg-gold text-rich-black" : "text-gray-400 hover:text-white"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {loading ? (
              <div className="col-span-full py-20 text-center text-gray-500 animate-pulse font-bold uppercase tracking-widest">
                Fetching Global Knowledge Base...
              </div>
            ) : filteredLaws.length > 0 ? (
              filteredLaws.map((law) => (
                <motion.div
                  layout
                  key={law._id || law.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass rounded-3xl border-gold/10 overflow-hidden cursor-pointer hover:border-gold/30 transition-all group gold-glow"
                  onClick={() => setExpandedId(expandedId === (law._id || law.id) ? null : (law._id || law.id))}
                >
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className="bg-gold/10 p-4 rounded-2xl group-hover:bg-gold/20 transition-colors">
                        {law.icon || <Scale size={24} className="text-gold" />}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-gold text-rich-black rounded-full">
                        {law.category}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center group">
                      <h3 className="text-2xl font-serif font-bold text-white group-hover:text-gold transition-colors">{law.title}</h3>
                      {expandedId === (law._id || law.id) ? <ChevronUp className="text-gold" /> : <ChevronDown className="text-gray-500" />}
                    </div>
                    
                    <p className="text-gray-400 mt-4 leading-relaxed font-bold">
                      {law.description}
                    </p>

                    <AnimatePresence>
                      {expandedId === (law._id || law.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-8 mt-8 border-t border-white/5 space-y-4">
                            <h4 className="text-gold font-bold uppercase tracking-widest text-xs">Detailed Brief:</h4>
                            <p className="text-gray-300 leading-relaxed italic">
                              {law.details}
                            </p>
                            <button className="gold-glow mt-4 bg-gold px-6 py-3 rounded-full text-rich-black text-sm font-black flex items-center gap-2 hover:scale-105 transition-transform">
                              Discuss your case <ChevronDown size={14} className="-rotate-90" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center space-y-4 glass rounded-3xl border-gold/10">
                <Search size={48} className="mx-auto text-gold/20" />
                <h3 className="text-2xl font-serif text-gray-500">No laws found matching your search.</h3>
                <p className="text-gray-600">Try common terms like "Crime", "Property", or "Bail".</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
