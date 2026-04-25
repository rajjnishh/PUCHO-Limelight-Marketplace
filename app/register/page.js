'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight, TrendingUp, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

export default function RegisterPage() {
  const [accountType, setAccountType] = useState('influencer');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Sign up user
      const { user } = await signUp(email, password, {
        name: fullName,
        role: accountType,
      });

      if (user) {
        // 2. Create entry in profiles table explicitly if no trigger is set
        // In a real app, a DB trigger is better, but let's do it here for robustness
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: user.id, 
              name: fullName, 
              email: email, 
              role: accountType,
              handle: fullName.toLowerCase().replace(/\s+/g, '.') + Math.floor(Math.random() * 1000)
            }
          ]);
        
        if (profileError) throw profileError;

        // If influencer, also add to influencers table
        if (accountType === 'influencer') {
          await supabase.from('influencers').insert([{
            profile_id: user.id,
            name: fullName,
            handle: fullName.toLowerCase().replace(/\s+/g, '.') + Math.floor(Math.random() * 1000),
            bio: 'New Limelight Influencer'
          }]);
        }
      }

      window.location.href = '/';
    } catch (err) {
      setError(err.message || 'Failed to create account');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-light flex flex-col lg:flex-row-reverse">
      <div className="hidden lg:flex w-1/2 p-12 flex-col justify-between relative overflow-hidden bg-neutral-black">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2 opacity-20"></div>
        
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
          <h1 className="text-6xl font-black text-white mb-8 leading-tight font-display">Empowering Indian Creators.</h1>
          <p className="text-white/80 text-xl leading-relaxed">Join the fastest growing influencer community and transform your social presence into a business.</p>
        </div>
        
        <div className="relative z-10 space-y-6">
           <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
              <h4 className="text-white font-bold mb-2">Total Paid Commission</h4>
              <span className="text-4xl font-black text-primary">₹15,40,24,000+</span>
           </div>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center p-8 md:p-24 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-12">
            <h2 className="text-4xl font-extrabold mb-4 text-neutral-black font-display">Get Started</h2>
            <p className="text-neutral-gray font-medium">Join Limelight today and start your journey.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-500 text-sm font-bold border border-red-100">
              {error}
            </div>
          )}

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

          <form onSubmit={handleRegister} className="space-y-6 text-neutral-black">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-gray ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-gray" size={20} />
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder={accountType === 'influencer' ? "Your Name" : "Company/Seller Name"} 
                  className="w-full pl-16 pr-6 py-5 rounded-2xl bg-white border border-gray-100 outline-none focus:ring-2 ring-primary/20 text-lg transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-gray ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-gray" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@company.com" 
                  className="w-full pl-16 pr-6 py-5 rounded-2xl bg-white border border-gray-100 outline-none focus:ring-2 ring-primary/20 text-lg transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-gray ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-gray" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••" 
                  className="w-full pl-16 pr-6 py-5 rounded-2xl bg-white border border-gray-100 outline-none focus:ring-2 ring-primary/20 text-lg transition-all shadow-sm"
                />
              </div>
            </div>

            <p className="text-[10px] text-neutral-gray px-1 font-medium leading-relaxed">
              By signing up, you agree to our <Link href="#" className="font-bold underline">Terms of Service</Link> and <Link href="#" className="font-bold underline">Privacy Policy</Link>.
            </p>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-3xl font-black text-lg transition-all hover:-translate-y-1 active:scale-95 shadow-2xl flex items-center justify-center gap-3 text-white bg-linear-to-br from-primary to-primary-dark ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? "Creating Account..." : "Create Account"}
              <ArrowRight size={22} />
            </button>
          </form>

          <p className="mt-12 text-center text-neutral-gray font-medium">
            Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Login instead</Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
