'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { products } from '../../data/products';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { ...products[0], quantity: 1 },
    { ...products[1], quantity: 1 }
  ]);

  const [shippingMethod, setShippingMethod] = useState('standard');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateAddress = () => {
    const newErrors = {};
    Object.keys(address).forEach(key => {
      if (!address[key].trim()) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = () => {
    if (validateAddress()) {
      alert('Proceeding to checkout...');
      // In a real app, this would redirect to a payment gateway
    }
  };

  const updateQuantity = (id, delta) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  const shippingCosts = {
    standard: subtotal > 1000 ? 0 : 150,
    express: 500
  };
  
  const shipping = shippingCosts[shippingMethod];
  const gst = subtotal * 0.18;
  const total = subtotal + shipping + gst;

  const getEstimatedDelivery = (method) => {
    const today = new Date();
    const formatDate = (date) => {
      return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' });
    };

    if (method === 'standard') {
      const minDate = new Date(today);
      minDate.setDate(today.getDate() + 3);
      const maxDate = new Date(today);
      maxDate.setDate(today.getDate() + 5);
      return `${formatDate(minDate)} - ${formatDate(maxDate)}`;
    } else if (method === 'express') {
      const minDate = new Date(today);
      minDate.setDate(today.getDate() + 1);
      const maxDate = new Date(today);
      maxDate.setDate(today.getDate() + 2);
      return `${formatDate(minDate)} - ${formatDate(maxDate)}`;
    }
    return '';
  };

  return (
    <main className="min-h-screen bg-neutral-light">
      <Navbar />

      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 text-neutral-black font-display">
              Your Bag
            </h1>
            <p className="text-neutral-gray font-medium">Review your items and checkout securely.</p>
          </div>
          <Link href="/products" className="text-primary font-bold hover:underline mb-2">Continue Shopping →</Link>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-8 group"
                  >
                    <div className="relative w-32 h-32 rounded-2xl overflow-hidden shrink-0 bg-gray-50">
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-grow text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1 text-neutral-black font-display">{item.name}</h3>
                          <p className="text-xs font-bold text-primary uppercase tracking-widest">{item.category}</p>
                        </div>
                        <span className="text-2xl font-black sm:mt-0 mt-4 text-neutral-black">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center bg-neutral-light p-1.5 rounded-2xl border border-gray-50">
                           <button 
                             onClick={() => updateQuantity(item.id, -1)}
                             className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm hover:text-primary transition-colors text-neutral-black"
                           >
                             <Minus size={16} />
                           </button>
                           <span className="w-12 text-center font-bold text-neutral-black">{item.quantity}</span>
                           <button 
                             onClick={() => updateQuantity(item.id, 1)}
                             className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm hover:text-primary transition-colors text-neutral-black"
                           >
                             <Plus size={16} />
                           </button>
                        </div>

                        <button 
                          onClick={() => removeItem(item.id)}
                          className="flex items-center gap-2 text-neutral-gray hover:text-red-500 font-bold text-sm"
                        >
                          <Trash2 size={18} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Delivery Address Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 mt-12"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                    <ShoppingBag size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-black font-display text-nowrap">Delivery Address</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-neutral-gray mb-2 ml-1">Street Address</label>
                    <input 
                      type="text" 
                      name="street"
                      value={address.street}
                      onChange={handleInputChange}
                      placeholder="123 Influencer Way"
                      className={`w-full p-4 rounded-2xl bg-neutral-light border-2 outline-hidden focus:bg-white transition-all ${errors.street ? 'border-red-500' : 'border-transparent focus:border-primary'}`}
                    />
                    {errors.street && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.street}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-neutral-gray mb-2 ml-1">City</label>
                    <input 
                      type="text" 
                      name="city"
                      value={address.city}
                      onChange={handleInputChange}
                      placeholder="Mumbai"
                      className={`w-full p-4 rounded-2xl bg-neutral-light border-2 outline-hidden focus:bg-white transition-all ${errors.city ? 'border-red-500' : 'border-transparent focus:border-primary'}`}
                    />
                    {errors.city && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-neutral-gray mb-2 ml-1">State</label>
                    <input 
                      type="text" 
                      name="state"
                      value={address.state}
                      onChange={handleInputChange}
                      placeholder="Maharashtra"
                      className={`w-full p-4 rounded-2xl bg-neutral-light border-2 outline-hidden focus:bg-white transition-all ${errors.state ? 'border-red-500' : 'border-transparent focus:border-primary'}`}
                    />
                    {errors.state && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.state}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-neutral-gray mb-2 ml-1">Postal Code</label>
                    <input 
                      type="text" 
                      name="postalCode"
                      value={address.postalCode}
                      onChange={handleInputChange}
                      placeholder="400001"
                      className={`w-full p-4 rounded-2xl bg-neutral-light border-2 outline-hidden focus:bg-white transition-all ${errors.postalCode ? 'border-red-500' : 'border-transparent focus:border-primary'}`}
                    />
                    {errors.postalCode && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.postalCode}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-neutral-gray mb-2 ml-1">Country</label>
                    <input 
                      type="text" 
                      name="country"
                      value={address.country}
                      onChange={handleInputChange}
                      placeholder="India"
                      className={`w-full p-4 rounded-2xl bg-neutral-light border-2 outline-hidden focus:bg-white transition-all ${errors.country ? 'border-red-500' : 'border-transparent focus:border-primary'}`}
                    />
                    {errors.country && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.country}</p>}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-primary/5 border border-gray-100 sticky top-32">
                <h3 className="text-2xl font-bold mb-8 text-neutral-black font-display">Order Summary</h3>
                
                <div className="mb-10">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-gray mb-4 block">Shipping Speed</span>
                  <div className="space-y-4">
                    <button 
                      onClick={() => setShippingMethod('standard')}
                      className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between group ${shippingMethod === 'standard' ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}
                    >
                      <div className="flex flex-col items-start">
                        <span className={`font-bold transition-colors ${shippingMethod === 'standard' ? 'text-primary' : 'text-neutral-black'}`}>Standard Delivery</span>
                        <span className="text-xs text-neutral-gray">3-5 Business Days</span>
                      </div>
                      <span className="font-black text-neutral-black">
                        {subtotal > 1000 ? "FREE" : "₹150"}
                      </span>
                    </button>

                    <button 
                      onClick={() => setShippingMethod('express')}
                      className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between group ${shippingMethod === 'express' ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}
                    >
                      <div className="flex flex-col items-start">
                        <span className={`font-bold transition-colors ${shippingMethod === 'express' ? 'text-primary' : 'text-neutral-black'}`}>Express Delivery</span>
                        <span className="text-xs text-neutral-gray">1-2 Business Days</span>
                      </div>
                      <span className="font-black text-neutral-black">₹500</span>
                    </button>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-8 p-6 bg-accent/5 rounded-3xl border border-accent/10 overflow-hidden"
                  >
                    <div className="flex items-center gap-3 mb-2 text-accent">
                      <Truck size={18} fill="currentColor" className="opacity-20" />
                      <Truck size={18} className="absolute" />
                      <h4 className="font-bold ml-2">Estimated Delivery</h4>
                    </div>
                    <div className="flex justify-between items-end">
                      <p className="text-lg font-black text-neutral-black font-display">
                        {getEstimatedDelivery(shippingMethod)}
                      </p>
                      <span className="text-[10px] font-bold text-neutral-gray uppercase tracking-widest bg-white px-2 py-1 rounded-lg border border-gray-100">
                        {shippingMethod === 'standard' ? '3-5 Days' : '1-2 Days'}
                      </span>
                    </div>
                  </motion.div>
                </div>

                <div className="space-y-6 mb-10 pb-10 border-b border-gray-100">
                  <div className="flex justify-between items-center text-neutral-gray">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-bold text-neutral-black">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-gray">
                    <span className="font-medium">Shipping Fee</span>
                    <span className="font-bold text-accent">
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-gray">
                    <span className="font-medium">GST (18%)</span>
                    <span className="font-bold text-neutral-black">₹{gst.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-12">
                   <div>
                     <span className="text-xs font-bold uppercase tracking-widest text-neutral-gray mb-2 block">Total Amount</span>
                     <span className="text-4xl font-black text-neutral-black">₹{total.toLocaleString('en-IN')}</span>
                   </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full py-6 rounded-3xl font-black text-xl transition-all hover:-translate-y-1 active:scale-95 shadow-2xl flex items-center justify-center gap-3 text-white bg-linear-to-br from-primary to-primary-dark"
                >
                  Checkout Now
                  <ArrowRight size={24} />
                </button>

                <div className="mt-8 flex items-center justify-center gap-2 text-xs font-bold text-accent uppercase tracking-widest">
                  <ShieldCheck size={16} />
                  Secure Transaction Guaranteed
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-40 text-center bg-white rounded-[48px] shadow-sm border border-gray-100">
            <div className="w-24 h-24 bg-neutral-light rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag size={40} className="text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-neutral-black font-display">Your bag is empty</h2>
            <p className="text-neutral-gray mb-12">Looks like you haven&apos;t added anything to your cart yet.</p>
            <Link 
              href="/products"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold shadow-xl text-white bg-linear-to-br from-primary to-primary-dark"
            >
              Start Shopping
              <ArrowRight size={20} />
            </Link>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
