"use client";
import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit3, Save, X, FileSearch, Gavel } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Blog {
  _id: string;
  title: string;
  content: string;
  category: string;
  slug: string;
  published: boolean;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newBlog, setNewBlog] = useState({ title: "", content: "", category: "Legal News", slug: "", image: "" });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    const res = await fetch("/api/blogs");
    const data = await res.json();
    if (Array.isArray(data)) setBlogs(data);
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const blogData = { ...newBlog, slug: newBlog.title.toLowerCase().replace(/ /g, "-"), author: "Adv. Rozario John" };
    const method = editingId ? "PUT" : "POST";
    const bodyData = editingId ? { ...blogData, _id: editingId } : blogData;

    const res = await fetch("/api/blogs", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });
    if (res.ok) {
      setIsAdding(false);
      setEditingId(null);
      setNewBlog({ title: "", content: "", category: "Legal News", slug: "", image: "" });
      fetchBlogs();
    }
  };

  const handleEdit = (blog: Blog) => {
    setNewBlog({
      title: blog.title,
      content: blog.content,
      category: blog.category,
      slug: blog.slug,
      image: blog.image || ""
    });
    setEditingId(blog._id);
    setIsAdding(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBlog({...newBlog, image: reader.result as string});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this blog post?")) {
      await fetch("/api/blogs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchBlogs();
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-serif font-black text-white uppercase tracking-tighter">Blog <span className="text-gold italic">Management</span></h1>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-gold text-rich-black px-6 py-3 rounded-full font-black flex items-center gap-2 hover:scale-105 transition-all"
        >
          <Plus size={20} /> Create Post
        </button>
      </div>

      <div className="glass rounded-4xl border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">
              <th className="p-6">Title</th>
              <th className="p-6">Category</th>
              <th className="p-6">Status</th>
              <th className="p-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {blogs.map((blog) => (
              <tr key={blog._id || (blog as any).id} className="hover:bg-white/2 transition-colors">
                <td className="p-6">
                   <div className="font-bold text-white text-sm">{blog.title}</div>
                   <div className="text-[10px] text-gray-600 font-bold uppercase mt-1 tracking-widest">{blog.slug}</div>
                </td>
                <td className="p-6">
                   <span className="px-3 py-1 bg-gold/10 text-gold rounded-full text-[10px] font-black uppercase tracking-widest border border-gold/20">
                      {blog.category}
                   </span>
                </td>
                <td className="p-6">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-xs text-gray-500 font-bold">Published</span>
                   </div>
                </td>
                <td className="p-6">
                   <div className="flex gap-4">
                      <button onClick={() => handleEdit(blog)} className="text-gray-400 hover:text-gold transition-colors"><Edit3 size={18} /></button>
                      <button onClick={() => handleDelete(blog._id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <div className="p-20 text-center text-gray-600 font-bold uppercase tracking-widest animate-pulse">Synchronizing Data...</div>}
        {blogs.length === 0 && !loading && (
          <div className="p-20 text-center text-gray-600">
             <FileSearch size={48} className="mx-auto mb-4 opacity-20" />
             <p className="font-bold uppercase tracking-[0.2em] text-xs">No blog posts found in repository.</p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-rich-black/90 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="glass max-w-3xl w-full p-8 rounded-4xl border-gold/20 gold-glow overflow-y-auto max-h-[95vh]">
               <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                  <h2 className="text-2xl font-serif font-black flex items-center gap-2 tracking-tighter uppercase"><Gavel size={24} className="text-gold" /> Compose Legal <span className="text-gold italic">Article</span></h2>
                  <button onClick={() => { setIsAdding(false); setEditingId(null); setNewBlog({ title: "", content: "", category: "Legal News", slug: "", image: "" }); }} className="text-gray-500 hover:text-white"><X size={24} /></button>
               </div>

               <form onSubmit={handleAdd} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gold text-center">Article Title</label>
                       <input 
                        required
                        value={newBlog.title}
                        onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
                        placeholder="Importance of Property Deeds..." 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:border-gold/50 outline-none text-white font-bold" 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gold">Category</label>
                       <select 
                        value={newBlog.category}
                        onChange={(e) => setNewBlog({...newBlog, category: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:border-gold/50 outline-none text-gray-400 font-bold appearance-none cursor-pointer"
                       >
                          <option>Legal News</option>
                          <option>Case Studies</option>
                          <option>Property Law</option>
                          <option>Criminal Defense</option>
                       </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gold text-center">Cover Image (Upload local file)</label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:border-gold/50 outline-none text-white font-bold file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-gold file:text-rich-black hover:file:bg-gold/80" 
                      />
                      {newBlog.image && (
                         <div className="w-12 h-12 rounded-xl border border-gold/20 overflow-hidden shrink-0">
                           <img src={newBlog.image} alt="Preview" className="w-full h-full object-cover" />
                         </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gold">Content Body</label>
                    <textarea 
                      rows={5}
                      required
                      value={newBlog.content}
                      onChange={(e) => setNewBlog({...newBlog, content: e.target.value})}
                      placeholder="Start writing the legal insight..." 
                      className="w-full bg-white/5 border border-white/10 rounded-3xl px-4 py-4 focus:border-gold/50 outline-none text-white font-bold resize-none leading-relaxed" 
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); setNewBlog({ title: "", content: "", category: "Legal News", slug: "", image: "" }); }} className="flex-1 py-5 text-gray-500 font-black uppercase tracking-widest text-xs hover:text-white transition-colors">Abort</button>
                    <button type="submit" className="flex-[2] bg-gold-gradient py-5 rounded-2xl text-rich-black font-black text-lg flex items-center justify-center gap-3 gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all">
                      {editingId ? "Update Article" : "Submit to Public Portal"} <Save size={20} />
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
