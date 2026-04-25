'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import dynamic from 'next/dynamic';

const HeroSection = dynamic(() => import('../components/HeroSection'), { ssr: false });
import CategoryPills from '../components/CategoryPills';
import ProductCard from '../components/ProductCard';
import InfluencerCard from '../components/InfluencerCard';
import EarningsTicker from '../components/EarningsTicker';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import { products } from '../data/products';
import { influencers } from '../data/influencers';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  React.useEffect(() => {
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

  const filteringProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const trendingProducts = filteringProducts.slice(0, 8);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <HeroSection />

      {/* Category Selection */}
      <section className="py-10 bg-white border-y border-gray-100">
        <CategoryPills active={activeCategory} onSelect={setActiveCategory} />
      </section>

      {/* Trending Products */}
      <section className="py-24 px-4 container mx-auto max-w-7xl">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-neutral-black font-display">
              Trending Now
            </h2>
            <p className="text-neutral-gray">Hottest products promoted by top creators today.</p>
          </div>
          <Link 
            href="/products" 
            className="hidden md:flex items-center gap-2 font-bold transition-all hover:gap-3 text-primary"
          >
            Explore all <span className="text-xl">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-12 md:hidden">
          <Link 
            href="/products" 
            className="flex items-center justify-center gap-2 p-4 w-full rounded-2xl bg-white border border-gray-200 font-bold text-neutral-black"
          >
            Explore all products
          </Link>
        </div>
      </section>

      <EarningsTicker />

      {/* Top Influencers */}
      <section className="py-24 px-4 bg-neutral-light">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-neutral-black font-display">
                Top <span className="text-primary">Influencers</span>
              </h2>
              <p className="text-neutral-gray text-lg">
                Meet the creators who are redefining modern shopping through authenticity and style.
              </p>
            </div>
            <Link 
              href="/influencers" 
              className="px-8 py-4 rounded-2xl bg-white shadow-xl shadow-primary/5 font-bold transition-all hover:-translate-y-1 active:scale-95 text-neutral-black"
            >
              Partner with creators
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {influencers.map((influencer) => (
              <InfluencerCard key={influencer.id} influencer={influencer} />
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />

      <Testimonials />

      {/* Final CTA */}
      <section className="py-32 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto rounded-[48px] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl bg-linear-to-br from-primary to-primary-dark"
        >
          {/* Decorative Blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight font-display">
              Ready to grow your brand <br className="hidden md:block" /> with experts?
            </h2>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12">
              Join India&apos;s fastest growing social commerce ecosystem. Whether you&apos;re a brand or a creator, we have the tools you need.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href={isLoggedIn ? "/influencer/dashboard" : "/login"} 
                className="px-10 py-5 bg-white rounded-2xl font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-2xl text-primary"
              >
                {isLoggedIn ? "Go to Dashboard" : "Join the Hub"}
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
