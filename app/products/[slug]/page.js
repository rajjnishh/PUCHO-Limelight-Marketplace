'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ProductCard from '../../../components/ProductCard';
import { products } from '../../../data/products';
import Image from 'next/image';
import { Star, ShieldCheck, Truck, RefreshCcw, ShoppingBag, Heart, Share2, Plus, Minus, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');
  
  const product = products.find(p => p.slug === slug) || products[0];
  const [quantity, setQuantity] = useState(1);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [sortOrder, setSortOrder] = useState('helpful');
  const [mockReviews, setMockReviews] = useState([]);

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
    // Tracking Wishlist Status
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

  useEffect(() => {
    // Tracking Recently Viewed Products
    const storedSlugs = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    const updatedSlugs = storedSlugs.filter(s => s !== product.slug);
    
    updatedSlugs.unshift(product.slug);
    // Limit history to 6 products
    const finalSlugs = updatedSlugs.slice(0, 6);
    
    localStorage.setItem('recentlyViewed', JSON.stringify(finalSlugs));

    // Map slugs to product objects for display (excluding current product)
    const viewedProducts = finalSlugs
      .filter(s => s !== product.slug)
      .map(s => products.find(p => p.slug === s))
      .filter(Boolean);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecentlyViewed(viewedProducts);
  }, [product.slug]);

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  const handleWishlistClick = () => {
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
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative aspect-square rounded-[40px] overflow-hidden bg-gray-50 border border-gray-100 shadow-2xl"
            >
              <Image 
                src={product.image} 
                alt={product.name}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden border-2 border-transparent hover:border-primary cursor-pointer bg-gray-50 relative">
                  <Image 
                    src={`https://picsum.photos/seed/${product.slug}-${i}/200/200`} 
                    alt="gallery"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
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
                <span className="text-4xl font-black text-neutral-black">₹{product.price.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-accent-orange bg-accent-orange/10 px-3 py-1 rounded-lg mb-1">In Stock</span>
                <span className="text-xs text-neutral-gray font-medium">Free Delivery</span>
              </div>
            </div>

            {/* Influencer Card - Miniature */}
            <div className="mb-10 p-6 rounded-3xl border-2 border-primary/10 flex items-center justify-between group hover:border-primary/30 transition-all cursor-pointer">
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
                  <h4 className="font-bold text-lg text-neutral-black font-display">{product.influencer.name}</h4>
                </div>
              </div>
              <Link href={`/influencers/${product.influencer.handle}`} className="p-3 bg-white shadow-sm rounded-xl text-primary hover:bg-primary hover:text-white transition-colors">
                <Share2 size={20} />
              </Link>
            </div>

            <p className="text-neutral-gray leading-relaxed mb-10 text-lg">
              {product.description}
            </p>

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
                  onClick={handleWishlistClick}
                  className={`p-6 rounded-3xl border transition-colors ${
                    isWishlisted 
                      ? 'border-primary bg-primary/5 text-primary' 
                      : 'border-gray-200 hover:bg-gray-50 text-neutral-black'
                  }`}
                  title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <Heart size={24} className="transition-all" fill={isWishlisted ? "currentColor" : "none"} />
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
        <section className="py-24 px-4 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-neutral-black font-display">
              Recently Viewed
            </h2>
            <div className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
              {recentlyViewed.map(p => (
                <div key={p.id} className="min-w-[85vw] sm:min-w-[calc(50%-16px)] lg:min-w-[calc(25%-24px)] snap-start">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
