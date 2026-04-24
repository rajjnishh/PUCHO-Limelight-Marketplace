'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import CategoryPills from '../../components/CategoryPills';
import { products } from '../../data/products';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-neutral-light">
      <Navbar />

      <section className="pt-32 pb-12 px-4 shadow-sm bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-neutral-black font-display">
            Explore Marketplace
          </h1>
          
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="relative w-full lg:flex-grow">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-gray" size={20} />
              <input 
                type="text" 
                placeholder="Search for products, creators or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-5 rounded-[20px] bg-neutral-light border-none outline-none focus:ring-2 ring-primary/20 text-lg shadow-inner"
              />
            </div>
            
            {/* Filter Buttons */}
            <div className="flex gap-4 w-full lg:w-auto">
              <button 
                className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-5 rounded-[20px] bg-white border border-gray-100 font-bold transition-all hover:bg-gray-50 shadow-sm"
              >
                <SlidersHorizontal size={20} className="text-primary" />
                Filters
              </button>
              <div className="relative flex-1 lg:flex-none">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none px-10 py-5 rounded-[20px] bg-white border border-gray-100 font-bold outline-none cursor-pointer pr-12 shadow-sm text-neutral-black"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">New Arrivals</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" size={20} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b border-gray-100 sticky top-[72px] z-30">
        <CategoryPills />
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <span className="text-neutral-gray font-medium">Showing {filteredProducts.length} results</span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={40} className="text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-neutral-black font-display">No products found</h3>
            <p className="text-neutral-gray">Try adjusting your search or filters to find what you&apos;re looking for.</p>
            <button 
              onClick={() => {setSearchTerm(''); setSortBy('popular');}}
              className="mt-8 font-bold text-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
