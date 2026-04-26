'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import CategoryPills from '../../components/CategoryPills';
import { products } from '../../data/products';
import { Search, SlidersHorizontal, ChevronDown, Tag } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const tagFilter = searchParams.get('tag');
  
  const [searchTerm, setSearchTerm] = useState(tagFilter ? `#${tagFilter}` : '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    if (tagFilter) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchTerm(`#${tagFilter}`);
    }
  }, [tagFilter]);
  
  const filteredProducts = products
    .filter(p => {
      const searchLower = searchTerm.toLowerCase();
      const actualSearch = searchLower.startsWith('#') ? searchLower.slice(1) : searchLower;
      const isTagSearch = searchLower.startsWith('#');

      const matchesSearch = isTagSearch 
        ? p.tags?.some(t => t.toLowerCase().includes(actualSearch)) || p.category.toLowerCase().includes(actualSearch)
        : p.name.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower) ||
          p.influencer.name.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower) ||
          p.tags?.some(t => t.toLowerCase().includes(searchLower));
      
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      if (sortBy === 'newest') return b.id - a.id;
      return b.rating - a.rating; // default popular
    });

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
                  <option value="newest">Newest Arrivals</option>
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
        <CategoryPills active={selectedCategory} onSelect={setSelectedCategory} />
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
              onClick={() => {setSearchTerm(''); setSelectedCategory('All'); setSortBy('popular');}}
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
