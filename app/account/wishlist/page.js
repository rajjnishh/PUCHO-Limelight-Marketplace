'use client';

import React from 'react';
import { useWishlist } from '../../../context/WishlistContext';
import ProductCard from '../../../components/ProductCard';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <main className="min-h-screen bg-neutral-light pb-24">
      {/* Header */}
      <section className="bg-white pt-32 pb-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-neutral-gray hover:text-primary font-bold mb-8 transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Shop
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary">
              <Heart size={32} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-black text-neutral-black font-display tracking-tight">Your Wishlist</h1>
              <p className="text-neutral-gray mt-2 font-medium">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlist.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[40px] border border-gray-100 shadow-sm px-4">
            <div className="w-24 h-24 rounded-full bg-neutral-light flex items-center justify-center text-neutral-gray mx-auto mb-8">
              <Heart size={40} />
            </div>
            <h2 className="text-3xl font-black text-neutral-black mb-4 font-display">Your wishlist is empty</h2>
            <p className="text-neutral-gray max-w-md mx-auto mb-10 font-medium">
              Start adding your favorite products and they will appear here. Influencer styles are waiting for you!
            </p>
            <Link 
              href="/products" 
              className="inline-flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-2xl font-bold hover:bg-opacity-90 transition-all shadow-xl shadow-primary/20"
            >
              <ShoppingBag size={20} />
              Browse Collections
            </Link>
          </div>
        )}
      </section>

      {/* Recommended Section (Simplified) */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-black text-neutral-black mb-10 font-display">More to explore</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 opacity-40 grayscale pointer-events-none">
          {/* Placeholder for recommendations */}
          {[1,2,3,4].map(i => (
             <div key={i} className="bg-white p-4 rounded-[32px] border border-gray-100 h-64 flex items-center justify-center text-xs font-bold uppercase tracking-widest text-neutral-gray">
               Coming Soon
             </div>
          ))}
        </div>
      </section>
    </main>
  );
}
