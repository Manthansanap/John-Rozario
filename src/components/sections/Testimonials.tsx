"use client";
import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Malhotra",
    role: "Business Owner",
    content: "Adv. Rozario John handled our property dispute with exceptional professionalism. His strategic approach and Attention to detail saved us months of litigation.",
    rating: 5,
  },
  {
    name: "Sneha Kulkarni",
    role: "Technologist",
    content: "The best legal advice I've received in Pune. He explains complex legal terms so clearly. highly recommend him for any civil matters.",
    rating: 5,
  },
  {
    name: "Arjun Deshmukh",
    role: "Entrepreneur",
    content: "Integrity is rare in this profession, but Adv. John is an exception. He gave us honest advice even when it meant less work for him. A true gentleman.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-rich-black relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-serif font-bold"
          >
            Client <span className="text-gold italic">Endorsements</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Our reputation is built on the success of our clients and the trust they place in our legal expertise.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl relative hover:border-gold/30 transition-all group"
            >
              <div className="absolute -top-4 -left-4 bg-gold/20 p-3 rounded-xl">
                <Quote className="text-gold" size={24} />
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-gold text-gold" />
                ))}
              </div>

              <p className="text-gray-300 italic mb-8 leading-relaxed">
                "{t.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gold-gradient flex items-center justify-center font-bold text-rich-black">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-sm">{t.name}</h4>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
