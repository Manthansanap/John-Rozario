"use client";
import React from "react";
import Link from "next/link";
import { LayoutDashboard, FileText, Scale, Users, Calendar, LogOut, Gavel, Settings, MessageCircle } from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", href: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Inquiries", href: "/admin/inquiries", icon: <MessageCircle size={20} /> },
    { name: "Manage Blogs", href: "/admin/blogs", icon: <FileText size={20} /> },
    { name: "Manage Laws", href: "/admin/laws", icon: <Scale size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-rich-black flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-gold/10 flex flex-col fixed h-full z-40">
        <div className="p-8 flex items-center gap-2 border-b border-white/5">
          <Gavel className="text-gold" size={28} />
          <span className="font-serif font-bold text-white tracking-widest text-lg">LEGAL <span className="text-gold">ADMIN</span></span>
        </div>

        <nav className="flex-grow p-4 space-y-2 mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
                pathname === item.href ? "bg-gold text-rich-black gold-glow" : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <div className="px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-gray-600">Account Control</div>
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all font-bold text-sm"
          >
            <LogOut size={20} />
            Logout Securely
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-64 p-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent">
        {children}
      </main>
    </div>
  );
}
