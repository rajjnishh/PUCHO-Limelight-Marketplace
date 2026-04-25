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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-effect shadow-md py-2.5' : 'bg-transparent py-5'}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative h-12 w-40 overflow-hidden flex items-center justify-center">
            <Image 
              src="/logo.jpeg" 
              alt="Puchol Limelight Logo" 
              fill 
              className="object-contain object-left"
              referrerPolicy="no-referrer"
              priority
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1.5 p-1.5 rounded-2xl border-2 border-pink-500/30 bg-white/40 tracking-tight shadow-[0_0_15px_rgba(236,72,153,0.1)]">
          {[
            { name: 'Shop', href: '/products' },
            { name: 'Influencers', href: '/influencers' },
            { name: 'How it Works', href: '/how-it-works' },
            { name: 'Sell with Us', href: '/seller/dashboard' }
          ].map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={`relative px-5 py-2 rounded-xl text-[13px] font-bold transition-all duration-200 ${
                  isActive 
                    ? 'text-primary bg-white shadow-xs' 
                    : 'text-neutral-black/70 hover:text-neutral-black hover:bg-white/60'
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.div 
                    layoutId="nav-glow"
                    className="absolute inset-0 bg-primary/5 rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <Link href="/cart" className="relative p-2 hover:bg-black/5 rounded-full transition-colors duration-200">
              <ShoppingCart size={22} className="text-neutral-black" />
              <span 
                className="absolute top-0 right-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white bg-primary shadow-sm"
              >
                2
              </span>
            </Link>
          )}
          
          <Link 
            href={isLoggedIn ? "/profile" : "/login"} 
            className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg active:scale-95 bg-primary text-white text-sm"
          >
            <User size={16} />
            {isLoggedIn ? "Account" : "Influencer / Seller Login"}
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
            className="md:hidden p-2 transition-transform active:scale-90"
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
