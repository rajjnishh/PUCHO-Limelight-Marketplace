'use client';

import React, { useState } from 'react';
import { Search, Package, MapPin, Clock, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

const mockTrackingData = {
  "ODR-123456": {
    status: "In Transit",
    currentLocation: "New Delhi Sorting Center",
    estimatedDelivery: "28 April 2026",
    history: [
      { status: "Order Placed", location: "Bangalore", time: "24 April 2026, 10:30 AM", completed: true },
      { status: "Packed & Ready", location: "Bangalore Warehouse", time: "24 April 2026, 04:15 PM", completed: true },
      { status: "Shipped", location: "Bangalore", time: "25 April 2026, 09:00 AM", completed: true },
      { status: "In Transit", location: "Mumbai Hub", time: "25 April 2026, 11:45 PM", completed: true },
      { status: "In Transit", location: "New Delhi Sorting Center", time: "26 April 2026, 08:30 PM", completed: false },
    ]
  },
  "ODR-789012": {
    status: "Delivered",
    currentLocation: "Hyderabad",
    estimatedDelivery: "Delivered on 25 April 2026",
    history: [
      { status: "Order Placed", location: "Mumbai", time: "22 April 2026, 11:00 AM", completed: true },
      { status: "Shipped", location: "Mumbai", time: "23 April 2026, 10:00 AM", completed: true },
      { status: "Out for Delivery", location: "Hyderabad", time: "25 April 2026, 09:30 AM", completed: true },
      { status: "Delivered", location: "Hyderabad", time: "25 April 2026, 02:20 PM", completed: true },
    ]
  }
};

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = useState('');
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      const data = mockTrackingData[orderId.toUpperCase()] || mockTrackingData[`ODR-${orderId.toUpperCase()}`];
      if (data) {
        setTrackingInfo(data);
      } else {
        setError('Order ID not found. Please check and try again.');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-neutral-light pb-24">
      {/* Header */}
      <section className="bg-white pt-32 pb-16 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-neutral-gray hover:text-primary font-bold mb-8 transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="w-20 h-20 rounded-[32px] bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
            <Package size={40} />
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-neutral-black font-display tracking-tight mb-4">Track Your Order</h1>
          <p className="text-neutral-gray text-lg max-w-lg mx-auto font-medium">
            Enter your order ID to see the status of your influencer-style picks.
          </p>

          <form onSubmit={handleTrack} className="mt-12 max-w-lg mx-auto relative group">
            <div className="absolute inset-y-0 left-6 flex items-center text-neutral-gray group-focus-within:text-primary transition-colors">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Enter Order ID (e.g. ODR-123456)" 
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full h-16 pl-14 pr-32 rounded-2xl bg-neutral-light border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none text-neutral-black font-bold placeholder:text-neutral-gray"
            />
            <button 
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 bg-primary text-white px-6 rounded-xl font-bold hover:bg-opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? 'Tracking...' : 'Track'}
            </button>
          </form>
          {error && <p className="mt-4 text-primary font-bold text-sm">{error}</p>}
        </div>
      </section>

      {/* Results */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <AnimatePresence mode="wait">
          {trackingInfo ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[40px] border border-gray-100 shadow-2xl shadow-primary/5 p-8 lg:p-12"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pb-12 border-b border-gray-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-gray mb-1 block">Current Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-accent-orange animate-pulse" />
                    <h2 className="text-3xl font-black text-neutral-black font-display">{trackingInfo.status}</h2>
                  </div>
                </div>
                <div className="md:text-right">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-gray mb-1 block">Estimated Delivery</span>
                  <span className="text-2xl font-black text-primary font-display">{trackingInfo.estimatedDelivery}</span>
                </div>
              </div>

              <div className="space-y-12 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-[2px] before:bg-gray-100">
                {trackingInfo.history.map((item, idx) => (
                  <div key={idx} className="relative pl-12">
                    {/* Circle */}
                    <div className={`absolute left-0 top-1 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center transition-all ${item.completed ? 'bg-primary text-white' : 'bg-gray-100 text-neutral-gray'}`}>
                      {item.completed ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div>
                        <h3 className={`font-black text-lg ${item.completed ? 'text-neutral-black' : 'text-neutral-gray'}`}>{item.status}</h3>
                        <div className="flex items-center gap-2 text-neutral-gray mt-1 font-medium">
                          <MapPin size={14} />
                          <span>{item.location}</span>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-neutral-gray bg-neutral-light px-3 py-1 rounded-lg">
                        {item.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-lg font-black text-neutral-black mb-2">Need help with your order?</h4>
                  <p className="text-neutral-gray font-medium">Our support team is available 24/7 to assist you with any delivery issues.</p>
                </div>
                <button className="whitespace-nowrap bg-neutral-black text-white px-8 py-4 rounded-2xl font-bold hover:bg-opacity-90 transition-all">
                  Chat with Support
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 opacity-50 grayscale"
            >
              <div className="max-w-xs mx-auto">
                 <Package size={120} strokeWidth={1} className="mx-auto mb-6 text-neutral-gray" />
                 <p className="font-bold text-neutral-gray">Your order journey will appear here once you enter a valid ID.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
