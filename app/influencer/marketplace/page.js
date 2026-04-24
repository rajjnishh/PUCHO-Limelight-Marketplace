'use client';

import React, { useState } from 'react';
import DashboardLayout from '../../../components/DashboardLayout';
import { products } from '../../../data/products';
import ProductCard from '../../../components/ProductCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

export default function InfluencerMarketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Fashion', 'Tech', 'Beauty', 'Home'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout type="influencer">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-neutral-black tracking-tight font-display mb-2">Marketplace</h1>
          <p className="text-neutral-gray font-medium">Select high-converting products to promote to your audience.</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-grow flex items-center gap-4 bg-white px-6 py-4 rounded-3xl border border-gray-100 shadow-sm">
            <Search size={20} className="text-neutral-gray" />
            <input 
              type="text" 
              placeholder="Search products by name or category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none w-full font-bold text-neutral-black"
            />
          </div>
          <div className="flex gap-2">
             <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-gray-100 rounded-3xl font-bold text-neutral-black shadow-sm">
                <SlidersHorizontal size={18} />
                Filters
             </button>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-3 mb-12 overflow-x-auto pb-4 hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-8 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all
                ${selectedCategory === cat 
                  ? 'bg-primary text-white shadow-xl shadow-primary/20' 
                  : 'bg-white text-neutral-gray border border-gray-100 hover:border-primary/20'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                showAffiliateAction={true} // Show the generate link button
              />
            ))}
          </div>
        ) : (
          <div className="py-40 text-center bg-white rounded-[48px] border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-neutral-black mb-2">No products found</h2>
            <p className="text-neutral-gray">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
