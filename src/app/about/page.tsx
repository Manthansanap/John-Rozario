"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, Clock, CheckCircle2, LandPlot } from "lucide-react";

export default function AboutPage() {
  const experiences = [
    { year: "2008", title: "LL.B. Graduate", institution: "Pune University" },
    { year: "2010", title: "Started Private Practice", description: "Specializing in diverse legal advisory including Land and Property transfers." },
    { year: "2015", title: "Appointed as Notary", institution: "" },
    { year: "2020", title: "Senior Legal Consultant", description: "Leading transfer of property, land matters, and corporate legal advisory." },
  ];

  return (
    <div className="bg-rich-black min-h-screen pb-24">
      {/* Header Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gold/5 blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-6xl font-serif font-bold">
                Adv. <span className="text-gold">Rozario John</span>
              </h1>
              <p className="text-gold uppercase tracking-widest font-bold text-sm">
                B.S.L., LL.B., D.L.L. & L.W. | Advocate & Notary
              </p>
              <div className="h-1 w-20 bg-gold" />
              <p className="text-gray-400 text-lg leading-relaxed">
                With a career spanning over 15 years, Adv. Rozario John has established a reputation for uncompromising integrity and exceptional legal skill. Based in Pune, he serves as a dedicated legal advisor for clients across Maharashtra, providing strategic counsel in complex land and property matters without stepping into a courtroom.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Our practice is built on the foundation of trust, expertise, and a commitment to achieving the best possible results for every client, regardless of the complexity of the case.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-3xl overflow-hidden glass border-2 border-gold/20"
            >
              <Image
                src="/john rojario image.png"
                alt="Adv. Rozario John"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-all duration-700"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise Stats */}
      <section className="py-16 border-y border-white/5 bg-white/2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="space-y-2">
              <Clock className="text-gold mx-auto mb-4" size={32} />
              <h3 className="text-3xl font-serif font-bold">15+</h3>
              <p className="text-gray-500 text-sm uppercase tracking-widest">Years Experience</p>
            </div>
            <div className="space-y-2">
              <CheckCircle2 className="text-gold mx-auto mb-4" size={32} />
              <h3 className="text-3xl font-serif font-bold">500+</h3>
              <p className="text-gray-500 text-sm uppercase tracking-widest">Successful Cases</p>
            </div>
            <div className="space-y-2">
              <GraduationCap className="text-gold mx-auto mb-4" size={32} />
              <h3 className="text-3xl font-serif font-bold">4+</h3>
              <p className="text-gray-500 text-sm uppercase tracking-widest">Legal Degrees</p>
            </div>
            <div className="space-y-2">
              <LandPlot className="text-gold mx-auto mb-4" size={32} />
              <h3 className="text-3xl font-serif font-bold">Land</h3>
              <p className="text-gray-500 text-sm uppercase tracking-widest">Specialist</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-center mb-16 text-gold">Professional Journey</h2>
          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-8 items-start relative"
              >
                <div className="md:w-1/4">
                  <span className="text-4xl font-serif font-black text-white/5 absolute -top-4 -left-4 md:static md:text-5xl md:opacity-10 transition-opacity group-hover:opacity-20">{exp.year}</span>
                  <div className="text-gold font-bold text-2xl hidden md:block">{exp.year}</div>
                </div>
                <div className="md:w-3/4 glass p-8 rounded-2xl border-l-4 border-l-gold hover:translate-x-2 transition-all">
                  <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">{exp.title}</h3>
                  <p className="text-gold mb-2 font-medium">{exp.institution}</p>
                  <p className="text-gray-400 text-sm">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
