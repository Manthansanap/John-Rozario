import Link from "next/link";
import { Gavel, Mail, Phone, MapPin, Globe, MessageCircle, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-rich-black text-white border-t border-gold/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Gavel className="text-gold h-8 w-8" />
              <span className="text-xl font-serif font-bold tracking-tighter">
                ADV. ROZARIO <span className="text-gold">JOHN</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Providing premium legal solutions with integrity and excellence. Your trusted partner in Criminal, Civil, and Property law matters.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="p-2 glass rounded-full hover:bg-gold/20 transition-colors">
                <Globe size={18} className="text-gold" />
              </Link>
              <Link href="#" className="p-2 glass rounded-full hover:bg-gold/20 transition-colors">
                <MessageCircle size={18} className="text-gold" />
              </Link>
              <Link href="#" className="p-2 glass rounded-full hover:bg-gold/20 transition-colors">
                <Share2 size={18} className="text-gold" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg mb-6 text-gold">Legal Expertise</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/laws?category=Criminal" className="hover:text-gold transition-colors">Criminal Law</Link></li>
              <li><Link href="/laws?category=Civil" className="hover:text-gold transition-colors">Civil Litigation</Link></li>
              <li><Link href="/laws?category=Property" className="hover:text-gold transition-colors">Property Disputes</Link></li>
              <li><Link href="/laws?category=Family" className="hover:text-gold transition-colors">Family Matters</Link></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="font-serif text-lg mb-6 text-gold">Quick Access</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-gold transition-colors">About the Advocate</Link></li>
              <li><Link href="/blog" className="hover:text-gold transition-colors">Legal Blog</Link></li>
              <li><Link href="/calculator" className="hover:text-gold transition-colors">Stamp Duty Calculator</Link></li>
              <li><Link href="/notes" className="hover:text-gold transition-colors">Client Notes</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="font-serif text-lg mb-2 text-gold">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-gold mt-1 shrink-0" size={18} />
                <p className="text-sm text-gray-400">52, Jai Ganesh Vishwa, Vishrantwadi Chowk, Pune 411015.</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-gold shrink-0" size={18} />
                <p className="text-sm text-gray-400">+91 9881374319</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-gold shrink-0" size={18} />
                <p className="text-sm text-gray-400">rozariojohn@outlook.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Adv. Rozario John. All rights reserved.</p>
          <div className="flex gap-6 items-center">
            <Link href="#" className="hover:text-gold">Privacy Policy</Link>
            <Link href="#" className="hover:text-gold">Terms of Service</Link>
            <Link href="/login" className="ml-4 border border-white/10 px-3 py-1 rounded-full hover:border-gold hover:text-gold transition-all">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
