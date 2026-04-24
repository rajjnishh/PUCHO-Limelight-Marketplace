'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ProductCard from '../../../components/ProductCard';
import { influencers } from '../../../data/influencers';
import { products } from '../../../data/products';
import Image from 'next/image';
import { Users, TrendingUp, Calendar, Share2, Instagram, Twitter, Youtube, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function InfluencerProfilePage() {
  const { handle } = useParams();
  const influencer = influencers.find(i => i.handle === handle) || influencers[0];
  
  const influencerProducts = products.filter(p => influencer.products.includes(p.id));

  return (
    <main className="min-h-screen bg-neutral-light">
      <Navbar />

      {/* Banner & Profile Header */}
      <section className="pt-20">
        <div className="relative h-64 md:h-96 w-full overflow-hidden">
          <Image 
            src={influencer.banner} 
            alt="banner"
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-end gap-8 -mt-20 md:-mt-32 relative z-10 mb-12">
            <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-[48px] border-8 border-neutral-light overflow-hidden shadow-2xl bg-white shrink-0">
              <Image 
                src={influencer.image} 
                alt={influencer.name}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="flex-grow pb-4 md:pb-8 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg font-display">
                  {influencer.name}
                </h1>
                <CheckCircle2 size={32} className="text-primary-dark inline-block self-center md:self-auto" />
              </div>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Instagram size={20} />
                  <span className="font-bold text-lg">@{influencer.handle}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-sm font-bold uppercase tracking-wider">
                  {influencer.category}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pb-8">
              <button className="px-8 py-4 rounded-2xl bg-white font-bold text-neutral-black shadow-xl transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2">
                <Share2 size={18} />
                Share Profile
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20">
             {[
               { icon: <Users className="text-primary" />, label: "Followers", value: influencer.followers },
               { icon: <TrendingUp className="text-accent" />, label: "Total Earnings", value: influencer.earnings },
               { icon: <Calendar className="text-primary-dark" />, label: "Joined", value: "Feb 2022" },
               { icon: <CheckCircle2 className="text-accent-orange" />, label: "Campaigns", value: "48+" }
             ].map((stat, idx) => (
               <div key={idx} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center">
                 <div className="mb-3 p-3 rounded-2xl bg-gray-50">{stat.icon}</div>
                 <span className="text-2xl font-black text-neutral-black">{stat.value}</span>
                 <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-gray">{stat.label}</span>
               </div>
             ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sidebar: Bio & Socials */}
            <div className="lg:col-span-1 space-y-8">
               <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
                 <h3 className="text-2xl font-bold mb-6 text-neutral-black font-display">About Me</h3>
                 <p className="text-neutral-gray leading-relaxed text-lg mb-8">
                   {influencer.bio} Our exclusive collaboration brings you the best products curated specifically for our community.
                 </p>
                 <div className="flex flex-col gap-4">
                   <h4 className="font-bold text-sm uppercase tracking-widest text-neutral-black/40 mb-2">Connect</h4>
                    <a href="#" className="flex items-center justify-between p-4 rounded-2xl transition-colors hover:bg-gray-50 border border-gray-50">
                      <div className="flex items-center gap-3">
                        <Instagram className="text-pink-500" />
                        <span className="font-bold text-neutral-black">Instagram</span>
                      </div>
                      <span className="opacity-40 tracking-tighter text-neutral-black font-mono">840K →</span>
                    </a>
                    <a href="#" className="flex items-center justify-between p-4 rounded-2xl transition-colors hover:bg-gray-50 border border-gray-50">
                      <div className="flex items-center gap-3">
                        <Youtube className="text-red-500" />
                        <span className="font-bold text-neutral-black">YouTube</span>
                      </div>
                      <span className="opacity-40 tracking-tighter text-neutral-black font-mono">1.2M →</span>
                    </a>
                    <a href="#" className="flex items-center justify-between p-4 rounded-2xl transition-colors hover:bg-gray-50 border border-gray-50">
                      <div className="flex items-center gap-3">
                        <Twitter className="text-blue-500" />
                        <span className="font-bold text-neutral-black">Twitter</span>
                      </div>
                      <span className="opacity-40 tracking-tighter text-neutral-black font-mono">120K →</span>
                    </a>
                 </div>
               </div>
            </div>

            {/* Main: Storefront */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-extrabold text-neutral-black font-display">
                  My Storefront
                </h2>
                <span className="text-neutral-gray font-medium">{influencerProducts.length} Products</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {influencerProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
