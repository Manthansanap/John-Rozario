"use client";
import React from "react";
import { motion } from "framer-motion";
import { Gavel, LandPlot, Users, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Transfer of Property",
    description: "Expert legal assistance in property transfers, title clearings, drafting of deeds, and comprehensive land matters.",
    icon: <FileText size={32} className="text-gold" />,
    link: "/laws?category=Property",
  },
  {
    title: "Property & Real Estate",
    description: "Legal guidance on property acquisitions, disputes, title verification, and registration services.",
    icon: <LandPlot size={32} className="text-gold" />,
    link: "/laws?category=Property",
  },
  {
    title: "Civil Advisory",
    description: "Effective resolution and advisory for civil matters including contract terms, agreements, and debt recovery.",
    icon: <Users size={32} className="text-gold" />,
    link: "/laws?category=Civil",
  },
  {
    title: "Documentation & Notary",
    description: "Official notary services, document drafting, registration, and legal verification for all needs.",
    icon: <FileText size={32} className="text-gold" />,
    link: "/contact",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-rich-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-gold uppercase tracking-[0.3em] font-medium text-sm"
          >
            Our Expertise
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-white"
          >
            Legal Solutions for Your <span className="text-gold italic">Success</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            className="h-1 bg-gold mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-2xl group hover:border-gold/40 transition-all duration-500 hover:-translate-y-2 gold-glow"
            >
              <div className="bg-gold/10 p-4 rounded-xl inline-block mb-6 group-hover:bg-gold/20 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-serif font-bold mb-4 group-hover:text-gold transition-colors">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <Link
                href={service.link}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold hover:translate-x-2 transition-transform"
              >
                Learn More <ChevronRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
