'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { TrendingUp, Users, ShoppingBag, ShieldCheck } from 'lucide-react';

const HeroSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };
    checkLogin();
    window.addEventListener('loginStateChange', checkLogin);
    window.addEventListener('storage', checkLogin);
    return () => {
      window.removeEventListener('loginStateChange', checkLogin);
      window.removeEventListener('storage', checkLogin);
    };
  }, []);

  const handleJoinAction = () => {
    if (isLoggedIn) {
      router.push('/influencer/dashboard');
    } else {
      router.push('/login');
    }
  };

  const handleBrowseAction = () => {
    router.push('/products');
  };

  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-neutral-light">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 rounded-full blur-[120px] opacity-20 pointer-events-none bg-primary"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 rounded-full blur-[100px] opacity-10 pointer-events-none bg-primary-dark"></div>

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm mb-8"
        >
          <span className="flex h-2 w-2 rounded-full animate-pulse bg-primary"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-gray">The Future of Social Commerce</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.2 }}
          className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight text-neutral-black font-display"
        >
          Turn Products into <span className="text-primary">Income.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.4 }}
          className="text-lg md:text-2xl max-w-2xl mb-12 leading-relaxed text-neutral-gray"
        >
          India&apos;s leading social commerce aggregator. Any creator can earn commission by promoting 500+ premium brands to their audience.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.0, delay: 0.8 }}
           className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
         >
           <div className="w-full sm:w-auto">
             <button 
               onClick={handleJoinAction}
               className="w-full px-12 py-5 rounded-3xl font-black text-xl shadow-2xl transition-all hover:-translate-y-1 active:scale-95 text-white bg-linear-to-br from-primary to-primary-dark cursor-pointer"
             >
               {isLoggedIn ? "Go to Dashboard" : "Join the Portal"}
             </button>
           </div>
           <div className="w-full sm:w-auto">
             <button 
               onClick={handleBrowseAction}
               className="w-full px-12 py-5 rounded-3xl font-black text-xl bg-white border border-gray-200 shadow-xl transition-all hover:-translate-y-1 active:scale-95 text-neutral-black cursor-pointer"
             >
               Browse Marketplace
             </button>
           </div>
         </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.0, delay: 1.2 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full"
        >
          <div className="flex flex-col items-center">
            <div className="p-4 rounded-2xl mb-4 bg-white shadow-md">
              <Users size={28} className="text-primary" />
            </div>
            <span className="text-3xl font-bold mb-1">5000+</span>
            <span className="text-sm font-medium opacity-60">Influencers</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-4 rounded-2xl mb-4 bg-white shadow-md">
              <ShoppingBag size={28} className="text-primary" />
            </div>
            <span className="text-3xl font-bold mb-1">500</span>
            <span className="text-sm font-medium opacity-60">Top Brands</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-4 rounded-2xl mb-4 bg-white shadow-md">
              <TrendingUp size={28} className="text-primary" />
            </div>
            <span className="text-3xl font-bold mb-1">₹1Cr+</span>
            <span className="text-sm font-medium opacity-60">Payouts</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-4 rounded-2xl mb-4 bg-white shadow-md">
              <ShieldCheck size={28} className="text-primary" />
            </div>
            <span className="text-3xl font-bold mb-1">100%</span>
            <span className="text-sm font-medium opacity-60">Secure Payments</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
