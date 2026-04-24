'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    };

    checkLogin();
    window.addEventListener('scroll', () => setIsScrolled(window.scrollY > 20));
    window.addEventListener('storage', checkLogin);
    
    // Custom event for same-tab login
    window.addEventListener('loginStateChange', checkLogin);

    return () => {
      window.removeEventListener('scroll', () => setIsScrolled(window.scrollY > 20));
      window.removeEventListener('storage', checkLogin);
      window.removeEventListener('loginStateChange', checkLogin);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ${isScrolled ? 'glass-effect shadow-lg py-3' : 'bg-transparent py-5'}`}
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
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors text-neutral-black">Shop</Link>
          <Link href="/influencer/dashboard" className="text-sm font-medium hover:text-primary transition-colors text-neutral-black">Influencer Hub</Link>
          <Link href="/seller/dashboard" className="text-sm font-medium hover:text-primary transition-colors text-neutral-black">Sell with Us</Link>
          <Link href="/how-it-works" className="text-sm font-medium hover:text-primary transition-colors text-neutral-black">How it Works</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <Link href="/cart" className="relative p-2 hover:bg-black/5 rounded-full transition-colors">
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
            className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all hover:shadow-lg active:scale-95 bg-primary text-white text-sm"
          >
            <User size={16} />
            {isLoggedIn ? "Account" : "Influencer / Seller Login"}
          </Link>
          
          {isLoggedIn && (
            <button 
              onClick={() => {
                localStorage.removeItem('isLoggedIn');
                window.dispatchEvent(new Event('loginStateChange'));
                window.location.href = '/';
              }}
              className="hidden md:block text-xs font-bold text-neutral-gray hover:text-primary transition-colors ml-2"
            >
              Logout
            </button>
          )}
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2"
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t md:hidden flex flex-col p-6 gap-4"
          >
            <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold border-b pb-2 text-neutral-black">Products</Link>
            <Link href="/influencers" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold border-b pb-2 text-neutral-black">Influencers</Link>
            <Link href="/how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold border-b pb-2 text-neutral-black">How it Works</Link>
            
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
                onClick={() => {
                  localStorage.removeItem('isLoggedIn');
                  window.dispatchEvent(new Event('loginStateChange'));
                  setMobileMenuOpen(false);
                  window.location.href = '/';
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
