'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import InfluencerCard from '../../components/InfluencerCard';
import { influencers } from '../../data/influencers';
import { Search, MapPin, Award, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export default function InfluencersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredInfluencers = influencers.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || i.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-neutral-light">
      <Navbar />

      <section className="pt-40 pb-20 px-4 relative overflow-hidden bg-neutral-black">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary blur-[150px] opacity-20 -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-dark blur-[120px] opacity-10"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-effect border border-white/10 mb-8"
          >
            <Zap size={16} className="text-primary-dark" />
            <span className="text-[10px] uppercase font-bold text-white tracking-widest">Growth Partners</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 text-white leading-tight font-display">
            Partner with <span className="text-primary">Verified</span> Creators
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
            Discover India&apos;s most influential voices. From fashion icons to tech reviewers, find the perfect talent to promote your brand.
          </p>

          <div className="max-w-3xl mx-auto relative">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-white/40" size={24} />
            <input 
              type="text" 
              placeholder="Search by name, category or niche..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-20 pr-8 py-6 rounded-[30px] bg-white/10 border border-white/10 backdrop-blur-xl outline-none focus:ring-2 ring-primary/50 text-white text-xl placeholder-white/30 shadow-2xl transition-all"
            />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-neutral-light flex items-center justify-center">
              <Award size={24} className="text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Vetted Creators</h4>
              <p className="text-xs text-neutral-gray">Quality checked accounts</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-neutral-light flex items-center justify-center">
              <MapPin size={24} className="text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Pan-India Reach</h4>
              <p className="text-xs text-neutral-gray">Target any region</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-neutral-light flex items-center justify-center">
              <Zap size={24} className="text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Instant Connect</h4>
              <p className="text-xs text-neutral-gray">Direct communication</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <h2 className="text-3xl font-bold text-neutral-black font-display">
            Featured Creators ({filteredInfluencers.length})
          </h2>
          <div className="flex gap-3">
             {["All", "Fashion", "Beauty", "Tech", "Fitness"].map(cat => (
               <button 
                key={cat} 
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-2xl border text-sm font-bold transition-all ${
                  selectedCategory === cat 
                    ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20 scale-105' 
                    : 'bg-white border-gray-100 text-neutral-black hover:border-primary shadow-sm'
                }`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredInfluencers.map((influencer) => (
            <InfluencerCard key={influencer.id} influencer={influencer} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
