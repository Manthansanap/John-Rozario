"use client";
import React, { useState, useEffect } from "react";
import { Users, Shield, ShieldAlert, Trash2, Mail, Calendar, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setUsers(data);
        setLoading(false);
      });
  }, []);

  const handleRoleToggle = async (id: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    if (confirm(`Change role to ${newRole}?`)) {
      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, role: newRole }),
      });
      if (res.ok) {
         setUsers(users.map(u => u._id === id ? { ...u, role: newRole } : u));
      }
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <h1 className="text-4xl font-serif font-black text-white uppercase tracking-tighter">Client & <span className="text-gold italic">Admin List</span></h1>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm focus:border-gold/50 outline-none transition-all placeholder:text-gray-700 font-bold" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
           [1, 2, 3].map(i => <div key={i} className="glass h-48 rounded-4xl animate-pulse" />)
        ) : filteredUsers.length > 0 ? (
           filteredUsers.map((user) => (
             <motion.div 
              key={user._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-8 rounded-4xl border-white/5 relative group hover:border-gold/10 transition-all flex flex-col items-center text-center space-y-4"
             >
                <div className="relative">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center font-serif font-black text-2xl border-4 ${user.role === 'admin' ? 'border-gold bg-gold/10 text-gold' : 'border-white/10 bg-white/5 text-gray-500'}`}>
                     {user.name[0]}
                  </div>
                  {user.role === 'admin' && (
                    <div className="absolute -bottom-2 -right-2 bg-gold text-rich-black p-1.5 rounded-full shadow-lg">
                       <Shield size={14} />
                    </div>
                  )}
                </div>

                <div>
                   <h3 className="text-xl font-serif font-bold text-white group-hover:text-gold transition-colors">{user.name}</h3>
                   <p className="text-xs text-gray-500 font-black uppercase tracking-widest mt-1 flex items-center justify-center gap-2">
                     <Mail size={12} className="text-gold" /> {user.email}
                   </p>
                </div>

                <div className="pt-6 mt-2 border-t border-white/5 w-full flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-600">
                   <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(user.createdAt).toLocaleDateString()}</span>
                   <button 
                    onClick={() => handleRoleToggle(user._id, user.role)}
                    className={`flex items-center gap-1.5 py-1.5 px-4 rounded-full border transition-all ${user.role === 'admin' ? 'border-gold/30 text-gold hover:bg-gold/10' : 'border-white/10 text-gray-500 hover:border-gold/50'}`}
                   >
                     {user.role === 'admin' ? <ShieldAlert size={12} /> : <Shield size={12} />}
                     {user.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
                   </button>
                </div>
             </motion.div>
           ))
        ) : (
           <div className="col-span-full py-20 text-center glass rounded-4xl border-white/5 space-y-4">
              <Users size={48} className="mx-auto text-gold opacity-10" />
              <p className="font-bold text-xs uppercase tracking-widest text-gray-600">No users found matching your search query.</p>
           </div>
        )}
      </div>
    </div>
  );
}
