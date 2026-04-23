"use client";
import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit3, Save, X, Scale, Gavel } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Law {
  _id: string;
  category: string;
  title: string;
  description: string;
  details: string;
}

export default function AdminLawsPage() {
  const [laws, setLaws] = useState<Law[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newLaw, setNewLaw] = useState({ category: "Criminal", title: "", description: "", details: "" });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchLaws();
  }, []);

  const fetchLaws = async () => {
    setLoading(true);
    const res = await fetch("/api/laws");
    const data = await res.json();
    if (Array.isArray(data)) setLaws(data);
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const bodyData = editingId ? { ...newLaw, _id: editingId } : newLaw;

    const res = await fetch("/api/laws", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });
    if (res.ok) {
      setIsAdding(false);
      setEditingId(null);
      setNewLaw({ category: "Criminal", title: "", description: "", details: "" });
      fetchLaws();
    }
  };

  const handleEdit = (law: Law) => {
    setNewLaw({
      title: law.title,
      description: law.description,
      details: law.details,
      category: law.category
    });
    setEditingId(law._id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Permanently delete this legal entry?")) {
      await fetch("/api/laws", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchLaws();
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-serif font-black text-white uppercase tracking-tighter">Laws <span className="text-gold italic">Repository</span></h1>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-gold text-rich-black px-6 py-3 rounded-full font-black flex items-center gap-2 hover:scale-105 transition-all shadow-lg"
        >
          <Plus size={20} /> Add Legal Entry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {laws.map((law) => (
           <motion.div key={law._id || (law as any).id} className="glass p-6 rounded-3xl border-white/5 relative group hover:border-gold/20 transition-all">
              <div className="flex justify-between items-start mb-4">
                 <span className="text-[10px] font-black uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20 leading-none">
                    {law.category}
                 </span>
                 <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(law)} className="text-gray-500 hover:text-gold"><Edit3 size={16} /></button>
                    <button onClick={() => handleDelete(law._id)} className="text-gray-500 hover:text-red-500"><Trash2 size={16} /></button>
                 </div>
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-2 leading-snug group-hover:text-gold transition-colors">{law.title}</h3>
              <p className="text-gray-500 text-xs line-clamp-3 leading-relaxed mb-4">{law.description}</p>
              <div className="text-[10px] text-gray-700 font-bold uppercase tracking-widest border-t border-white/5 pt-4">
                 Extended Guidance Provided
              </div>
           </motion.div>
         ))}
         {loading && <div className="col-span-full py-20 text-center text-gray-600 animate-pulse font-black uppercase tracking-widest">Compiling Database...</div>}
      </div>

      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-rich-black/90 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="glass max-w-2xl w-full p-8 rounded-4xl border-gold/20 gold-glow max-h-[95vh] overflow-y-auto">
               <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                  <h2 className="text-2xl font-serif font-black flex items-center gap-2 uppercase tracking-tighter"><Scale size={24} className="text-gold" /> Catalog <span className="text-gold italic">Legal Rule</span></h2>
                  <button onClick={() => { setIsAdding(false); setEditingId(null); setNewLaw({ title: "", description: "", details: "", category: "Criminal" }); }} className="text-gray-500 hover:text-white"><X size={24} /></button>
               </div>

               <form onSubmit={handleAdd} className="space-y-4">
                  <div className="space-y-1">
                     <label className="text-xs font-black uppercase tracking-widest text-gold">Category</label>
                     <select 
                      value={newLaw.category}
                      onChange={(e) => setNewLaw({...newLaw, category: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:border-gold/50 outline-none text-gray-400 font-bold appearance-none cursor-pointer"
                     >
                        <option>Criminal</option>
                        <option>Civil</option>
                        <option>Property</option>
                        <option>Family</option>
                        <option>Documentation</option>
                     </select>
                  </div>
                  <div className="space-y-1">
                     <label className="text-xs font-black uppercase tracking-widest text-gold text-center">Rule Heading</label>
                     <input 
                      required
                      value={newLaw.title}
                      onChange={(e) => setNewLaw({...newLaw, title: e.target.value})}
                      placeholder="e.g. 482 CrPC Quashing Powers" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:border-gold/50 outline-none text-white font-bold" 
                     />
                  </div>
                  <div className="space-y-1">
                     <label className="text-xs font-black uppercase tracking-widest text-gold text-center">Short Summary</label>
                     <textarea 
                      required
                      rows={2}
                      value={newLaw.description}
                      onChange={(e) => setNewLaw({...newLaw, description: e.target.value})}
                      placeholder="A brief overview for listing cards..." 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:border-gold/50 outline-none text-white font-bold resize-none" 
                     />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-widest text-gold">Extended Details</label>
                    <textarea 
                      rows={3}
                      required
                      value={newLaw.details}
                      onChange={(e) => setNewLaw({...newLaw, details: e.target.value})}
                      placeholder="Detailed legal explanation, case citations, etc..." 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:border-gold/50 outline-none text-white font-bold resize-none leading-relaxed" 
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); setNewLaw({ category: "Criminal", title: "", description: "", details: "" }); }} className="flex-1 py-5 text-gray-500 font-black uppercase tracking-widest text-xs hover:text-white transition-colors">Abort</button>
                    <button type="submit" className="flex-[2] bg-gold-gradient py-5 rounded-2xl text-rich-black font-black text-lg flex items-center justify-center gap-3 gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all">
                      {editingId ? "Update Law" : "Publish to Hub"} <Save size={20} />
                    </button>
                  </div>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
