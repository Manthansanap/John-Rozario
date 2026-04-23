"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, BookOpen, Share2, Globe, MessageCircle } from "lucide-react";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  content: string;
  category: string;
  slug: string;
  author: string;
  createdAt: string;
  image?: string;
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/blogs")
      .then(res => res.json())
      .then(data => {
        const found = data.find((b: Blog) => b.slug === slug);
        setBlog(found || null);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-rich-black flex items-center justify-center text-gold font-black animate-pulse">Consulting Database...</div>;
  if (!blog) return <div className="min-h-screen bg-rich-black flex items-center justify-center text-red-500 font-bold uppercase tracking-widest px-6 text-center">Case File Not Found. Check URL or Slug.</div>;

  return (
    <div className="bg-rich-black min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-gold font-black text-xs uppercase tracking-[0.2em] mb-12 hover:-translate-x-2 transition-transform"
        >
          <ArrowLeft size={16} /> All Analyses
        </Link>
        
        <article className="space-y-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <span className="bg-gold text-rich-black text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
              {blog.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-black text-white leading-tight mt-6">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-8 text-gray-500 text-[10px] font-black uppercase tracking-[0.25em] pt-4 border-b border-white/5 pb-8">
               <span className="flex items-center gap-2 italic"><Calendar size={14} className="text-gold" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
               <span className="flex items-center gap-2"><User size={14} className="text-gold" /> Adv. Rozario John</span>
               <span className="flex items-center gap-2"><BookOpen size={14} className="text-gold" /> 5 Min Read</span>
            </div>

            {blog.image && (
              <div className="w-full h-96 lg:h-[500px] mt-8 rounded-4xl overflow-hidden glass border-gold/10 relative">
                 <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
              </div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed font-medium space-y-8"
          >
             {blog.content.split("\n\n").map((para, i) => (
                <p key={i} className="whitespace-pre-wrap">{para}</p>
             ))}
          </motion.div>

          <footer className="pt-16 mt-20 border-t border-white/5 space-y-8 text-center pb-20">
             <h3 className="text-2xl font-serif font-black text-white italic">Spread the <span className="text-gold">Legal Insight!</span></h3>
             <div className="flex justify-center gap-6">
                <button className="p-4 glass rounded-full hover:bg-gold/10 transition-colors"><Globe size={20} className="text-gold" /></button>
                <button className="p-4 glass rounded-full hover:bg-gold/10 transition-colors"><MessageCircle size={20} className="text-gold" /></button>
                <button className="p-4 glass rounded-full hover:bg-gold/10 transition-colors"><Share2 size={20} className="text-gold" /></button>
             </div>
             
             <div className="bg-gold-gradient/[0.03] glass p-10 rounded-4xl border-gold/10 space-y-6 mt-16 max-w-2xl mx-auto gold-glow">
                <h4 className="text-xl font-serif font-black text-white uppercase italic tracking-tighter">Need Specific <span className="text-gold">Legal Advice?</span></h4>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-relaxed">Adv. Rozario John specializes in complex matters including property litigation and criminal defense. Consult with the expert today.</p>
                <button 
                  onClick={() => router.push("/contact")}
                  className="bg-gold-gradient px-10 py-4 rounded-xl text-rich-black font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
                >
                  Contact for Consultation
                </button>
             </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
