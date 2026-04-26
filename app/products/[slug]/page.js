'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ProductCard from '../../../components/ProductCard';
import { products } from '../../../data/products';
import Image from 'next/image';
import { Star, ShieldCheck, Truck, RefreshCcw, ShoppingBag, Heart, Share2, Plus, Minus, CheckCircle2, ChevronLeft, ChevronRight, ArrowRight, Copy, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');
  
  const product = products.find(p => p.slug === slug) || products[0];
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [sortOrder, setSortOrder] = useState('helpful');
  const [mockReviews, setMockReviews] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.variations?.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(product.variations?.sizes?.[0] || null);
  const [affiliateHandle, setAffiliateHandle] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const generateAffiliateLink = () => {
    if (!affiliateHandle.trim()) {
      alert('Please enter your influencer handle first.');
      return;
    }
    const baseUrl = window.location.origin + window.location.pathname;
    const link = `${baseUrl}?ref=${affiliateHandle.trim().replace('@', '')}`;
    setGeneratedLink(link);
    setCopied(false);
  };

  const copyLink = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const productImages = [
    selectedColor?.image || product.image,
    `https://picsum.photos/seed/${product.slug}-1/800/800`,
    `https://picsum.photos/seed/${product.slug}-2/800/800`,
    `https://picsum.photos/seed/${product.slug}-3/800/800`,
    `https://picsum.photos/seed/${product.slug}-4/800/800`,
  ];

  const currentPrice = product.price + (selectedColor?.priceModifier || 0);

  useEffect(() => {
    if (selectedColor?.image) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveImageIndex(0);
    }
  }, [selectedColor]);

  useEffect(() => {
    // Generate mock reviews for the product
    const generatedReviews = [
      {
        id: 1,
        author: "Rahul M.",
        rating: 5,
        date: "2024-01-10",
        title: "Absolutely fantastic!",
        text: "I absolutely love this! The quality is way better than I expected. The description provided by the influencer was spot on. Highly recommend.",
        helpful: 45,
      },
      {
        id: 2,
        author: "Sneha P.",
        rating: 4,
        date: "2024-02-15",
        title: "Good value for money",
        text: "Good product, exactly as described. Packaging could have been slightly better, but overall I am very satisfied with the purchase.",
        helpful: 12,
      },
      {
        id: 3,
        author: "Amit S.",
        rating: 5,
        date: "2024-04-02",
        title: "Exceeds expectations",
        text: "Been using this for a few weeks now and it's fantastic. Delivery was super fast and the product is 100% authentic.",
        helpful: 89,
      },
      {
        id: 4,
        author: "Neha J.",
        rating: 3,
        date: "2024-04-18",
        title: "Decent buy",
        text: "It's decent for the price. Not the absolute best in the market, but it definitely gets the job done. No major complaints.",
        helpful: 4,
      }
    ];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMockReviews(generatedReviews);
  }, []);

  const sortedReviews = [...mockReviews].sort((a, b) => {
    if (sortOrder === 'helpful') {
      return b.helpful - a.helpful;
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });

  useEffect(() => {
    // Tracking Recently Viewed Products
    try {
      const storedData = localStorage.getItem('recentlyViewed');
      const storedSlugs = storedData ? JSON.parse(storedData) : [];
      if (!Array.isArray(storedSlugs)) throw new Error("Invalid data");

      // Keep up to 20 products in history
      const updatedSlugs = [product.slug, ...storedSlugs.filter(s => s !== product.slug)].slice(0, 20);
      
      localStorage.setItem('recentlyViewed', JSON.stringify(updatedSlugs));

      // Map slugs to product objects for display (excluding current product)
      const viewedProducts = updatedSlugs
        .filter(s => s !== product.slug)
        .map(s => products.find(p => p.slug === s))
        .filter(Boolean)
        .slice(0, 10);

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRecentlyViewed(viewedProducts);
    } catch (error) {
      console.error('Error tracking recently viewed:', error);
      localStorage.setItem('recentlyViewed', JSON.stringify([product.slug]));
    }
  }, [product.slug]);

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  const handleShareClick = async () => {
    const shareData = {
      title: product.name,
      text: `Check out ${product.name} on Puchol Limelight!`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        {/* Affiliate Tracking Banner */}
        {ref && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 bg-primary/5 border border-primary/10 rounded-[32px] flex items-center justify-between sm:px-10"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center font-bold text-white uppercase shadow-lg shadow-primary/20">
                {ref[0]}
              </div>
              <div>
                <p className="text-sm font-bold text-primary">Promoted by @{ref}</p>
                <p className="text-[10px] uppercase font-black text-primary/40 tracking-widest">Partner-specific pricing applied</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-primary font-black text-[10px] uppercase tracking-[0.2em] bg-white px-4 py-2 rounded-full border border-primary/10">
              <CheckCircle2 size={16} />
              Verified Influencer
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Images */}
          <div className="space-y-6">
            <div className="relative group">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative aspect-square rounded-[40px] overflow-hidden bg-gray-50 border border-gray-100 shadow-2xl"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImageIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative w-full h-full"
                  >
                    <Image 
                      src={productImages[activeImageIndex]} 
                      alt={product.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Carousel Controls */}
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1))}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-gray-100 flex items-center justify-center text-neutral-black shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-white"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1))}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-gray-100 flex items-center justify-center text-neutral-black shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-white"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                  {productImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${idx === activeImageIndex ? 'w-8 bg-primary' : 'bg-white/50 backdrop-blur-sm'}`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-5 gap-4">
              {productImages.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImageIndex(i)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all bg-gray-50 relative ${activeImageIndex === i ? 'border-primary' : 'border-transparent hover:border-gray-300'}`}
                >
                  <Image 
                    src={img} 
                    alt={`gallery-${i}`}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-neutral-light text-primary border border-gray-100 inline-block mb-4">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-neutral-black font-display">
                {product.name}
              </h1>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={18} fill={s <= Math.round(product.rating) ? "#FFC107" : "none"} color={s <= Math.round(product.rating) ? "#FFC107" : "#E5E7EB"} />
                    ))}
                  </div>
                  <span className="font-bold text-sm text-neutral-black">{product.rating}</span>
                </div>
                <span className="text-neutral-gray text-sm font-medium border-l pl-6">{product.reviews} verified reviews</span>
              </div>
            </div>

            <div className="mb-10 p-6 rounded-3xl bg-neutral-light border border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-gray mb-1 block">Best Price</span>
                <span className="text-4xl font-black text-neutral-black">₹{currentPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-accent-orange bg-accent-orange/10 px-3 py-1 rounded-lg mb-1">In Stock</span>
                <span className="text-xs text-neutral-gray font-medium">Free Delivery</span>
              </div>
            </div>

            {/* Variations */}
            {product.variations && (
              <div className="space-y-8 mb-10">
                {product.variations.colors && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-neutral-gray">Color</span>
                      <span className="text-xs font-bold text-neutral-black">{selectedColor?.name}</span>
                    </div>
                    <div className="flex gap-4">
                      {product.variations.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color)}
                          className={`w-12 h-12 rounded-2xl border-4 transition-all flex items-center justify-center ${selectedColor?.name === color.name ? 'border-primary ring-4 ring-primary/10' : 'border-gray-100 hover:border-gray-200'}`}
                          title={color.name}
                        >
                          <div 
                            className="w-full h-full rounded-xl border border-black/5" 
                            style={{ backgroundColor: color.value }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.variations.sizes && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-neutral-gray">Size</span>
                      <span className="text-xs font-bold text-neutral-black">Guide</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {product.variations.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[64px] h-14 rounded-2xl border-2 font-bold transition-all ${selectedSize === size ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 bg-white text-neutral-black hover:border-gray-200'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Influencer Card - Miniature */}
            <Link 
              href={`/influencers/${product.influencer.handle}`}
              className="mb-10 p-6 rounded-3xl border-2 border-primary/10 flex items-center justify-between group hover:border-primary/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform">
                  <Image 
                    src={product.influencer.image} 
                    alt={product.influencer.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-primary">Recommended by</p>
                  <h4 className="font-bold text-lg text-neutral-black font-display group-hover:text-primary transition-colors">{product.influencer.name}</h4>
                </div>
              </div>
              <div className="p-3 bg-white shadow-sm rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <ArrowRight size={20} />
              </div>
            </Link>

            <p className="text-neutral-gray leading-relaxed mb-6 text-lg">
              {product.description}
            </p>

            {/* Tags Section */}
            {product.tags && (
              <div className="flex flex-wrap gap-2 mb-10">
                {product.tags.map(tag => (
                  <Link 
                    key={tag} 
                    href={`/products?tag=${tag}`}
                    className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-gray-50 text-neutral-gray border border-gray-100 hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center bg-neutral-light rounded-2xl p-2 border border-gray-100">
                  <button 
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-white shadow-sm hover:text-primary transition-colors"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="w-16 text-center font-bold text-xl">{quantity}</span>
                  <button 
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-white shadow-sm hover:text-primary transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <button type="button" className="flex-grow group py-5 px-8 rounded-3xl font-bold flex items-center justify-center gap-4 shadow-2xl transition-all hover:-translate-y-1 active:scale-95 text-white bg-linear-to-br from-primary to-primary-dark">
                  <ShoppingBag size={24} />
                  Add to Cart
                </button>
                <button 
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`p-6 rounded-3xl border transition-all active:scale-95 ${
                    isInWishlist(product.id) 
                      ? 'border-primary bg-primary/5 text-primary shadow-lg shadow-primary/10' 
                      : 'border-gray-200 hover:bg-gray-50 text-neutral-black'
                  }`}
                  title={isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <Heart size={24} className="transition-all" fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                </button>
                <button 
                  type="button"
                  onClick={handleShareClick}
                  className="p-6 rounded-3xl border border-gray-200 hover:bg-gray-50 text-neutral-black transition-colors"
                  title="Share this Product"
                >
                  <Share2 size={24} />
                </button>
              </div>

              {/* Affiliate Link Generator */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 rounded-[32px] bg-neutral-black text-white overflow-hidden relative"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-white/10 rounded-xl">
                      <LinkIcon size={20} className="text-primary" />
                    </div>
                    <h4 className="text-xl font-bold font-display">Affiliate Link Generator</h4>
                  </div>
                  
                  <p className="text-white/60 text-xs mb-6 leading-relaxed">
                    Influencers: Generate your unique link and earn <span className="text-primary font-bold">{product.commission || 15}% commission</span> on every sale.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-grow">
                      <input 
                        type="text" 
                        value={affiliateHandle}
                        onChange={(e) => setAffiliateHandle(e.target.value)}
                        placeholder="@yourhandle"
                        className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm font-bold outline-none focus:border-primary transition-all placeholder:text-white/20"
                      />
                    </div>
                    <button 
                      onClick={generateAffiliateLink}
                      className="px-6 py-4 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95"
                    >
                      Generate Link
                    </button>
                  </div>

                  {generatedLink && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-6 pt-6 border-t border-white/10"
                    >
                      <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                        <input 
                          type="text" 
                          readOnly 
                          value={generatedLink}
                          className="flex-grow bg-transparent text-[10px] font-mono text-white/40 outline-none"
                        />
                        <button 
                          onClick={copyLink}
                          className="flex items-center gap-2 p-2 bg-white text-neutral-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm"
                        >
                          {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                          {copied ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Decorative background circle */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
              </motion.div>

              {/* Guarantees */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <ShieldCheck size={20} className="text-accent" />
                  </div>
                  <span className="text-xs font-bold text-neutral-black">1 Year Warranty</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Truck size={20} className="text-accent" />
                  </div>
                  <span className="text-xs font-bold text-neutral-black">Free Express Shipping</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <RefreshCcw size={20} className="text-accent" />
                  </div>
                  <span className="text-xs font-bold text-neutral-black">7-Day Easy Return</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-neutral-black font-display mb-2">
                Customer Reviews
              </h2>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={18} fill={s <= Math.round(product.rating) ? "#FFC107" : "none"} color={s <= Math.round(product.rating) ? "#FFC107" : "#E5E7EB"} />
                  ))}
                </div>
                <span className="font-bold text-neutral-black">{product.rating} out of 5</span>
                <span className="text-neutral-gray text-sm">({product.reviews} reviews)</span>
              </div>
            </div>
            
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-3 self-start md:self-auto">
              <label htmlFor="sortReviews" className="text-sm font-bold text-neutral-gray">Sort by:</label>
              <select 
                id="sortReviews"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-neutral-light border border-gray-200 text-neutral-black text-sm rounded-xl px-4 py-2 font-bold outline-none focus:border-primary cursor-pointer"
              >
                <option value="helpful">Most Helpful</option>
                <option value="recent">Most Recent</option>
              </select>
            </div>
          </div>

          <div className="space-y-8">
            {sortedReviews.map((review) => (
              <motion.div 
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-[32px] bg-neutral-light border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-lg text-neutral-black font-display">{review.author}</h4>
                    <span className="text-xs text-neutral-gray font-medium">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={14} fill={s <= review.rating ? "#FFC107" : "none"} color={s <= review.rating ? "#FFC107" : "#E5E7EB"} />
                    ))}
                  </div>
                </div>
                <h5 className="font-bold text-neutral-black mb-2">{review.title}</h5>
                <p className="text-neutral-gray leading-relaxed mb-6">
                  {review.text}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-neutral-gray">Was this review helpful?</span>
                  <button type="button" className="flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors">
                    Yes ({review.helpful})
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-24 px-4 bg-neutral-light">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-neutral-black font-display">
            Products you might like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Recently Viewed Products */}
      {recentlyViewed.length > 0 && (
        <section className="py-24 px-4 bg-white border-t border-gray-100 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-neutral-black font-display">
                Recently Viewed
              </h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    localStorage.removeItem('recentlyViewed');
                    setRecentlyViewed([]);
                  }}
                  className="text-[10px] font-black uppercase tracking-widest text-neutral-gray hover:text-red-500 transition-colors"
                >
                  Clear History
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
                {recentlyViewed.map((p, idx) => (
                  <motion.div 
                    key={p.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="min-w-[85vw] sm:min-w-[300px] lg:min-w-[280px] snap-start"
                  >
                    <ProductCard product={p} />
                  </motion.div>
                ))}
                {/* Spacer for overflow */}
                <div className="min-w-[1px] h-full" />
              </div>
              
              {/* Optional: Fade effect for scroll */}
              <div className="absolute top-0 right-0 bottom-8 w-20 bg-linear-to-r from-transparent to-white pointer-events-none hidden lg:block" />
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
