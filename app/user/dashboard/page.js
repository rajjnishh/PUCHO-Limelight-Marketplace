'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { 
  User, 
  Package, 
  Heart, 
  Settings, 
  MapPin, 
  CreditCard,
  ChevronRight,
  LogOut,
  ShoppingBag,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';

export default function UserDashboard() {
  const { user, profile, signOut } = useAuth();
  const { wishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState('orders');

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  // Mock orders for UI
  const mockOrders = [
    {
      id: 'ORD-8291',
      date: '24 April 2024',
      status: 'Delivered',
      total: 2499,
      items: [
        { name: 'Designer Summer Dress', image: 'https://picsum.photos/seed/dress/100/100' }
      ]
    },
    {
      id: 'ORD-7562',
      date: '12 April 2024',
      status: 'Shipped',
      total: 1250,
      items: [
        { name: 'Minimalist Watch', image: 'https://picsum.photos/seed/watch/100/100' }
      ]
    }
  ];

  const sidebarItems = [
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, count: wishlist.length },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard },
    { id: 'settings', label: 'Profile Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="lg:w-80 shrink-0">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-32">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary overflow-hidden relative border-2 border-primary/20">
                  {user?.photoURL ? (
                    <Image src={user.photoURL} alt="Profile" fill className="object-cover" />
                  ) : (
                    <User size={32} />
                  )}
                </div>
                <div>
                  <h2 className="font-black text-neutral-black leading-tight">
                    {profile?.displayName || user?.displayName || user?.email?.split('@')[0]}
                  </h2>
                  <p className="text-xs font-bold text-neutral-gray uppercase tracking-wider mt-1">{profile?.role || 'Shopper'}</p>
                </div>
              </div>

              <nav className="space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all font-bold ${
                      activeTab === item.id 
                        ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]' 
                        : 'text-neutral-gray hover:bg-gray-50 hover:text-neutral-black'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </div>
                    {item.count > 0 && activeTab !== item.id && (
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] flex items-center justify-center">
                        {item.count}
                      </span>
                    )}
                    <ChevronRight size={16} className={activeTab === item.id ? 'opacity-100' : 'opacity-40'} />
                  </button>
                ))}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl text-red-500 hover:bg-red-50 font-bold transition-all mt-6"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 min-h-[600px]">
              {activeTab === 'orders' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-black text-neutral-black">Order History</h1>
                    <Link href="/products" className="text-sm font-bold text-primary hover:underline flex items-center gap-2">
                      <ShoppingBag size={16} />
                      Browse More
                    </Link>
                  </div>

                  {mockOrders.length > 0 ? (
                    <div className="space-y-6">
                      {mockOrders.map((order) => (
                        <div key={order.id} className="border border-gray-100 rounded-3xl p-6 hover:shadow-md transition-all group">
                          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-4">
                              <div className="p-3 bg-gray-100 rounded-2xl text-neutral-black group-hover:bg-primary group-hover:text-white transition-colors">
                                <Package size={24} />
                              </div>
                              <div>
                                <span className="block font-black text-neutral-black">{order.id}</span>
                                <span className="text-xs font-bold text-neutral-gray">{order.date}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-6">
                              <div className="text-right">
                                <span className="block text-xs font-bold text-neutral-gray uppercase tracking-widest mb-1">Total Amount</span>
                                <span className="font-black text-neutral-black">₹{order.total.toLocaleString('en-IN')}</span>
                              </div>
                              <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                                order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                              }`}>
                                {order.status === 'Delivered' ? (
                                  <span className="flex items-center gap-1.5"><CheckCircle2 size={12} /> Delivered</span>
                                ) : (
                                  <span className="flex items-center gap-1.5"><Clock size={12} /> {order.status}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-4">
                                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                                </div>
                                <span className="text-sm font-bold text-neutral-black">{item.name}</span>
                              </div>
                            ))}
                            <button className="ml-auto p-2 hover:bg-gray-50 rounded-xl transition-all">
                              <ChevronRight size={20} className="text-neutral-gray" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                      <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-4 text-neutral-gray">
                        <ShoppingBag size={28} />
                      </div>
                      <h3 className="font-black text-neutral-black mb-2">No orders yet</h3>
                      <p className="text-neutral-gray mb-8">Start your shopping journey today!</p>
                      <Link href="/products" className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-black shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95">
                        Shop Now
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'wishlist' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-black text-neutral-black">My Wishlist</h1>
                    <span className="text-xs font-black uppercase tracking-widest text-[#FF2E63] bg-pink-50 px-3 py-1 rounded-lg">
                      {wishlist.length} Items
                    </span>
                  </div>

                  {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {wishlist.map((item) => (
                        <div key={item.id} className="group relative bg-white border border-gray-100 rounded-3xl p-4 transition-all hover:shadow-xl">
                          <div className="flex gap-4">
                            <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 shrink-0">
                              <Image src={item.image} alt={item.name} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-black text-neutral-black mb-1 line-clamp-1">{item.name}</h3>
                              <p className="text-xs font-bold text-neutral-gray mb-3">{item.category}</p>
                              <div className="flex items-center justify-between">
                                <span className="font-black text-primary">₹{item.price.toLocaleString('en-IN')}</span>
                                <Link 
                                  href={`/products/${item.slug}`}
                                  className="p-2 bg-gray-50 text-neutral-black hover:bg-neutral-black hover:text-white rounded-xl transition-all"
                                >
                                  <ShoppingBag size={16} />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                      <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-4 text-[#FF2E63]">
                        <Heart size={28} />
                      </div>
                      <h3 className="font-black text-neutral-black mb-2">Wishlist is empty</h3>
                      <p className="text-neutral-gray mb-8">Save items you love to see them here.</p>
                      <Link href="/products" className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-black shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95">
                        Discover Products
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'addresses' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h1 className="text-2xl font-black text-neutral-black mb-8">Saved Addresses</h1>
                  <button className="w-full py-10 border-2 border-dashed border-gray-200 rounded-3xl text-neutral-gray hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-3 font-bold group">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center group-hover:shadow-md transition-all">
                      <MapPin size={24} />
                    </div>
                    Add New Address
                  </button>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h1 className="text-2xl font-black text-neutral-black mb-8">Profile Settings</h1>
                  <div className="space-y-6 max-w-xl">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-gray ml-1">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue={profile?.displayName || user?.displayName}
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 ring-primary/20 font-bold text-neutral-black"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-gray ml-1">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue={user?.email}
                        disabled
                        className="w-full px-6 py-4 rounded-2xl bg-gray-100 border border-transparent outline-none font-bold text-neutral-gray cursor-not-allowed"
                      />
                    </div>
                    <button className="px-10 py-4 bg-neutral-black text-white rounded-full font-black shadow-xl hover:-translate-y-1 transition-all active:scale-95">
                      Save Changes
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
