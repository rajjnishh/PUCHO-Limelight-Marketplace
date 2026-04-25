'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Star, ShoppingCart, Link as LinkIcon, Heart } from 'lucide-react';
import { motion } from 'motion/react';

const ProductCard = ({ product, showAffiliateAction = false }) => {
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const checkWishlist = () => {
      const list = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setIsWishlisted(list.includes(product.slug));
    };
    checkWishlist();
    window.addEventListener('wishlistChange', checkWishlist);
    window.addEventListener('storage', checkWishlist);
    return () => {
      window.removeEventListener('wishlistChange', checkWishlist);
      window.removeEventListener('storage', checkWishlist);
    };
  }, [product.slug]);

  const handleCopyLink = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const link = `${window.location.origin}/products/${product.slug}?ref=user_handle`;
    navigator.clipboard.writeText(link);
    alert('Affiliate link copied!');
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let list = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (list.includes(product.slug)) {
      list = list.filter(slug => slug !== product.slug);
      setIsWishlisted(false);
    } else {
      list.push(product.slug);
      setIsWishlisted(true);
    }
    localStorage.setItem('wishlist', JSON.stringify(list));
    window.dispatchEvent(new Event('wishlistChange'));
  };

  const handleCardClick = () => {
    router.push(`/products/${product.slug}`);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onClick={handleCardClick}
      className="group bg-white rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(255,47,109,0.06)] border border-gray-100/50 flex flex-col h-full cursor-pointer transition-all relative"
    >
      <div className="flex flex-col h-full">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image 
            src={product.image} 
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          {/* Category Tag */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md bg-black/30 text-white border border-white/20">
              {product.category}
            </span>
          </div>
          
          {/* Wishlist Button */}
          <button 
            type="button"
            suppressHydrationWarning
            onClick={handleWishlistClick}
            className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all active:scale-95 z-10 ${
              isWishlisted 
                ? 'bg-white text-primary shadow-md' 
                : 'bg-black/20 text-white hover:bg-black/40'
            }`}
            title="Wishlist"
          >
            <Heart size={18} className="transition-all" fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2 text-neutral-black font-display">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 shrink-0">
              <Star size={14} fill="#FFC107" color="#FFC107" />
              <span className="text-xs font-bold text-neutral-black">{product.rating}</span>
            </div>
          </div>

          <p className="text-sm line-clamp-2 mb-6 flex-grow text-neutral-gray">
            {product.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-col">
              <span className="text-xs font-medium uppercase tracking-wider opacity-50 text-neutral-gray">Price</span>
              <span className="text-2xl font-black text-neutral-black">₹{product.price.toLocaleString('en-IN')}</span>
            </div>
            
            <div className="flex gap-2">
              {showAffiliateAction ? (
                <button 
                  type="button"
                  onClick={handleCopyLink}
                  className="p-4 rounded-2xl transition-all shadow-lg active:scale-90 text-primary bg-primary/10 hover:bg-primary hover:text-white"
                  title="Copy Affiliate Link"
                >
                  <LinkIcon size={20} />
                </button>
              ) : (
                <div className="p-4 rounded-2xl transition-all shadow-lg active:scale-90 text-white bg-linear-to-br from-primary to-primary-dark">
                  <ShoppingCart size={20} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
