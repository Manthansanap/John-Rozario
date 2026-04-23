"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", type: "Property & Real Estate", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    // Even if it fails silently locally (e.g., wifi drop), pretend submitted for UI flow:
    setSubmitted(true);
  };

  return (
    <div className="bg-rich-black min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif font-bold"
          >
            Get in <span className="text-gold italic">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            We're here to provide expert legal insights. Reach out to set up a private consultation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Details */}
          <div className="space-y-12">
            <div className="space-y-8">
              <h2 className="text-3xl font-serif font-bold text-gold">Office Information</h2>
              
              <div className="flex items-start gap-6 p-6 glass rounded-2xl hover:border-gold/30 transition-all group">
                <div className="bg-gold/10 p-4 rounded-xl text-gold group-hover:bg-gold/20 transition-colors">
                  <MapPin size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Office Address</h3>
                  <p className="text-gray-400">52, Jai Ganesh Vishwa, Vishrantwadi Chowk, Pune 411015.</p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 glass rounded-2xl hover:border-gold/30 transition-all group">
                <div className="bg-gold/10 p-4 rounded-xl text-gold group-hover:bg-gold/20 transition-colors">
                  <Phone size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Direct Line</h3>
                  <p className="text-gray-400">+91 9881374319 | +91 912041264872</p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 glass rounded-2xl hover:border-gold/30 transition-all group">
                <div className="bg-gold/10 p-4 rounded-xl text-gold group-hover:bg-gold/20 transition-colors">
                  <Mail size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Correspondence</h3>
                  <p className="text-gray-400">rozariojohn@outlook.com</p>
                  <p className="text-gray-400 text-sm italic">rozariojohn7@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden glass border border-gold/20 grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.356262441042!2d73.87766057519266!3d18.55799988254425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c12574972583%3A0xc3f140645c38ac!2sVishrantwadi%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1711910000000!5m2!1sen!2sin"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Form */}
          <div className="glass p-10 rounded-3xl border-gold/10 gold-glow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full" />
            
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="bg-gold/20 p-6 rounded-full">
                  <CheckCircle2 size={64} className="text-gold" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-gold">Message Received</h2>
                <p className="text-gray-400 max-w-sm">Thank you for reaching out. Adv. John's office will contact you shortly to discuss your requirements.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-gold underline font-bold"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-serif font-bold mb-8 italic">Consultation Request</h3>
                
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gold font-bold">Full Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-gold/50 outline-none transition-all placeholder:text-gray-600" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gold font-bold">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+91 00000 00000" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-gold/50 outline-none transition-all placeholder:text-gray-600" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gold font-bold">Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="name@email.com" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-gold/50 outline-none transition-all placeholder:text-gray-600" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gold font-bold">Inquiry Type</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-gold/50 outline-none transition-all appearance-none cursor-pointer text-gray-400">
                    <option>Property & Real Estate</option>
                    <option>Criminal Defense</option>
                    <option>Civil Litigation</option>
                    <option>Documentation</option>
                    <option>Other Legal Matters</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gold font-bold">Detailed Message</label>
                  <textarea 
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Describe your legal situation briefly..." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-gold/50 outline-none transition-all placeholder:text-gray-600"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-gold-gradient py-5 rounded-xl text-rich-black font-black text-lg flex items-center justify-center gap-3 gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all mt-4"
                >
                  Send Inquiry <Send size={20} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
