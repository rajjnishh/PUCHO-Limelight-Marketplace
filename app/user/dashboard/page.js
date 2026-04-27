'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { 
  User, 
  Package, 
  Heart, 
  Settings as SettingsIcon, 
  MapPin, 
  CreditCard,
  ChevronRight,
  LogOut,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Search,
  Filter,
  Trash2,
  Share2,
  ExternalLink,
  Users,
  Grid,
  Download,
  MessageSquare,
  Star,
  XCircle,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';

export default function UserDashboard() {
  const { user, profile, signOut } = useAuth();
  const { wishlist, removeFromWishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderFilter, setOrderFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [wishlistSort, setWishlistSort] = useState('latest');
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  // Enhanced mock data
  const mockOrders = [
    {
      id: 'ORD-7562',
      date: '24 April 2024',
      status: 'In Transit',
      total: 2499,
      item: {
        name: "Wireless Bluetooth Earbuds",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop",
        influencer: "Marques Brownlee",
        quantity: 1,
        price: 2499,
        slug: 'wireless-bluetooth-earbuds'
      },
      payment: 'UPI',
      history: [
        { status: 'Order Placed', date: '22 Apr, 2024 - 10:15 AM', location: 'System', completed: true },
        { status: 'Processed', date: '23 Apr, 2024 - 02:30 PM', location: 'Warehouse A', completed: true },
        { status: 'Shipped', date: '24 Apr, 2024 - 09:00 AM', location: 'Mumbai Hub', completed: true },
        { status: 'In Transit', date: 'Estimated: 25 Apr', location: 'Pune Logistics', completed: false, current: true },
        { status: 'Delivered', date: 'Expected: 26 Apr', location: 'Customer Location', completed: false },
      ]
    },
    {
      id: 'ORD-6214',
      date: '18 April 2024',
      status: 'Delivered',
      total: 999,
      item: {
        name: "Oversized Graphic T-Shirt",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop",
        influencer: "Komal Pandey",
        quantity: 1,
        price: 999,
        slug: 'oversized-graphic-t-shirt'
      },
      payment: 'Credit Card',
      history: [
        { status: 'Delivered', date: '20 Apr, 2024 - 11:45 AM', location: 'Customer Reception', completed: true },
      ]
    }
  ];

  const mockInfluencers = [
    { 
      id: 1, 
      name: "Komal Pandey", 
      handle: "komalpandey", 
      niche: "Fashion & Style", 
      followers: "1.2M", 
      productsCount: 45, 
      image: "https://picsum.photos/seed/komal/100/100",
      isNewProduct: true 
    },
    { 
      id: 2, 
      name: "Marques Brownlee", 
      handle: "mkbhd", 
      niche: "Tech & Gadgets", 
      followers: "18M", 
      productsCount: 120, 
      image: "https://picsum.photos/seed/mkbhd/100/100",
      isNewProduct: false 
    }
  ];

  const quickStats = [
    { label: 'Total Orders', value: '12', icon: Package, color: 'bg-blue-50 text-blue-600' },
    { label: 'Wishlist Items', value: wishlist.length.toString(), icon: Heart, color: 'bg-pink-50 text-[#FF2E63]' },
    { label: 'Wallet Balance', value: '₹2,450', icon: CreditCard, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Reward Points', value: '850', icon: Star, color: 'bg-amber-50 text-amber-600' },
  ];

  const activeOffers = [
    { title: 'Summer Special', code: 'SUMMER25', discount: '25% OFF', expiry: 'Ends in 2 days' },
  ];

  const sidebarItems = [
    { id: 'overview', label: 'Dashboard', icon: Grid },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, count: wishlist.length },
    { id: 'following', label: 'Following', icon: Users },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.item.name.toLowerCase().includes(searchQuery.toLowerCase()) || order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = orderFilter === 'all' || 
                        (orderFilter === 'active' && order.status === 'In Transit') ||
                        (orderFilter === 'delivered' && order.status === 'Delivered');
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-100 text-emerald-700';
      case 'In Transit': return 'bg-blue-100 text-blue-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <DashboardLayout type="user">
      <div className="max-w-[1400px] mx-auto pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Side Navigation */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded-[40px] p-6 shadow-sm border border-gray-100 sticky top-32">
              <div className="flex items-center gap-4 mb-10 px-4">
                <div className="w-14 h-14 rounded-2xl bg-neutral-black text-white flex items-center justify-center font-black text-xl shadow-xl shadow-black/10">
                  {profile?.displayName?.[0] || user?.displayName?.[0] || 'U'}
                </div>
                <div>
                  <h2 className="font-black text-neutral-black tracking-tight">{profile?.displayName || user?.displayName || 'User'}</h2>
                  <p className="text-[10px] font-bold text-neutral-gray uppercase tracking-widest">{profile?.accountType || 'Member'}</p>
                </div>
              </div>              <nav className="space-y-1 mb-10">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSearchQuery('');
                    }}
                    className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold transition-all ${
                      activeTab === item.id 
                        ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' 
                        : 'text-neutral-gray hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    {item.count > 0 && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        activeTab === item.id ? 'bg-white text-primary' : 'bg-gray-100 text-neutral-gray'
                      }`}>{item.count}</span>
                    )}
                  </button>
                ))}
              </nav>

              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
              >
                <LogOut size={18} />
                <span className="text-sm">Log Out</span>
              </button>
            </div>
          </aside>

          {/* Main Dashboard Panel */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-[48px] p-8 md:p-12 shadow-sm border border-gray-100 min-h-[700px]">
              {/* --- OVERVIEW TAB --- */}
              {activeTab === 'overview' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                  <div>
                    <h1 className="text-3xl font-black text-neutral-black tracking-tight font-display">
                      Hello, {profile?.displayName?.split(' ')[0] || 'User'}! 👋
                    </h1>
                    <p className="text-neutral-gray font-medium mt-1">Check your recent activity and saved picks.</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickStats.map((stat, idx) => (
                      <div key={idx} className="p-6 rounded-[32px] bg-neutral-light border border-gray-100">
                        <div className={`p-3 rounded-2xl w-fit mb-4 ${stat.color}`}>
                          <stat.icon size={20} />
                        </div>
                        <p className="text-[10px] font-bold text-neutral-gray uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-2xl font-black text-neutral-black">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-[#F8FAFF] rounded-[40px] p-8 border border-[#E0E7FF]">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black text-neutral-black">Active Shipping</h3>
                        <Link href="/track" className="text-xs font-bold text-primary hover:underline">Track Full History</Link>
                      </div>
                      <div className="flex items-start gap-6">
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                          <Image src={mockOrders[0].item.image} alt="order" fill className="object-cover" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="font-bold text-neutral-black">{mockOrders[0].item.name}</h4>
                                <p className="text-xs text-neutral-gray">Moving through Pune Hub</p>
                            </div>
                            <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">IN TRANSIT</span>
                          </div>
                          <div className="h-2 w-full bg-blue-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                          <p className="text-[10px] font-bold text-neutral-gray uppercase tracking-widest mt-3">Expected: 28 Apr</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-primary/5 rounded-[40px] p-8 border border-primary/10">
                      <h3 className="text-xl font-black text-neutral-black mb-6">Promocodes</h3>
                      <div className="space-y-4">
                        {activeOffers.map((offer, idx) => (
                          <div key={idx} className="bg-white p-4 rounded-3xl shadow-sm border border-primary/5">
                            <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{offer.discount}</span>
                            <h5 className="font-bold text-neutral-black text-sm mt-0.5">{offer.title}</h5>
                            <div className="flex items-center justify-between mt-3">
                              <span className="font-mono text-[10px] bg-gray-50 px-2 py-1 rounded">{offer.code}</span>
                              <button className="text-[9px] font-black text-primary uppercase">COPY</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* --- ORDERS TAB --- */}
              {activeTab === 'orders' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
                    <div>
                      <h2 className="text-3xl font-black text-neutral-black tracking-tight font-display">My Orders</h2>
                      <p className="text-neutral-gray font-medium">Track and manage your purchases.</p>
                    </div>
                    <div className="flex items-center gap-3 bg-neutral-light px-6 py-4 rounded-3xl border border-gray-100 flex-grow max-w-md">
                      <Search size={18} className="text-neutral-gray" />
                      <input 
                        type="text" 
                        placeholder="Search by ID or product name..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none outline-none w-full font-bold text-sm text-neutral-black"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {['all', 'active', 'delivered', 'cancelled'].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setOrderFilter(filter)}
                        className={`px-6 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${
                          orderFilter === filter 
                            ? 'bg-neutral-black text-white' 
                            : 'bg-white text-neutral-gray border border-gray-100 hover:border-gray-300'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-6">
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <div key={order.id} className="bg-white rounded-[32px] border border-gray-100 p-6 hover:shadow-xl hover:shadow-black/5 transition-all group overflow-hidden relative">
                          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                            <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                              <Image src={order.item.image} alt={order.item.name} fill className="object-cover" />
                            </div>
                            <div className="flex-grow min-w-0">
                              <div className="flex flex-wrap items-center gap-3 mb-2">
                                <span className={`text-[10px] font-black uppercase tracking-widest rounded-lg px-2.5 py-1 ${getStatusColor(order.status)}`}>
                                  {order.status}
                                </span>
                                <span className="text-xs font-bold text-neutral-gray">{order.date}</span>
                                <span className="text-xs font-bold text-neutral-gray">• ID: {order.id}</span>
                              </div>
                              <h3 className="text-xl font-black text-neutral-black mb-1 group-hover:text-primary transition-colors truncate">{order.item.name}</h3>
                              <p className="text-xs font-bold text-neutral-gray mb-4">Influencer: <span className="text-primary">@{order.item.influencer.toLowerCase().replace(' ', '')}</span></p>
                              
                              <div className="flex items-center gap-6">
                                <div>
                                  <span className="block text-[8px] font-black text-neutral-gray uppercase">Total</span>
                                  <span className="font-black text-neutral-black">₹{order.total.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="border-l border-gray-100 pl-6">
                                  <span className="block text-[8px] font-black text-neutral-gray uppercase">Quantity</span>
                                  <span className="font-bold text-neutral-black">{order.item.quantity}</span>
                                </div>
                                <div className="border-l border-gray-100 pl-6">
                                  <span className="block text-[8px] font-black text-neutral-gray uppercase">Payment</span>
                                  <span className="font-bold text-neutral-black">{order.payment}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-3 w-full md:w-auto md:min-w-[160px]">
                              <button 
                                onClick={() => setSelectedOrder(order)}
                                className="w-full py-3.5 rounded-2xl bg-neutral-black text-white font-black text-xs uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg active:scale-95"
                              >
                                Track Item
                              </button>
                              <div className="flex items-center gap-3">
                                <button className="flex-1 py-3.5 rounded-2xl border border-gray-100 text-neutral-gray font-bold text-[10px] uppercase hover:bg-gray-50 transition-all">Support</button>
                                {order.status === 'Delivered' ? (
                                  <button className="flex-1 py-3.5 rounded-2xl border border-gray-100 text-primary font-bold text-[10px] uppercase hover:bg-primary hover:text-white transition-all">Review</button>
                                ) : (
                                  <button className="flex-1 py-3.5 rounded-2xl border border-gray-100 text-red-500 font-bold text-[10px] uppercase hover:bg-red-50 transition-all">Cancel</button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-32 bg-neutral-light rounded-[40px] border border-dashed border-gray-200">
                        <Package size={60} className="mx-auto text-neutral-gray mb-6 opacity-20" />
                        <h3 className="text-xl font-bold text-neutral-black">No orders found</h3>
                        <p className="text-neutral-gray text-sm mt-1">Try adjusting your search or filters.</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* --- WISHLIST TAB --- */}
              {activeTab === 'wishlist' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <h2 className="text-3xl font-black text-neutral-black tracking-tight font-display">My Wishlist</h2>
                      <p className="text-neutral-gray font-medium">Items you&apos;ve saved for later.</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-neutral-light p-1.5 rounded-2xl flex items-center">
                        <select 
                          value={wishlistSort}
                          onChange={(e) => setWishlistSort(e.target.value)}
                          className="bg-transparent border-none outline-none text-xs font-black text-neutral-black uppercase tracking-widest px-4 py-2 cursor-pointer"
                        >
                          <option value="latest">Latest First</option>
                          <option value="price-low">Price: Low to High</option>
                          <option value="price-high">Price: High to Low</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {wishlist.map((item) => (
                        <div key={item.id} className="group relative bg-white rounded-[40px] border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-black/5 transition-all">
                          <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
                            <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-all duration-700" />
                            <div className="absolute top-4 right-4 flex flex-col gap-2">
                               <button 
                                 onClick={() => removeFromWishlist(item.id)}
                                 className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-red-500 shadow-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all transform hover:-rotate-12"
                               >
                                 <Trash2 size={16} />
                               </button>
                               <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-neutral-black shadow-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all transform hover:rotate-12">
                                 <Share2 size={16} />
                               </button>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                               <button className="w-full bg-neutral-black text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-2xl">
                                  <ShoppingBag size={14} />
                                  Add to Cart
                               </button>
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="flex flex-wrap gap-2 mb-3">
                              <span className="text-[9px] font-black text-secondary uppercase tracking-[0.2em] border border-secondary/20 px-2 py-0.5 rounded-full">@{item.influencer?.handle || 'creator'}</span>
                              {item.discount && (
                                <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] bg-primary/5 px-2 py-0.5 rounded-full">Save {item.discount}%</span>
                              )}
                            </div>
                            <h3 className="font-black text-neutral-black text-lg line-clamp-1 mb-2 group-hover:text-primary transition-colors cursor-pointer" onClick={() => router.push(`/products/${item.slug}`)}>{item.name}</h3>
                            <div className="flex items-center justify-between">
                              <span className="text-xl font-black text-neutral-black">₹{item.price.toLocaleString('en-IN')}</span>
                              <span className="text-[10px] font-bold text-accent-orange uppercase tracking-widest">In Stock</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-40 border border-dashed border-gray-200 rounded-[40px]">
                       <Heart size={60} className="mx-auto text-pink-100 mb-6" />
                       <h3 className="text-2xl font-black text-neutral-black mb-2">Wishlist is empty</h3>
                       <p className="text-neutral-gray max-w-xs mx-auto mb-10 font-medium">Save products endorsed by your favorite influencers here.</p>
                       <Link href="/products" className="inline-flex items-center gap-3 bg-neutral-black text-white px-10 py-5 rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl hover:-translate-y-1 transition-all active:scale-95">
                          Explore Products
                          <ArrowRight size={18} />
                       </Link>
                    </div>
                  )}
                </motion.div>
              )}

              {/* --- FOLLOWING TAB --- */}
              {activeTab === 'following' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                  <div>
                    <h2 className="text-3xl font-black text-neutral-black tracking-tight font-display">Creators You Follow</h2>
                    <p className="text-neutral-gray font-medium">Never miss a drop from your favorite influencers.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {mockInfluencers.map((inf) => (
                      <div key={inf.id} className="bg-neutral-light/50 p-8 rounded-[40px] border border-gray-100 group hover:border-primary/20 transition-all flex items-start gap-6 relative">
                        {inf.isNewProduct && (
                          <div className="absolute -top-3 -right-3 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-2xl shadow-xl shadow-primary/20 animate-bounce">
                            New Drops!
                          </div>
                        )}
                        <div className="relative w-24 h-24 rounded-[32px] overflow-hidden shrink-0 border-4 border-white shadow-xl shadow-black/5 group-hover:rotate-3 transition-transform">
                          <Image src={inf.image} alt={inf.name} fill className="object-cover" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-black text-neutral-black truncate">{inf.name}</h3>
                            <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
                          </div>
                          <p className="text-xs font-bold text-neutral-gray mb-4">@{inf.handle}</p>
                          
                          <div className="grid grid-cols-3 gap-2 mb-6">
                            <div className="text-center">
                              <p className="text-[8px] font-bold text-neutral-gray uppercase tracking-widest">Niche</p>
                              <p className="text-[10px] font-black text-neutral-black mt-0.5">{inf.niche.split(' ')[0]}</p>
                            </div>
                            <div className="text-center border-x border-gray-200">
                              <p className="text-[8px] font-bold text-neutral-gray uppercase tracking-widest">Fans</p>
                              <p className="text-[10px] font-black text-neutral-black mt-0.5">{inf.followers}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-[8px] font-bold text-neutral-gray uppercase tracking-widest">Picks</p>
                              <p className="text-[10px] font-black text-neutral-black mt-0.5">{inf.productsCount}+</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Link 
                              href={`/influencers/${inf.handle}`}
                              className="flex-grow py-3 rounded-2xl bg-neutral-black text-white font-black text-xs uppercase tracking-widest text-center hover:bg-primary transition-all flex items-center justify-center gap-2"
                            >
                              Shop Range
                              <ExternalLink size={14} />
                            </Link>
                            <button className="px-4 py-3 rounded-2xl border border-gray-200 text-neutral-gray font-bold text-[10px] uppercase tracking-widest hover:bg-white hover:text-red-500 hover:border-red-100 transition-all">Unfollow</button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <button className="bg-white p-8 rounded-[40px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-6 text-neutral-gray hover:border-primary/40 hover:text-primary transition-all group">
                       <div className="p-5 bg-gray-50 rounded-full group-hover:bg-primary/5 transition-all">
                          <Users size={40} className="opacity-40 group-hover:opacity-100" />
                       </div>
                       <div className="text-center">
                          <p className="font-black text-neutral-black mb-1">Discover more creators</p>
                          <p className="text-xs font-medium">Follow new influencers to personalize your feed.</p>
                       </div>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* --- SETTINGS TAB --- */}
              {activeTab === 'settings' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                   <div>
                    <h2 className="text-3xl font-black text-neutral-black tracking-tight font-display">Account Settings</h2>
                    <p className="text-neutral-gray font-medium">Manage your profile information and security.</p>
                  </div>

                  <div className="space-y-6 max-w-2xl">
                    <div className="p-8 rounded-[40px] bg-neutral-light border border-gray-100">
                      <h4 className="text-lg font-black text-neutral-black mb-6 flex items-center gap-3">
                        <User size={20} className="text-primary" />
                        Bio Information
                      </h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-neutral-gray uppercase tracking-widest ml-1">Full Name</label>
                             <input type="text" defaultValue={profile?.displayName || user?.displayName || 'User'} className="w-full px-5 py-3.5 rounded-2xl bg-white border border-gray-100 font-bold outline-none focus:ring-2 ring-primary/20" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-neutral-gray uppercase tracking-widest ml-1">Email</label>
                             <input type="email" readOnly value={user?.email || ''} className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 font-bold text-neutral-gray cursor-not-allowed" />
                          </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-neutral-gray uppercase tracking-widest ml-1">About</label>
                           <textarea rows="3" className="w-full px-5 py-3.5 rounded-2xl bg-white border border-gray-100 font-bold outline-none focus:ring-2 ring-primary/20 resize-none" placeholder="Tell us a bit about your style..."></textarea>
                        </div>
                      </div>
                    </div>

                    <div className="p-8 rounded-[40px] bg-neutral-light border border-gray-100">
                      <h4 className="text-lg font-black text-neutral-black mb-6 flex items-center gap-3">
                        <Download size={20} className="text-secondary" />
                        Data & Export
                      </h4>
                      <p className="text-sm text-neutral-gray mb-6">Download a copy of your shopping history and influencer interactions.</p>
                      <button className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-white border border-gray-100 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-neutral-black hover:text-white transition-all shadow-sm">
                        Export Personal Data
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Placeholder for other tabs */}
              {['addresses'].includes(activeTab) && (
                <div className="flex flex-col items-center justify-center py-40">
                  <Package size={60} className="text-gray-100 mb-6" />
                  <h3 className="text-xl font-bold text-neutral-black">{sidebarItems.find(i => i.id === activeTab)?.label} Experience Coming Soon</h3>
                  <p className="text-neutral-gray text-center max-w-xs mt-2">We&apos;re polishing this feature to provide the best influencer-first experience. Stay tuned!</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* --- ORDER DETAIL MODAL --- */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="absolute inset-0 bg-neutral-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[48px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between p-8 md:p-12 border-b border-gray-100">
                <div>
                  <h2 className="text-3xl font-black text-neutral-black tracking-tight font-display">Order Timeline</h2>
                  <p className="text-xs font-bold text-neutral-gray mt-1 uppercase tracking-widest">Tracking ID: {selectedOrder.id}</p>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="p-4 rounded-full bg-gray-50 text-neutral-gray hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"
                >
                  <XCircle size={24} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 md:p-12 custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                  
                  {/* Timeline Column */}
                  <div className="lg:col-span-3 space-y-12 relative">
                    <div className="absolute left-6 top-8 bottom-8 w-1 bg-gray-100 rounded-full" />
                    {selectedOrder.history.map((step, idx) => (
                      <div key={idx} className="relative pl-16">
                        <div className={`absolute left-0 top-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all ${
                          step.current 
                            ? 'bg-blue-600 shadow-blue-200 scale-110 z-20' 
                            : step.completed 
                              ? 'bg-emerald-500 shadow-emerald-100' 
                              : 'bg-gray-100 text-gray-400 opacity-50'
                        }`}>
                          {step.completed ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                        </div>
                        <div className={`${step.current ? 'bg-blue-50/50 p-6 rounded-3xl border border-blue-100' : ''}`}>
                          <h4 className={`text-lg font-black ${step.completed ? 'text-neutral-black' : 'text-neutral-gray'}`}>
                            {step.status}
                          </h4>
                          <p className="text-xs font-bold text-neutral-gray mt-1">{step.date}</p>
                          <div className="flex items-center gap-2 text-[10px] font-black text-neutral-gray uppercase tracking-widest mt-2">
                            <MapPin size={12} />
                            {step.location}
                          </div>
                          {step.current && (
                            <div className="mt-4 flex gap-2">
                               <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                               <p className="text-[10px] font-black text-primary uppercase tracking-widest">LIVE TRACKING ACTIVE</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary Column */}
                  <div className="lg:col-span-2 space-y-8">
                    <div className="p-8 rounded-[40px] bg-neutral-light/50 border border-gray-100">
                      <h4 className="text-sm font-black text-neutral-black uppercase tracking-widest mb-6">Order Details</h4>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-sm">
                          <Image src={selectedOrder.item.image} alt="item" fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-neutral-black text-sm">{selectedOrder.item.name}</p>
                          <p className="text-[10px] text-neutral-gray">Qty: {selectedOrder.item.quantity} • Subtotal: ₹{selectedOrder.item.price}</p>
                        </div>
                      </div>
                      <div className="space-y-4 pt-6 border-t border-gray-100">
                         <div className="flex justify-between text-xs">
                           <span className="text-neutral-gray font-bold">Subtotal</span>
                           <span className="font-black text-neutral-black">₹{selectedOrder.total}</span>
                         </div>
                         <div className="flex justify-between text-xs">
                           <span className="text-neutral-gray font-bold">Shipping</span>
                           <span className="font-black text-emerald-600">FREE</span>
                         </div>
                         <div className="flex justify-between text-xs">
                           <span className="text-neutral-gray font-bold">Tax</span>
                           <span className="font-black text-neutral-black">₹0</span>
                         </div>
                         <div className="flex justify-between text-lg pt-4 border-t border-gray-100">
                           <span className="font-black text-neutral-black">Total</span>
                           <span className="font-black text-primary">₹{selectedOrder.total}</span>
                         </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                       <button className="w-full py-5 rounded-[32px] bg-neutral-black text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-primary transition-all shadow-xl shadow-black/10">
                          <Download size={18} />
                          Invoice (PDF)
                       </button>
                       <button className="w-full py-5 rounded-[32px] border border-gray-100 bg-white text-neutral-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-sm">
                          <MessageSquare size={18} />
                          Connect with Support
                       </button>
                    </div>
                  </div>

                </div>
              </div>

              <div className="p-8 border-t border-gray-100 flex items-center justify-center bg-gray-50">
                 <p className="text-[10px] font-bold text-neutral-gray uppercase tracking-widest text-center">
                   This order is protected by <span className="text-primary">Limelight Secure Shopper</span> program.
                 </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
