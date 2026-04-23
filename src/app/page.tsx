import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Services />

      <Testimonials />

      <section className="py-24 bg-gold-gradient relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-rich-black text-4xl md:text-6xl font-serif font-bold mb-8">Ready to Resolve Your Legal <br /> Matters with Excellence?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/contact" className="bg-rich-black text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-zinc-900 transition-colors gold-glow">Contact Us Now</Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 blur-[100px] rounded-full -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rich-black/10 blur-[100px] rounded-full -ml-48 -mb-48" />
      </section>

      <WhatsAppButton />
    </div>
  );
}
