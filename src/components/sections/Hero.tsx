"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Scale, Award } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gold/10 blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 text-gold text-sm font-medium">
              <ShieldCheck size={16} />
              <span>Expert Legal Representation in Pune</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
              Justice with <span className="text-gold italic">Integrity.</span> <br />
              Excellence with <span className="text-gold">Results.</span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed">
              Adv. Rozario John provides premium legal solutions tailored to your unique needs. With years of expertise in Civil, Land, and Transfer of Property matters, we ensure your legal needs are met safely and securely.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/booking"
                className="bg-gold-gradient text-rich-black px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 gold-glow hover:scale-105 transition-transform"
              >
                Schedule Consultation <ArrowRight size={20} />
              </Link>
              <Link
                href="/#services"
                className="border border-gold/50 text-gold px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-gold/10 transition-all"
              >
                Our Expertise
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
              <div className="space-y-1">
                <h3 className="text-3xl font-serif font-bold text-gold">15+</h3>
                <p className="text-gray-500 text-sm">Years Experience</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-serif font-bold text-gold">500+</h3>
                <p className="text-gray-500 text-sm">Cases Won</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-serif font-bold text-gold">1k+</h3>
                <p className="text-gray-500 text-sm">Happy Clients</p>
              </div>
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden glass border-2 border-gold/20 gold-glow">
              <Image
                src="/john rojario image.png"
                alt="Adv. Rozario John"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rich-black via-transparent to-transparent opacity-60" />
            </div>

            {/* floating badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -bottom-6 -left-6 bg-rich-black/90 backdrop-blur-md p-6 rounded-xl border border-gold/30 gold-glow hidden sm:block"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gold/20 p-3 rounded-full">
                  <Scale className="text-gold" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Designation</p>
                  <p className="font-serif font-bold">Advocate & Notary</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="absolute top-10 -right-6 bg-rich-black/90 backdrop-blur-md p-6 rounded-xl border border-gold/30 gold-glow hidden sm:block"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gold/20 p-3 rounded-full">
                  <Award className="text-gold" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Specialization</p>
                  <p className="font-serif font-bold">Transfer of Property</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
