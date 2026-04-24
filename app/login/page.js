'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, Github, Chrome, TrendingUp, ShoppingBag } from 'lucide-react';

export default function LoginPage() {
  const [accountType, setAccountType] = useState('influencer');

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('isLoggedIn', 'true');
    window.dispatchEvent(new Event('loginStateChange'));
    window.location.href = '/';
  };

  return (
    <main className="min-h-screen bg-neutral-light flex flex-col lg:flex-row">
      <div className="hidden lg:flex w-1/2 p-12 flex-col justify-between relative overflow-hidden bg-linear-to-br from-primary to-primary-dark">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <Link href="/" className="relative z-10 self-start">
          <div className="relative h-12 w-48 overflow-hidden flex items-center justify-center">
            <Image 
              src="/logo.jpeg" 
              alt="Puchol Limelight Logo" 
              fill 
              className="object-contain object-left brightness-0 invert"
              referrerPolicy="no-referrer"
            />
          </div>
        </Link>
        
        <div className="relative z-10 max-w-md">
          <h1 className="text-6xl font-black text-white mb-8 leading-tight font-display">Welcome back to the limelight.</h1>
          <p className="text-white/80 text-xl leading-relaxed">The best way to shop and promote trending products in India.</p>
        </div>
        
        <div className="relative z-10 flex items-center gap-6">
           <div className="flex -space-x-4">
             {[1,2,3,4].map(i => (
               <div key={i} className="relative w-12 h-12 rounded-full border-4 border-primary-dark bg-gray-200 overflow-hidden shadow-lg">
                 <Image 
                   src={`https://picsum.photos/seed/user${i}/100/100`} 
                   alt="user" 
                   fill 
                   className="object-cover" 
                   referrerPolicy="no-referrer"
                 />
               </div>
             ))}
           </div>
           <p className="text-white/70 text-sm font-bold uppercase tracking-widest">Join 50K+ other creators</p>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center p-8 md:p-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-dark/5 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2 text-white"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-12">
            <h2 className="text-4xl font-extrabold mb-4 text-neutral-black font-display">Welcome Back</h2>
            <p className="text-neutral-gray font-medium">Please select your account type and login.</p>
          </div>

          {/* Account Type Toggle */}
          <div className="flex p-1.5 bg-gray-100 rounded-3xl mb-10 border border-gray-100">
             <button 
               type="button"
               onClick={() => setAccountType('influencer')}
               className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all ${accountType === 'influencer' ? 'bg-white shadow-xl text-primary' : 'text-neutral-black/40'}`}
             >
               <TrendingUp size={18} />
               Influencer
             </button>
             <button 
               type="button"
               onClick={() => setAccountType('seller')}
               className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all ${accountType === 'seller' ? 'bg-white shadow-xl text-primary' : 'text-neutral-black/40'}`}
             >
               <ShoppingBag size={18} />
               Seller
             </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-gray ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-gray" size={20} />
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full pl-16 pr-6 py-5 rounded-2xl bg-white border border-gray-100 outline-none focus:ring-2 ring-primary/20 text-lg transition-all shadow-sm text-neutral-black"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-gray">Password</label>
                <Link href="#" className="text-xs font-bold text-primary hover:underline">Forgot Password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-gray" size={20} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-16 pr-6 py-5 rounded-2xl bg-white border border-gray-100 outline-none focus:ring-2 ring-primary/20 text-lg transition-all shadow-sm text-neutral-black"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-5 rounded-3xl font-black text-lg transition-all hover:-translate-y-1 active:scale-95 shadow-2xl flex items-center justify-center gap-3 text-white bg-linear-to-br from-primary to-primary-dark"
            >
              Sign In
              <ArrowRight size={22} />
            </button>
          </form>

          <div className="mt-10 relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest text-neutral-gray"><span className="bg-neutral-light px-4">Or continue with</span></div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4">
            <button 
              onClick={handleLogin}
              className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-white border border-gray-100 font-bold hover:bg-gray-50 transition-all shadow-sm text-neutral-black"
            >
              <Chrome size={20} />
              Google
            </button>
            <button 
              onClick={handleLogin}
              className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-white border border-gray-100 font-bold hover:bg-gray-50 transition-all shadow-sm text-neutral-black"
            >
              <Github size={20} />
              GitHub
            </button>
          </div>

          <p className="mt-12 text-center text-neutral-gray font-medium">
            Don&apos;t have an account? <Link href="/register" className="text-primary font-bold hover:underline">Create Account</Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
