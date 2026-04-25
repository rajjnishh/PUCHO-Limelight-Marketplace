'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const isLoggedIn = !!user;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0 group">
          <div className="relative h-14 w-44">
            <Image 
              src="/logo.jpeg" 
              alt="pucho limelight" 
              fill 
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Center Menu - Pill Shape */}
        <div className="hidden lg:flex items-center bg-white border border-[#EAEAEA] rounded-full py-1.5 px-1.5 shadow-sm">
          {[
            { name: 'Shop', href: '/products' },
            { name: 'Influencers', href: '/influencers' },
            { name: 'How it Works', href: '/how-it-works' },
            { name: 'Sell with Us', href: '/register' }
          ].map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={`relative px-6 py-2 text-sm font-semibold transition-all duration-300 z-10 ${
                  isActive 
                    ? 'text-[#FF2E63]' 
                    : 'text-[#111] hover:text-[#FF2E63]'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="nav-active-pill"
                    className="absolute inset-0 bg-pink-50 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <Link 
            href={isLoggedIn ? "/profile" : "/login"} 
            className="flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/20 active:scale-95 bg-[#FF2E63] text-white text-sm"
          >
            <User size={18} />
            Influencer / Seller Login
          </Link>
          
          {isLoggedIn && (
            <button 
              type="button"
              onClick={handleLogout}
              className="hidden md:block text-xs font-bold text-neutral-gray hover:text-primary transition-colors duration-200 ml-2"
            >
              Logout
            </button>
          )}
          
          {/* Mobile Menu Toggle */}
          <button 
            type="button"
            className="lg:hidden p-2 transition-transform active:scale-90"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} className="text-neutral-black" /> : <Menu size={24} className="text-neutral-black" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t md:hidden flex flex-col p-6 gap-4 overflow-hidden"
          >
            <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold border-b pb-2 text-neutral-black hover:text-primary transition-colors">Products</Link>
            <Link href="/influencers" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold border-b pb-2 text-neutral-black hover:text-primary transition-colors">Influencers</Link>
            <Link href="/how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold border-b pb-2 text-neutral-black hover:text-primary transition-colors">How it Works</Link>
            
            {isLoggedIn && (
              <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold border-b pb-2 text-neutral-black flex justify-between items-center">
                Basket
                <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">2</span>
              </Link>
            )}

            <Link 
              href={isLoggedIn ? "/profile" : "/login"} 
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 p-4 rounded-xl text-white font-bold bg-primary transition-all active:scale-95"
            >
              <User size={20} />
              {isLoggedIn ? "Account" : "Login / Register"}
            </Link>

            {isLoggedIn && (
              <button 
                type="button"
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="text-neutral-gray font-bold p-2 hover:text-primary transition-colors"
              >
                Logout
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
