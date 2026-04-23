"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit3, Grid, List as ListIcon, X, Search, Save, Gavel } from "lucide-react";

interface Note {
  _id: string;
  title: string;
  content: string;
  color: string;
}

export default function NotesPage() {
  const { data: session, status } = useSession();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  
  const [newNote, setNewNote] = useState({ title: "", content: "", color: "#d4af37" });

  const colors = ["#d4af37", "#f1d279", "#ffffff", "#a68925", "#333333"];

  useEffect(() => {
    if (status === "authenticated") {
      fetchNotes();
    }
  }, [status]);

  const fetchNotes = async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    if (Array.isArray(data)) setNotes(data);
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    });
    if (res.ok) {
      setNewNote({ title: "", content: "", color: "#d4af37" });
      setIsAdding(false);
      fetchNotes();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this legal note?")) {
      const res = await fetch("/api/notes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchNotes();
    }
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (status === "loading") return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gold" /></div>;
  if (status === "unauthenticated") return <div className="min-h-screen flex items-center justify-center text-gold">Please login to access your legal notes.</div>;

  return (
    <div className="bg-rich-black min-h-screen p-8 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
             <Gavel className="text-gold" size={32} />
             <h1 className="text-4xl font-serif font-bold">Secure <span className="text-gold italic">Legal Notes</span></h1>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Search notes..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:border-gold/50 outline-none transition-all placeholder:text-gray-600"
              />
            </div>
            <button onClick={() => setView(view === "grid" ? "list" : "grid")} className="p-2 glass rounded-lg text-gray-400 hover:text-gold">
               {view === "grid" ? <ListIcon size={20} /> : <Grid size={20} />}
            </button>
            <button 
              onClick={() => setIsAdding(true)}
              className="bg-gold text-rich-black px-6 py-2 rounded-full font-black flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <Plus size={18} /> New Note
            </button>
          </div>
        </div>

        {/* Notes Container */}
        <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" : "space-y-4"}>
          <AnimatePresence>
            {filteredNotes.map((note) => (
              <motion.div
                key={note._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass rounded-2xl p-6 relative group overflow-hidden hover:border-gold/30 transition-all border-l-4"
                style={{ borderLeftColor: note.color }}
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button onClick={() => handleDelete(note._id)} className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600"><Trash2 size={14} /></button>
                </div>
                <h3 className="text-lg font-serif font-bold mb-3 pr-8" style={{ color: note.color }}>{note.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{note.content}</p>
                <div className="mt-4 pt-4 border-t border-white/5 text-[10px] text-gray-600 uppercase tracking-widest font-black">
                  Updated recently
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredNotes.length === 0 && !isAdding && (
             <div className="col-span-full py-20 text-center text-gray-600 border-2 border-dashed border-white/5 rounded-3xl">
                No legal notes found. Start by creating a new one.
             </div>
          )}
        </div>
      </div>

      {/* Add Note Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-rich-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="glass max-w-xl w-full p-8 rounded-3xl border-gold/20 gold-glow relative"
            >
              <button 
                onClick={() => setIsAdding(false)} 
                className="absolute top-6 right-6 text-gray-500 hover:text-white"
              >
                <X size={24} />
              </button>
              
              <form onSubmit={handleAddNote} className="space-y-6">
                <h2 className="text-2xl font-serif font-bold text-white mb-8">Craft Legal <span className="text-gold italic">Note</span></h2>
                
                <div className="space-y-1">
                   <label className="text-xs font-bold uppercase tracking-widest text-gold">Subject Title</label>
                   <input 
                    required
                    value={newNote.title}
                    onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                    placeholder="Case File #992..." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-gold/50 outline-none text-white transition-all font-bold" 
                   />
                </div>

                <div className="space-y-1">
                   <label className="text-xs font-bold uppercase tracking-widest text-gold">Brief Content</label>
                   <textarea 
                    required
                    rows={6}
                    value={newNote.content}
                    onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                    placeholder="Enter legal points or case updates..." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-gold/50 outline-none text-white transition-all resize-none" 
                   />
                </div>

                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                   <div className="flex gap-2">
                      {colors.map(c => (
                        <button 
                          key={c}
                          type="button" 
                          onClick={() => setNewNote({...newNote, color: c})}
                          className={`w-8 h-8 rounded-full border-2 transition-transform ${newNote.color === c ? "border-white scale-110" : "border-transparent"}`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                   </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-gold-gradient py-4 rounded-xl text-rich-black font-black text-lg flex items-center justify-center gap-3 gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Save Secure Note <Save size={20} />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
