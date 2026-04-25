'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { motion } from 'motion/react';
import { 
  Zap, 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  ShieldCheck, 
  CreditCard,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HowItWorks() {
  const influencerSteps = [
    {
      title: "Create Your Profile",
      description: "Join as an influencer, link your social media accounts, and set up your niche storefront in minutes.",
      icon: <Users className="text-primary" size={24} />,
      color: "bg-primary/10"
    },
    {
      title: "Pick Your Products",
      description: "Browse thousands of high-quality products from top sellers. Select items that resonate with your audience.",
      icon: <ShoppingBag className="text-primary" size={24} />,
      color: "bg-primary/10"
    },
    {
      title: "Share & Earn",
      description: "Promote your curated shop using your unique links. Earn high commissions on every sale you generate.",
      icon: <CreditCard className="text-primary" size={24} />,
      color: "bg-primary/10"
    }
  ];

  const sellerSteps = [
    {
      title: "List Your Inventory",
      description: "Upload your product catalog. Our smart system categorizes items to match the right influencers.",
      icon: <Zap className="text-pink-500" size={24} />,
      color: "bg-pink-50"
    },
    {
      title: "Partner with Talent",
      description: "Collaborate with verified influencers who love your products. Scale your reach effortlessly.",
      icon: <TrendingUp className="text-pink-500" size={24} />,
      color: "bg-pink-50"
    },
    {
      title: "Grow Your Brand",
      description: "Watch your sales grow as influencers drive high-intent traffic to your products. Pay only for performance.",
      icon: <ShieldCheck className="text-pink-500" size={24} />,
      color: "bg-pink-50"
    }
  ];

  return (
    <main className="min-h-screen bg-neutral-light overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[130px] -z-10 rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-300/10 blur-[100px] -z-10 rounded-full" />
        
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-effect border border-black/5 mb-8 shadow-sm"
          >
            <Sparkles size={16} className="text-primary" />
            <span className="text-[10px] uppercase font-bold text-neutral-black tracking-widest">The Ecosystem</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tight text-neutral-black font-display">
            The New Way to <br />
            <span className="text-primary">Influence & Sell.</span>
          </h1>
          <p className="text-neutral-gray text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            Limelight bridges the gap between creators and commerce. A powerful platform built for the next generation of digital entrepreneurs.
          </p>
        </div>
      </section>

      {/* For Influencers */}
      <section className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-neutral-black font-display">
              For <span className="text-primary">Influencers.</span>
            </h2>
            <p className="text-neutral-gray text-lg mb-12 leading-relaxed">
              Stop waiting for brand deals. Take control of your income by launching your own curated marketplace with products your followers will love.
            </p>
            
            <div className="space-y-10">
              {influencerSteps.map((step, idx) => (
                <div key={idx} className="flex gap-6 items-start group">
                  <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-neutral-black">{step.title}</h4>
                    <p className="text-neutral-gray leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/register" className="mt-12 inline-flex items-center gap-3 px-8 py-5 rounded-3xl bg-primary text-white font-black hover:bg-primary-dark transition-all hover:-translate-y-1 shadow-2xl group">
              Start Your Shop <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square relative rounded-[40px] overflow-hidden shadow-2xl">
               <Image 
                 src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop" 
                 alt="Influencer using the platform"
                 fill
                 className="object-cover"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-linear-to-t from-primary/40 to-transparent" />
            </div>
            {/* Floating UI Elements */}
            <div className="absolute -bottom-10 -left-10 glass-effect p-6 rounded-3xl shadow-2xl border border-white/20 animate-bounce-slow">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <TrendingUp className="text-green-500" size={24} />
                 </div>
                 <div>
                    <p className="text-xs font-bold text-neutral-gray uppercase tracking-widest">Earnings Update</p>
                    <p className="text-2xl font-black text-neutral-black">₹42,500.00</p>
                 </div>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-primary rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* For Sellers */}
      <section className="py-24 px-4 bg-neutral-light relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-square relative rounded-[40px] overflow-hidden shadow-2xl">
               <Image 
                 src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2570&auto=format&fit=crop" 
                 alt="Seller managing orders"
                 fill
                 className="object-cover"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-linear-to-t from-pink-500/30 to-transparent" />
            </div>
            {/* Floating UI Elements */}
            <div className="absolute -top-10 -right-10 glass-effect p-6 rounded-3xl shadow-2xl border border-white/20">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center">
                    <Users className="text-pink-500" size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-gray uppercase tracking-widest">Active Partnerships</p>
                    <p className="text-2xl font-black text-neutral-black">12 Creators</p>
                  </div>
               </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-neutral-black font-display">
              For <span className="text-pink-500">Sellers.</span>
            </h2>
            <p className="text-neutral-gray text-lg mb-12 leading-relaxed">
              Ditch the expensive billboards. Let authentic creators tell your brand story. Scale your sales with a motivated army of brand ambassadors.
            </p>
            
            <div className="space-y-10">
              {sellerSteps.map((step, idx) => (
                <div key={idx} className="flex gap-6 items-start group">
                  <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-neutral-black">{step.title}</h4>
                    <p className="text-neutral-gray leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/register" className="mt-12 inline-flex items-center gap-3 px-8 py-5 rounded-3xl bg-neutral-black text-white font-black hover:bg-neutral-black/80 transition-all hover:-translate-y-1 shadow-2xl group">
              Start Selling <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4">
        <div className="max-w-5xl mx-auto rounded-[60px] bg-linear-to-br from-primary to-primary-dark p-12 md:p-24 text-center relative overflow-hidden shadow-3xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] -translate-y-1/2 translate-x-1/2 rounded-full" />
           <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 blur-[60px] translate-y-1/2 -translate-x-1/2 rounded-full" />
           
           <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight font-display">
                Ready to transform your <br /> Digital Future?
              </h2>
              <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto font-medium">
                Join thousands of creators and brands building the future of social commerce in India.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <Link href="/register" className="px-10 py-6 rounded-[2rem] bg-white text-primary font-black text-xl hover:bg-neutral-light transition-all hover:-translate-y-1 shadow-2xl min-w-[240px]">
                  Join as Creator
                </Link>
                <Link href="/register" className="px-10 py-6 rounded-[2rem] border-2 border-white/30 text-white font-black text-xl hover:bg-white/10 transition-all hover:-translate-y-1 min-w-[240px]">
                  Join as Seller
                </Link>
              </div>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
