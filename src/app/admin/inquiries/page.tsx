"use client";
import React, { useState, useEffect } from "react";
import { MessageCircle, Phone, Mail, CheckCircle2, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Inquiry {
  _id: string;
  name: string;
  phone: string;
  email: string;
  type: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    const res = await fetch("/api/inquiries");
    const data = await res.json();
    if (Array.isArray(data)) setInquiries(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this inquiry permanently?")) {
      await fetch("/api/inquiries", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchInquiries();
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <h1 className="text-4xl font-serif font-black text-white uppercase tracking-tighter">Client <span className="text-gold italic">Inquiries</span></h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
         {loading ? (
            <div className="py-20 text-center text-gray-600 animate-pulse font-black uppercase tracking-widest">Loading Inquiries...</div>
         ) : inquiries.length > 0 ? (
            inquiries.map((inq) => (
              <motion.div 
                key={inq._id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass p-8 rounded-4xl border-white/5 hover:border-gold/20 transition-all group relative overflow-hidden"
              >
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="flex items-center gap-6">
                       <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center font-serif font-black text-2xl text-gold ">
                          {inq.name ? inq.name[0] : "C"}
                       </div>
                       <div className="space-y-1">
                          <h3 className="text-2xl font-serif font-bold text-white group-hover:text-gold transition-colors">{inq.name}</h3>
                          <div className="flex flex-wrap gap-4 text-[10px] text-gray-500 font-black uppercase tracking-widest mt-2">
                             <span className="flex items-center gap-1.5 italic"><Phone size={14} className="text-gold" /> {inq.phone}</span>
                             <span className="flex items-center gap-1.5 italic"><Mail size={14} className="text-gold" /> {inq.email || "No Email Provided"}</span>
                             <span className="flex items-center gap-1.5 italic text-gold border border-gold/30 px-2 py-0.5 rounded-md">{inq.type}</span>
                          </div>
                       </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 z-10">
                       <button onClick={() => handleDelete(inq._id)} className="bg-red-500/10 hover:bg-red-500 transition-all text-red-500 hover:text-white p-3 rounded-xl border border-red-500/20"><Trash2 size={18} /></button>
                    </div>
                 </div>

                 {inq.message && (
                   <div className="mt-8 pt-6 border-t border-white/5">
                      <p className="text-xs font-black uppercase tracking-widest text-gold mb-3">Message Content:</p>
                      <p className="text-sm text-gray-400 italic leading-relaxed bg-white/2 p-4 rounded-2xl border border-white/5">
                        "{inq.message}"
                      </p>
                   </div>
                 )}

                 <div className="absolute top-6 right-6 opacity-40 text-[10px] font-black uppercase tracking-[0.25em] text-gray-600">ID: {inq._id.slice(-6)}</div>
              </motion.div>
            ))
         ) : (
            <div className="py-20 text-center glass rounded-4xl border-white/5 space-y-4">
               <MessageCircle size={48} className="mx-auto text-gold opacity-10" />
               <p className="font-bold text-xs uppercase tracking-widest text-gray-600">No inquiries found.</p>
            </div>
         )}
      </div>
    </div>
  );
}
