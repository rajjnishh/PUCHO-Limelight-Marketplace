'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import Image from 'next/image';
import { TrendingUp, Users, ShoppingBag, ShieldCheck, Sparkles, ArrowRight, Star, Heart, CheckCircle2 } from 'lucide-react';

const HeroSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const avatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&h=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&h=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&h=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&h=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504257407762-f7012cdb3f76?q=80&w=150&h=150&auto=format&fit=crop"
  ];

  return (
    <section className="relative w-full min-h-[820px] pt-24 pb-16 overflow-hidden bg-white">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[45%] h-[45%] bg-[#FFF1F5] blur-[120px] rounded-full -z-10" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Content (Cols 1-6) */}
          <div className="col-span-12 lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F5F5] mb-8 mt-10"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF2E63]" />
              <span className="text-[12px] font-bold tracking-wider text-[#666] uppercase">The Future Of Social Commerce</span>
            </motion.div>

            <h1 className="text-[72px] font-bold leading-[1.1] text-[#111] mb-6 tracking-tight">
              Where Influencer <br /> Meets <span className="text-[#FF2E63]">Income.</span>
            </h1>

            <p className="text-[18px] text-[#666] max-w-[460px] leading-relaxed mb-10">
              India&apos;s leading social commerce aggregator. Any creator can earn commission by promoting 500+ premium brands to their audience.
            </p>

            <div className="flex items-center gap-4">
              <Link 
                href="/register"
                className="group flex items-center justify-between px-8 h-[56px] rounded-full bg-[#FF2E63] text-white font-bold transition-all hover:translate-y-[-2px] hover:shadow-lg hover:shadow-pink-500/20 active:scale-95 min-w-[200px]"
              >
                <span>Join the Portal</span>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center ml-4">
                  <ArrowRight size={18} className="text-[#FF2E63]" />
                </div>
              </Link>

              <Link 
                href="/products"
                className="group flex items-center justify-between px-8 h-[56px] rounded-full bg-white border border-[#EAEAEA] text-[#111] font-bold transition-all hover:bg-gray-50 active:scale-95 min-w-[220px]"
              >
                <span>Browse Marketplace</span>
                <div className="w-8 h-8 rounded-full bg-[#F8F8F8] flex items-center justify-center ml-4 shadow-sm border border-[#EAEAEA]">
                  <ArrowRight size={18} className="text-[#111]" />
                </div>
              </Link>
            </div>

            {/* Bottom Features Row */}
            <div className="mt-20 flex items-center gap-12">
              {[
                { icon: <ShoppingBag size={20} className="text-[#FF2E63]" />, label: "500+", sub: "Premium Brands" },
                { icon: <Users size={20} className="text-[#FF2E63]" />, label: "10K+", sub: "Active Creators" },
                { icon: <TrendingUp size={20} className="text-[#FF2E63]" />, label: "High", sub: "Earning Potential" },
                { icon: <ShieldCheck size={20} className="text-[#FF2E63]" />, label: "Trusted", sub: "Payouts & Support" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-[#111] leading-none mb-1">{item.label}</div>
                    <div className="text-[10px] font-medium text-[#999] whitespace-nowrap uppercase tracking-wider">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section (Cols 7-12) */}
          <div className="col-span-12 lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-[440px] h-[440px]">
              
              {/* Scribble Decorations */}
              <div className="absolute -top-12 -left-12 opacity-40 pointer-events-none">
                 <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 50 Q20 20 50 10 Q80 20 90 50 Q80 80 50 90 Q20 80 10 50" stroke="#FF2E63" strokeWidth="1" strokeDasharray="4 4" />
                    <path d="M20 50 Q30 30 50 20 Q70 30 80 50" stroke="#FF2E63" strokeWidth="0.5" />
                 </svg>
              </div>
              <div className="absolute -top-8 -right-8 opacity-40 pointer-events-none text-[#FF2E63]">
                 <Sparkles size={40} />
              </div>

              {/* Main Image Container */}
              <div className="w-full h-full rounded-[32px] overflow-hidden relative shadow-2xl bg-gray-50 border-[12px] border-white/40 backdrop-blur-sm">
                <Image 
                   src="/hero-image.png" 
                   alt="Young woman creator recording a video with camera on tripod"
                   fill
                   className="object-cover"
                   priority
                />
              </div>

              {/* FLOATING CARDS */}
              
              {/* Earnings Card (Top Right) */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute top-4 -right-16 bg-white p-3.5 rounded-[20px] shadow-[0_15px_50px_rgba(0,0,0,0.12)] min-w-[160px] z-20 border border-white/50"
              >
                 <div className="text-[10px] font-bold text-[#999] mb-1">Total Earnings</div>
                 <div className="text-[20px] font-bold text-[#111] leading-none mb-1">₹3,45,678 <span className="text-green-500 text-xs">↗</span></div>
                 <div className="text-[10px] font-bold text-green-500">+32% <span className="text-[#999] font-normal text-[9px]">this month</span></div>
              </motion.div>

              {/* Commission Card (Middle Left) */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute top-[220px] -left-16 bg-white p-6 rounded-[24px] shadow-[0_15px_50px_rgba(0,0,0,0.12)] flex items-center gap-5 z-20 border border-white"
              >
                <div>
                  <div className="text-[11px] font-bold text-[#999] mb-1 uppercase tracking-widest leading-none">Commission</div>
                  <div className="text-[14px] font-bold text-[#666] leading-none mb-1">Earn up to</div>
                  <div className="text-[32px] font-black text-[#111] leading-none">20% <span className="text-[12px] font-normal text-[#999]">per sale</span></div>
                </div>
                <div className="w-14 h-14 rounded-full bg-[#FF2E63]/10 flex items-center justify-center text-[#FF2E63] text-2xl font-bold shadow-inner">
                  ₹
                </div>
              </motion.div>

              {/* Product Grid (Bottom Left Overlay) */}
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.8 }}
                 className="absolute -bottom-10 -left-6 bg-white/95 backdrop-blur-md p-2 rounded-[28px] shadow-2xl border border-white z-20"
              >
                <div className="grid grid-cols-6 gap-1 w-[260px]">
                  {[
                    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=150&h=150&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=150&h=150&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=150&h=150&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=150&h=150&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=150&h=150&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=150&h=150&auto=format&fit=crop"
                  ].map((url, i) => (
                    <div key={i} className="aspect-square rounded-[10px] overflow-hidden relative">
                      <Image src={url} alt="Product" fill className="object-cover" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Brands You Love Strip (Bottom Right) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-4 -right-16 bg-white p-6 rounded-[24px] shadow-2xl border border-white z-10 min-w-[320px]"
              >
                <div className="text-[11px] font-bold text-[#999] mb-4 uppercase tracking-widest opacity-60">Brands You Love</div>
                <div className="flex items-center gap-6">
                  <div className="text-[12px] font-black text-[#111]">mamaearth</div>
                  <div className="text-[14px] font-black text-[#FF2E63] tracking-tighter">WOW</div>
                  <div className="text-[14px] font-black italic text-[#6a1b9a]">plum</div>
                  <div className="text-[12px] font-black tracking-[0.2em] text-[#111] uppercase border-b-2 border-black pb-0.5">SUGAR</div>
                  <div className="text-[10px] font-bold text-[#999] ml-auto">& more</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
