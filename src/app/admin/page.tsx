"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, FileText, Calendar, Scale, TrendingUp, ArrowUpRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalLaws: 0,
    totalAppointments: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/blogs").then(res => res.json()),
      fetch("/api/laws").then(res => res.json()),
      fetch("/api/inquiries").then(res => res.json())
    ]).then(([blogs, laws, inquiries]) => {
      setStats({
        totalBlogs: Array.isArray(blogs) ? blogs.length : 0,
        totalLaws: Array.isArray(laws) ? laws.length : 0,
        totalAppointments: Array.isArray(inquiries) ? inquiries.length : 0,
        totalUsers: 0,
      });
    });
  }, []);

  const cards = [
    { name: "Total Blogs", value: stats.totalBlogs, icon: <FileText size={24} />, color: "text-blue-400", href: "/admin/blogs" },
    { name: "Laws Repository", value: stats.totalLaws, icon: <Scale size={24} />, color: "text-gold", href: "/admin/laws" },
    { name: "Total Inquiries", value: stats.totalAppointments, icon: <MessageCircle size={24} />, color: "text-emerald-400", href: "/admin/inquiries" },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <h1 className="text-4xl font-serif font-black text-white uppercase tracking-tighter">
          System <span className="text-gold italic">Overview</span>
        </h1>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs pt-3">Administrative Control Panel v1.0</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <Link href={card.href} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl border-white/5 hover:border-gold/30 hover:bg-white/5 transition-all group relative overflow-hidden h-full cursor-pointer gold-glow hover:-translate-y-1"
            >
               <div className={`mb-6 p-4 rounded-2xl bg-white/5 inline-block ${card.color}`}>
                  {card.icon}
               </div>
               <div className="text-4xl font-serif font-black text-white mb-2 group-hover:text-gold transition-colors">{card.value}</div>
               <div className="text-xs font-black uppercase tracking-widest text-gray-500">{card.name}</div>
               <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={20} className="text-gold" />
               </div>
            </motion.div>
          </Link>
        ))}
      </div>


    </div>
  );
}
