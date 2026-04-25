import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="pt-20 pb-10 px-4 bg-neutral-black text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center">
            <div className="relative h-12 w-40 overflow-hidden flex items-center justify-center">
              <Image 
                src="/logo.jpeg" 
                alt="Puchol Limelight Logo" 
                fill 
                className="object-contain object-left"
                referrerPolicy="no-referrer"
              />
            </div>
          </Link>
          <p className="opacity-70 text-sm leading-relaxed max-w-xs">
            Connecting brands with top Indian influencers to create high-impact marketing and exclusive shopping experiences.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><Instagram size={20} /></a>
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><Twitter size={20} /></a>
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><Facebook size={20} /></a>
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><Youtube size={20} /></a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-lg font-bold mb-6 font-display">Platform</h4>
          <ul className="space-y-4 opacity-70 text-sm">
            <li><Link href="/products" className="hover:text-primary transition-colors">Shop Products</Link></li>
            <li><Link href="/influencers" className="hover:text-primary transition-colors">Our Influencers</Link></li>
            <li><Link href="/brands" className="hover:text-primary transition-colors">For Brands</Link></li>
            <li><Link href="/how-it-works" className="hover:text-primary transition-colors">How it works</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-bold mb-6 font-display">Support</h4>
          <ul className="space-y-4 opacity-70 text-sm">
            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-6">
          <h4 className="text-lg font-bold font-display">Stay in the loop</h4>
          <p className="opacity-70 text-sm">Subscribe to get the latest trending products and tips.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              suppressHydrationWarning
              className="bg-white/10 border-white/10 border rounded-xl px-4 py-2.5 text-sm w-full outline-none focus:border-primary"
            />
            <button 
              type="button"
              suppressHydrationWarning
              className="px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-transform active:scale-95 bg-primary"
            >
              Join now
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 opacity-60 text-xs">
        <p>© 2024 Limelight Market Pvt Ltd. All rights reserved.</p>
        <p>Made with ❤️ for Indian Creators</p>
      </div>
    </footer>
  );
};

export default Footer;
