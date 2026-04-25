'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

const CategoryPills = ({ active, onSelect }) => {
  const categories = ["All", "Fashion", "Electronics", "Beauty", "Home Decor", "Fitness", "Grocery (Food)", "Jewellery"];

  return (
    <div className="max-w-7xl mx-auto px-4 overflow-x-auto hide-scrollbar py-6 flex gap-3">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          suppressHydrationWarning
          onClick={() => onSelect(cat)}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${
            active === cat 
              ? 'border-primary shadow-lg scale-105 bg-primary text-white' 
              : 'bg-white border-gray-200 text-neutral-gray hover:border-primary hover:text-primary'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryPills;
