"use client";
import React, { useState, useEffect } from "react";
import { Calendar, Clock, Phone, Mail, CheckCircle2, XCircle, Trash2, Search, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Appointment {
  _id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    fetch("/api/appointments")
       .then(res => res.json())
       .then(data => {
          if (Array.isArray(data)) setAppointments(data);
          setLoading(false);
       });
  }, []);

  const filtered = appointments.filter(a => filterStatus === "All" || a.status === filterStatus.toLowerCase());

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <h1 className="text-4xl font-serif font-black text-white uppercase tracking-tighter">Client <span className="text-gold italic">Bookings</span></h1>
        
        <div className="flex gap-2 p-1 glass rounded-2xl border-white/5">
           {["All", "Pending", "Confirmed", "Cancelled"].map(s => (
             <button 
               key={s}
               onClick={() => setFilterStatus(s)}
               className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filterStatus === s ? "bg-gold text-rich-black" : "text-gray-500 hover:text-white"}`}
             >
                {s}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
         {loading ? (
            <div className="py-20 text-center text-gray-600 animate-pulse font-black uppercase tracking-widest">Accessing Secure Records...</div>
         ) : filtered.length > 0 ? (
            filtered.map((appt) => (
              <motion.div 
                key={appt._id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass p-8 rounded-4xl border-white/5 hover:border-gold/20 transition-all group relative overflow-hidden"
              >
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="flex items-center gap-6">
                       <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center font-serif font-black text-2xl text-gold ">
                          {appt.name[0]}
                       </div>
                       <div className="space-y-1">
                          <h3 className="text-2xl font-serif font-bold text-white group-hover:text-gold transition-colors">{appt.name}</h3>
                          <div className="flex flex-wrap gap-4 text-[10px] text-gray-500 font-black uppercase tracking-widest">
                             <span className="flex items-center gap-1.5 italic"><Phone size={14} className="text-gold" /> {appt.phone}</span>
                             <span className="flex items-center gap-1.5 italic"><Mail size={14} className="text-gold" /> {appt.email || "No Email Provided"}</span>
                          </div>
                       </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                       <div className="flex flex-col items-center p-4 glass-gold rounded-2xl min-w-[120px]">
                          <span className="text-[10px] font-black tracking-widest uppercase opacity-40 mb-1">Schedule</span>
                          <span className="text-sm font-black text-white">{appt.date}</span>
                          <span className="text-[11px] font-black text-gold uppercase tracking-tighter">{appt.time}</span>
                       </div>
                       
                       <div className="flex flex-col gap-2">
                          <button className="bg-emerald-500/10 hover:bg-emerald-500 transition-all text-emerald-500 hover:text-white p-3 rounded-xl border border-emerald-500/20"><CheckCircle2 size={18} /></button>
                          <button className="bg-red-500/10 hover:bg-red-500 transition-all text-red-500 hover:text-white p-3 rounded-xl border border-red-500/20"><XCircle size={18} /></button>
                       </div>
                    </div>
                 </div>

                 {appt.message && (
                   <div className="mt-8 pt-6 border-t border-white/5">
                      <p className="text-xs font-black uppercase tracking-widest text-gold mb-3">Case Briefing:</p>
                      <p className="text-sm text-gray-400 italic leading-relaxed bg-white/2 p-4 rounded-2xl border border-white/5">
                        "{appt.message}"
                      </p>
                   </div>
                 )}

                 <div className="absolute top-6 right-6 opacity-40 text-[10px] font-black uppercase tracking-[0.25em] text-gray-600">ID: {appt._id.slice(-6)}</div>
              </motion.div>
            ))
         ) : (
            <div className="py-20 text-center glass rounded-4xl border-white/5 space-y-4">
               <Calendar size={48} className="mx-auto text-gold opacity-10" />
               <p className="font-bold text-xs uppercase tracking-widest text-gray-600">No scheduled appointments in this category.</p>
            </div>
         )}
      </div>
    </div>
  );
}
