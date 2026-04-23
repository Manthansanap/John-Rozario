"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Calendar, User, ArrowRight, BookOpen } from "lucide-react";

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

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setBlogs(data);
        setLoading(false);
      });
  }, []);

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-rich-black min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-6xl font-serif font-bold"
          >
            Legal <span className="text-gold italic">Perspectives</span>
          </motion.h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Expert analysis on Indian laws, property disputes, and criminal defense strategies.</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16 relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" size={24} />
          <input 
            type="text" 
            placeholder="Search articles, keywords, or topics..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-gold/10 rounded-full px-16 py-6 text-lg focus:border-gold/50 outline-none transition-all placeholder:text-gray-700 font-bold glass shadow-2xl" 
          />
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
             [1, 2, 3].map(i => (
                <div key={i} className="glass h-96 rounded-3xl animate-pulse" />
             ))
          ) : (
            filteredBlogs.map((blog, i) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-3xl overflow-hidden group hover:border-gold/30 transition-all border-white/5 flex flex-col h-full bg-white/2"
              >
                <div className="aspect-video bg-gold/5 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-10 transition-opacity z-10" />
                  {blog.image ? (
                     <img src={blog.image} alt={blog.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                     <BookOpen size={48} className="text-gold opacity-20 relative z-0" />
                  )}
                  <span className="absolute top-6 left-6 bg-gold text-rich-black text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg z-20">
                    {blog.category}
                  </span>
                </div>

                <div className="p-8 flex flex-col flex-grow space-y-4">
                  <div className="flex items-center gap-4 text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                    <span className="flex items-center gap-2 italic"><Calendar size={12} className="text-gold" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                    <span className="flex items-center gap-2"><User size={12} className="text-gold" /> Admin</span>
                  </div>
                  
                  <h3 className="text-2xl font-serif font-black text-white group-hover:text-gold transition-colors leading-tight">{blog.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed transition-colors group-hover:text-gray-300">
                    {blog.content.substring(0, 150)}...
                  </p>
                  
                  <div className="pt-6 mt-auto">
                    <Link 
                      href={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-2 text-gold font-black text-xs uppercase tracking-[0.25em] group-hover:translate-x-2 transition-transform"
                    >
                      Read Full Analysis <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
