'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  TrendingUp, 
  Users, 
  IndianRupee,
  Link as LinkIcon,
  MousePointerClick,
  CheckCircle2,
  Copy,
  ChevronRight,
  ExternalLink,
  ArrowRight,
  LayoutDashboard,
  LayoutGrid,
  ShoppingBag,
  Bell,
  MessageSquare,
  BarChart3,
  Globe,
  PieChart,
  Calendar,
  Clock,
  Plus,
  Search,
  Filter,
  Download,
  Wallet,
  Star,
  Image as ImageIcon,
  Settings,
  User,
  LogOut,
  XCircle,
  Hash,
  Instagram,
  Youtube,
  Twitter,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

// --- MOCK DATA ---
const mockStats = [
  { label: 'Total Earnings', value: '₹1,24,850', sub: '₹8,240 this wk', icon: IndianRupee, color: 'bg-primary' },
  { label: 'Profile Views', value: '42.5K', sub: '+12% from last wk', icon: Users, color: 'bg-blue-600' },
  { label: 'Active Collabs', value: '08', sub: '2 ending soon', icon: Handshake, color: 'bg-emerald-500' },
  { label: 'EPC', value: '₹14.2', sub: '+4.2% growth', icon: MousePointerClick, color: 'bg-orange-500' },
];

function Handshake({ size, className }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m11 17 2 2 6-6" />
      <path d="m18 14 1-1a2 2 0 0 0-3-3l-7 7-2 2" />
      <path d="M18 5 5 18" />
      <path d="m2 18 2 2 1.1-1.1" />
    </svg>
  );
}

const mockCollabs = [
  { id: 'C-001', brand: 'Nike India', campaign: 'Air Max 2024 Launch', status: 'Active', deadline: '2026-05-15', deliverables: ['1 Reel', '2 Stories'], compensation: '₹45,000', logo: 'https://picsum.photos/seed/nike/100/100' },
  { id: 'C-002', brand: 'Plum Beauty', campaign: 'Summer Glow Kit', status: 'Pending Approval', deadline: '2026-06-01', deliverables: ['1 YT Short'], compensation: '₹15,000 + Products', logo: 'https://picsum.photos/seed/plum/100/100' },
  { id: 'C-003', brand: 'Nothing', campaign: 'Phone (3) Hype', status: 'Negotiating', deadline: '2026-05-20', deliverables: ['Unboxing Video'], compensation: '₹60,000', logo: 'https://picsum.photos/seed/nothing/100/100' },
];

const mockEarnings = [
  { id: 'P-9812', amount: '₹18,420', status: 'Transferred', date: '24 Apr, 2026', type: 'Affiliate Payout' },
  { id: 'P-9811', amount: '₹45,000', status: 'Pending', date: '20 Apr, 2026', type: 'Brand Collaboration' },
  { id: 'P-9810', amount: '₹12,200', status: 'Transferred', date: '12 Apr, 2026', type: 'Affiliate Payout' },
];

const mockInbox = [
  { id: 1, brand: 'Samsung', message: 'Hey! We love your tech reviews. Would you be interested...', time: '2h ago', unread: true },
  { id: 2, brand: 'Zara', message: 'Your summer haul was fire! We have a new collection launch...', time: '1d ago', unread: false },
];

const mockAnalytics = {
  platformPerformance: [
    { name: 'Instagram', clicks: 24500, conversions: 820, revenue: '₹42,000' },
    { name: 'YouTube', clicks: 12100, conversions: 450, revenue: '₹68,500' },
    { name: 'Twitter', clicks: 4200, conversions: 45, revenue: '₹3,200' },
  ],
  demographics: [
    { label: '18-24', value: 45 },
    { label: '25-34', value: 35 },
    { label: '35-44', value: 15 },
    { label: '45+', value: 5 },
  ]
};

const topProducts = [
  { name: 'Wireless Pro Headphones', clicks: 8240, sales: 142, revenue: '₹12,400', image: 'https://picsum.photos/seed/hp/100/100' },
  { name: 'Glow Skin Serum', clicks: 4120, sales: 88, revenue: '₹6,200', image: 'https://picsum.photos/seed/serum/100/100' },
];

export default function InfluencerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, profile, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'collabs', label: 'Collaborations', icon: Handshake, count: 3 },
    { id: 'inbox', label: 'Brand Inbox', icon: MessageSquare, count: 2 },
    { id: 'affiliate', label: 'Affiliate & Coupons', icon: LinkIcon },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'earnings', label: 'Earnings & Payouts', icon: Wallet },
    { id: 'audience', label: 'Audience Insight', icon: Globe },
    { id: 'library', label: 'Content Library', icon: ImageIcon },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <DashboardLayout type="influencer">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Side Navigation */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded-[40px] p-6 shadow-sm border border-gray-100 sticky top-32">
              <div className="flex items-center gap-4 mb-10 px-4">
                <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xl shadow-xl shadow-primary/10">
                  {profile?.displayName?.[0] || user?.displayName?.[0] || 'I'}
                </div>
                <div>
                  <h2 className="font-black text-neutral-black tracking-tight">{profile?.displayName || user?.displayName || 'Creator'}</h2>
                  <p className="text-[10px] font-bold text-neutral-gray uppercase tracking-widest">{profile?.niche || 'Lifestyle Creator'}</p>
                </div>
              </div>

              <nav className="space-y-1 mb-10">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold transition-all ${
                      activeTab === item.id 
                        ? 'bg-neutral-black text-white shadow-xl shadow-black/20 scale-105' 
                        : 'text-neutral-gray hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} />
                      <span className="text-sm font-bold tracking-tight">{item.label}</span>
                    </div>
                    {item.count > 0 && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        activeTab === item.id ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
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
            <div className="bg-white rounded-[48px] p-8 md:p-12 shadow-sm border border-neutral-light min-h-[800px]">
              
              {/* --- OVERVIEW TAB --- */}
              {activeTab === 'overview' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                   <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-4xl font-black text-neutral-black tracking-tight font-display italic uppercase">
                        Creator Hub <span className="text-primary italic">.</span>
                      </h1>
                      <p className="text-neutral-gray font-medium mt-1">Snapshot of your performance this week.</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-[10px] font-black text-neutral-gray uppercase tracking-widest">Available to withdraw</p>
                            <p className="text-xl font-black text-emerald-600">₹42,850</p>
                        </div>
                        <button className="bg-neutral-black text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-black/10">Withdraw</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mockStats.map((stat, idx) => (
                      <div key={idx} className="p-8 rounded-[40px] bg-neutral-light border border-gray-100 group hover:-translate-y-1 transition-all">
                        <div className={`p-4 rounded-3xl w-fit mb-6 shadow-lg shadow-black/5 ${stat.color} text-white`}>
                          <stat.icon size={24} />
                        </div>
                        <p className="text-[10px] font-bold text-neutral-gray uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-3xl font-black text-neutral-black tracking-tighter">{stat.value}</p>
                        <p className="text-xs font-bold text-accent-orange mt-2 flex items-center gap-1">
                           {stat.sub}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     <div className="lg:col-span-2 space-y-8">
                         <div className="flex items-center justify-between">
                             <h3 className="text-2xl font-black text-neutral-black italic">Active Campaigns (3)</h3>
                             <Link href="#" onClick={() => setActiveTab('collabs')} className="text-xs font-bold text-primary flex items-center gap-1">Manage All <ArrowRight size={14} /></Link>
                         </div>
                         <div className="space-y-4">
                            {mockCollabs.slice(0, 2).map((collab) => (
                              <div key={collab.id} className="p-6 rounded-[32px] bg-white border border-gray-100 flex items-center gap-6 group hover:border-primary/20 transition-all">
                                 <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-gray-50 shrink-0">
                                   <Image src={collab.logo} alt="brand" fill className="object-cover" />
                                 </div>
                                 <div className="flex-grow min-w-0">
                                    <h4 className="font-black text-neutral-black text-sm uppercase tracking-tight">{collab. campaign}</h4>
                                    <p className="text-xs font-bold text-neutral-gray">{collab.brand} • <span className="text-emerald-600">{collab.status}</span></p>
                                    <div className="flex gap-2 mt-3 overflow-hidden">
                                       {collab.deliverables.map((d, i) => (
                                         <span key={i} className="text-[9px] font-black bg-gray-50 text-neutral-gray px-2 py-0.5 rounded-lg whitespace-nowrap">{d}</span>
                                       ))}
                                    </div>
                                 </div>
                                 <div className="text-right shrink-0">
                                    <p className="text-[10px] font-bold text-neutral-gray uppercase tracking-widest mb-1">Due in</p>
                                    <p className="text-sm font-black text-primary italic">12 Days</p>
                                 </div>
                              </div>
                            ))}
                         </div>
                     </div>

                     <div className="space-y-8">
                        <div className="bg-neutral-black rounded-[48px] p-10 text-white relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-primary blur-[60px] opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
                           <div className="relative z-10 flex flex-col justify-between h-full">
                              <div>
                                 <div className="flex items-center gap-2 text-primary mb-6">
                                    <Star size={20} fill="currentColor" />
                                    <span className="text-xs font-black uppercase tracking-[0.2em]">Partner Level: Gold</span>
                                 </div>
                                 <h3 className="text-3xl font-black mb-4 tracking-tighter">Reach Platinum for 20% bonus commissions.</h3>
                                 <p className="text-white/60 text-sm leading-relaxed mb-8">You are just 1.2K clicks away from leveling up! Share your top products now.</p>
                              </div>
                              <button className="w-full py-5 rounded-[24px] bg-primary text-white font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20">Check Perks</button>
                           </div>
                        </div>

                        <div className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm">
                           <h4 className="text-sm font-black text-neutral-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                             <TrendingUp size={16} className="text-emerald-500" />
                             Brand Ratings
                           </h4>
                           <div className="flex items-center gap-4 mb-6">
                              <div className="text-5xl font-black text-neutral-black">4.9</div>
                              <div>
                                 <div className="flex text-accent-orange">
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                 </div>
                                 <p className="text-[10px] font-bold text-neutral-gray uppercase mt-1">Based on 12 collaborations</p>
                              </div>
                           </div>
                           <div className="space-y-4">
                              <div className="p-4 bg-neutral-light rounded-2xl border border-gray-50">
                                 <p className="text-xs font-medium text-neutral-black italic">&quot;Amazing content quality and prompt deliverables. Would love to work again!&quot;</p>
                                 <p className="text-[9px] font-black text-primary mt-2 uppercase tracking-widest">— Nike India</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                </motion.div>
              )}

              {/* --- COLLABORATIONS TAB --- */}
              {activeTab === 'collabs' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <h2 className="text-3xl font-black text-neutral-black tracking-tight font-display">Collaborations</h2>
                      <p className="text-neutral-gray font-medium">Active campaigns and market opportunities.</p>
                    </div>
                    <div className="flex items-center gap-2 bg-neutral-light p-1.5 rounded-2xl">
                       {['Active', 'Pending', 'History'].map(f => (
                         <button key={f} className={`px-5 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${f === 'Active' ? 'bg-white text-primary shadow-sm' : 'text-neutral-gray hover:bg-white/50'}`}>
                           {f}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                     {mockCollabs.map((collab) => (
                       <div key={collab.id} className="bg-white rounded-[40px] border border-gray-100 p-8 flex flex-col md:flex-row items-center gap-8 group hover:shadow-2xl hover:shadow-black/5 transition-all">
                          <div className="relative w-24 h-24 rounded-3xl overflow-hidden shadow-xl border-4 border-white shrink-0 group-hover:-rotate-3 transition-transform">
                             <Image src={collab.logo} alt="brand" fill className="object-cover" />
                          </div>
                          <div className="flex-grow space-y-4 w-full text-center md:text-left">
                             <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                                  collab.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 
                                  collab.status === 'Negotiating' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                                }`}>{collab.status}</span>
                                <span className="text-xs font-bold text-neutral-gray">Deadline: {collab.deadline}</span>
                             </div>
                             <h3 className="text-2xl font-black text-neutral-black tracking-tight">{collab.campaign}</h3>
                             <p className="text-sm font-medium text-neutral-gray">Deliverables: <span className="text-neutral-black font-bold">{collab.deliverables.join(', ')}</span></p>
                             <p className="text-lg font-black text-primary">Budget: {collab.compensation}</p>
                          </div>
                          <div className="flex flex-col gap-3 w-full md:w-auto md:min-w-[180px]">
                              <button className="w-full py-4 rounded-2xl bg-neutral-black text-white font-black text-xs uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-black/10">Manage Work</button>
                              <button className="w-full py-4 rounded-2xl border border-gray-100 text-neutral-gray font-bold text-xs uppercase tracking-widest hover:bg-gray-50 transition-all">Contact Brand</button>
                          </div>
                       </div>
                     ))}
                  </div>

                  <div className="pt-8 border-t border-gray-100">
                     <h4 className="text-xl font-black text-neutral-black mb-6 italic italic">Explore Market Requests (42)</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2].map(i => (
                          <div key={i} className="p-8 rounded-[40px] bg-neutral-light border border-dashed border-gray-200 flex flex-col items-center text-center group hover:border-primary/40 transition-all">
                             <div className="relative w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                                <ShoppingBag className="text-neutral-gray opacity-40" />
                             </div>
                             <h5 className="font-black text-neutral-black mb-2">New Brand Opportunity</h5>
                             <p className="text-xs text-neutral-gray font-medium max-w-[240px] mb-8">A Fashion brand is looking for fitness creators in your demographic.</p>
                             <button className="px-8 py-3.5 rounded-2xl bg-white border border-gray-100 text-primary font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm">View Details</button>
                          </div>
                        ))}
                     </div>
                  </div>
                </motion.div>
              )}

              {/* --- INBOX TAB --- */}
              {activeTab === 'inbox' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                   <div className="flex items-center justify-between">
                      <h2 className="text-3xl font-black text-neutral-black font-display italic uppercase">Inbox <span className="text-primary italic">.</span></h2>
                      <button className="p-4 rounded-2xl bg-neutral-light text-neutral-gray hover:text-primary transition-all"><Filter size={20} /></button>
                   </div>

                   <div className="bg-neutral-light border border-gray-100 rounded-[48px] overflow-hidden flex h-[600px]">
                      {/* Message List */}
                      <div className="w-full md:w-1/3 border-r border-gray-100 bg-white overflow-y-auto">
                        {mockInbox.map((msg) => (
                          <div key={msg.id} className={`p-8 cursor-pointer border-b border-gray-50 flex items-start gap-4 transition-all hover:bg-gray-50 ${msg.unread ? 'bg-primary/5' : ''}`}>
                             <div className="w-12 h-12 rounded-xl bg-gray-50 shrink-0 shadow-sm border border-gray-100 flex items-center justify-center font-black text-primary">
                                {msg.brand[0]}
                             </div>
                             <div className="flex-grow min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-black text-neutral-black text-sm truncate">{msg.brand}</h4>
                                    <span className="text-[9px] font-bold text-neutral-gray">{msg.time}</span>
                                </div>
                                <p className="text-[11px] font-medium text-neutral-gray line-clamp-2 leading-relaxed">{msg.message}</p>
                                {msg.unread && <div className="mt-2 w-2 h-2 rounded-full bg-primary" />}
                             </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Chat Window Placeholder */}
                      <div className="hidden md:flex flex-grow bg-neutral-light flex items-center justify-center p-12 text-center">
                         <div className="max-w-xs">
                            <div className="w-20 h-20 rounded-full bg-white shadow-xl mx-auto flex items-center justify-center mb-8">
                               <MessageSquare size={32} className="text-primary opacity-20" />
                            </div>
                            <h3 className="text-xl font-black text-neutral-black mb-2">Select a thread</h3>
                            <p className="text-sm font-medium text-neutral-gray leading-relaxed">Choose a collaboration thread to continue your negotiation.</p>
                         </div>
                      </div>
                   </div>
                </motion.div>
              )}

              {/* --- ANALYTICS TAB --- */}
              {activeTab === 'analytics' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <h2 className="text-3xl font-black text-neutral-black tracking-tight font-display">Deep Analytics</h2>
                      <p className="text-neutral-gray font-medium">Real-time tracking of every click and conversion.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-6 py-3.5 rounded-2xl bg-white border border-gray-100 font-bold text-xs flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
                           <Calendar size={16} />
                           Last 30 Days
                        </button>
                        <button className="p-3.5 rounded-2xl bg-neutral-black text-white hover:bg-primary transition-all shadow-xl shadow-black/10">
                           <Download size={20} />
                        </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Product Performance */}
                      <div className="lg:col-span-2 bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm space-y-10">
                         <h3 className="text-xl font-black text-neutral-black">Product performance</h3>
                         <div className="space-y-8">
                            {topProducts.map((p, i) => (
                              <div key={i} className="flex items-center gap-8">
                                 <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-md shrink-0">
                                   <Image src={p.image} alt="pic" fill className="object-cover" />
                                 </div>
                                 <div className="flex-grow min-w-0">
                                    <h4 className="font-bold text-neutral-black text-sm mb-1 truncate">{p.name}</h4>
                                    <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                                       <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${(p.sales/200)*100}%` }}></div>
                                    </div>
                                 </div>
                                 <div className="grid grid-cols-3 gap-4 text-center min-w-[200px]">
                                    <div>
                                       <p className="text-[8px] font-black text-neutral-gray uppercase">Clicks</p>
                                       <p className="font-black text-neutral-black text-xs">{p.clicks}</p>
                                    </div>
                                    <div>
                                       <p className="text-[8px] font-black text-neutral-gray uppercase">Sales</p>
                                       <p className="font-black text-emerald-600 text-xs">{p.sales}</p>
                                    </div>
                                    <div>
                                       <p className="text-[8px] font-black text-neutral-gray uppercase">Revenue</p>
                                       <p className="font-black text-primary text-xs">{p.revenue}</p>
                                    </div>
                                 </div>
                              </div>
                            ))}
                         </div>
                      </div>

                      {/* Platform Split */}
                      <div className="bg-neutral-light p-10 rounded-[48px] border border-gray-100 space-y-10">
                         <h3 className="text-xl font-black text-neutral-black">Platform Split</h3>
                         <div className="space-y-6">
                            {mockAnalytics.platformPerformance.map((plat) => (
                              <div key={plat.name} className="space-y-2">
                                 <div className="flex justify-between items-center text-xs font-black">
                                    <span className="flex items-center gap-2">
                                       {plat.name === 'Instagram' ? <Instagram size={14} className="text-pink-500" /> : plat.name === 'YouTube' ? <Youtube size={14} className="text-red-500" /> : <Twitter size={14} className="text-blue-400" />}
                                       {plat.name}
                                    </span>
                                    <span>{plat.revenue}</span>
                                 </div>
                                 <div className="h-2 w-full bg-white rounded-full overflow-hidden">
                                     <div className={`h-full rounded-full ${plat.name === 'Instagram' ? 'bg-pink-500' : plat.name === 'YouTube' ? 'bg-red-500' : 'bg-blue-400'}`} style={{ width: `${(parseInt(plat.revenue.replace('₹','').replace(',','')) / 100000) * 100}%` }} />
                                 </div>
                              </div>
                            ))}
                         </div>
                         <div className="pt-8 border-t border-gray-100">
                            <p className="text-xs font-medium text-neutral-gray italic">YouTube remains your highest ROI platform despite lower click volume.</p>
                         </div>
                      </div>
                  </div>
                </motion.div>
              )}

              {/* --- EARNINGS TAB --- */}
              {activeTab === 'earnings' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div>
                        <h2 className="text-3xl font-black text-neutral-black tracking-tight font-display">Earnings & Payouts</h2>
                        <p className="text-neutral-gray font-medium">Track your income and request withdrawals.</p>
                      </div>
                      <div className="bg-emerald-50 px-10 py-8 rounded-[40px] border border-emerald-100 flex items-center gap-8 shadow-sm">
                         <div className="p-4 bg-emerald-500 text-white rounded-3xl shadow-xl shadow-emerald-200">
                            <Wallet size={32} />
                         </div>
                         <div>
                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Withdrawable Balance</p>
                            <p className="text-3xl font-black text-neutral-black tracking-tighter italic">₹42,850</p>
                         </div>
                         <button className="bg-neutral-black text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-black/10">Cash Out</button>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <h3 className="text-xl font-black text-neutral-black ml-1">Recent Transactions</h3>
                      <div className="bg-white border border-gray-100 rounded-[48px] overflow-hidden">
                         <table className="w-full border-collapse">
                            <thead>
                               <tr className="bg-neutral-light/50">
                                  <th className="px-8 py-6 text-left text-[10px] font-black text-neutral-gray uppercase tracking-widest">ID</th>
                                  <th className="px-8 py-6 text-left text-[10px] font-black text-neutral-gray uppercase tracking-widest">Type</th>
                                  <th className="px-8 py-6 text-left text-[10px] font-black text-neutral-gray uppercase tracking-widest">Date</th>
                                  <th className="px-8 py-6 text-left text-[10px] font-black text-neutral-gray uppercase tracking-widest">Amount</th>
                                  <th className="px-8 py-6 text-left text-[10px] font-black text-neutral-gray uppercase tracking-widest">Status</th>
                                  <th className="px-8 py-6 text-right text-[10px] font-black text-neutral-gray uppercase tracking-widest">Action</th>
                               </tr>
                            </thead>
                            <tbody>
                               {mockEarnings.map((txn) => (
                                 <tr key={txn.id} className="border-b border-gray-50 hover:bg-gray-50 transition-all font-medium">
                                    <td className="px-8 py-7 font-black text-xs">{txn.id}</td>
                                    <td className="px-8 py-7 text-sm font-bold text-neutral-black">{txn.type}</td>
                                    <td className="px-8 py-7 text-sm text-neutral-gray">{txn.date}</td>
                                    <td className="px-8 py-7 text-sm font-black text-neutral-black">{txn.amount}</td>
                                    <td className="px-8 py-7">
                                       <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${txn.status === 'Transferred' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                                          {txn.status}
                                       </span>
                                    </td>
                                    <td className="px-8 py-7 text-right">
                                       <button className="p-2.5 rounded-xl hover:bg-white hover:shadow-md transition-all text-neutral-gray hover:text-primary border border-transparent hover:border-gray-100"><Download size={18} /></button>
                                    </td>
                                 </tr>
                               ))}
                            </tbody>
                         </table>
                      </div>
                   </div>
                </motion.div>
              )}

              {/* --- SETTINGS TAB --- */}
              {activeTab === 'settings' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                   <div>
                    <h2 className="text-3xl font-black text-neutral-black tracking-tight font-display">Account Settings</h2>
                    <p className="text-neutral-gray font-medium">Manage your creator profile and payment preferences.</p>
                  </div>

                  <div className="space-y-8 max-w-3xl">
                     <div className="p-10 rounded-[48px] bg-neutral-light border border-gray-100">
                        <h4 className="text-lg font-black text-neutral-black mb-8 flex items-center gap-3 italic uppercase">
                           <User size={20} className="text-primary" />
                           Creator Profile
                        </h4>
                        <div className="space-y-6">
                            <div className="flex items-center gap-6 mb-10">
                               <div className="relative w-24 h-24 rounded-3xl overflow-hidden bg-white shadow-xl shadow-black/5 flex items-center justify-center text-primary font-black text-4xl">
                                  {profile?.displayName?.[0] || 'C'}
                               </div>
                               <div>
                                  <button className="px-6 py-3 bg-neutral-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-black/5">Change Avatar</button>
                                  <p className="text-[10px] text-neutral-gray font-bold uppercase mt-3 tracking-widest">Recommended: Square PNG/JPG, min 500px</p>
                               </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               <div className="space-y-2">
                                  <label className="text-[10px] font-black text-neutral-gray uppercase tracking-widest ml-2">Public Name</label>
                                  <input type="text" defaultValue={profile?.displayName || ''} className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 outline-none focus:ring-2 ring-primary/20 font-bold" />
                               </div>
                               <div className="space-y-2">
                                  <label className="text-[10px] font-black text-neutral-gray uppercase tracking-widest ml-2">Main Niche</label>
                                  <select className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 outline-none focus:ring-2 ring-primary/20 font-bold appearance-none">
                                     <option>Tech & Gadgets</option>
                                     <option>Beauty & Fashion</option>
                                     <option>Fitness</option>
                                     <option>Travel</option>
                                  </select>
                               </div>
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-neutral-gray uppercase tracking-widest ml-2">Creator Bio</label>
                               <textarea rows="4" className="w-full px-6 py-4 rounded-3xl bg-white border border-gray-100 outline-none focus:ring-2 ring-primary/20 font-medium text-sm leading-relaxed" placeholder="Write something about your style and audience..."></textarea>
                            </div>
                        </div>
                     </div>

                     <div className="p-10 rounded-[48px] bg-neutral-light border border-gray-100">
                        <h4 className="text-lg font-black text-neutral-black mb-8 flex items-center gap-3 italic uppercase">
                           <Wallet size={20} className="text-emerald-500" />
                           Bank Details
                        </h4>
                        <div className="space-y-6">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-neutral-gray uppercase tracking-widest ml-2">UPI ID</label>
                               <input type="text" placeholder="example@upi" className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 outline-none focus:ring-2 ring-primary/20 font-black text-lg tracking-tight" />
                            </div>
                            <p className="text-xs text-neutral-gray font-medium">All payouts are processed instantly via UPI within 24 hours of request.</p>
                        </div>
                     </div>
                     
                     <div className="p-10 rounded-[48px] bg-neutral-light border border-gray-100">
                        <h4 className="text-lg font-black text-neutral-black mb-8 flex items-center gap-3 italic uppercase">
                           <Globe size={20} className="text-blue-500" />
                           Social Integrity
                        </h4>
                        <div className="space-y-4">
                           <div className="flex items-center justify-between p-6 bg-white rounded-3xl border border-gray-50 shadow-sm">
                              <div className="flex items-center gap-4">
                                 <Instagram className="text-pink-600" />
                                 <div>
                                    <p className="text-sm font-black text-neutral-black">@tech_wizard_rahul</p>
                                    <p className="text-[10px] font-bold text-neutral-gray uppercase tracking-widest">Verified • 120K Followers</p>
                                 </div>
                              </div>
                              <button className="px-6 py-2.5 rounded-xl border border-gray-100 text-neutral-gray font-black text-[10px] uppercase tracking-widest hover:text-red-500 transition-all">Disconnect</button>
                           </div>
                           <button className="w-full py-5 rounded-[28px] border-2 border-dashed border-gray-200 text-neutral-gray font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:border-primary/40 hover:text-primary transition-all group">
                              <Plus size={18} className="opacity-40 group-hover:opacity-100" />
                              Connect New Platform
                           </button>
                        </div>
                     </div>

                     <button className="px-12 py-5 bg-neutral-black text-white rounded-[32px] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-black/20 hover:-translate-y-1 active:scale-95 transition-all">Save Changes</button>
                  </div>
                </motion.div>
              )}

              {/* Placeholder for complex tabs */}
              {['affiliate', 'audience', 'library'].includes(activeTab) && (
                <div className="flex flex-col items-center justify-center py-48 text-center">
                   <div className="w-24 h-24 rounded-full bg-neutral-light flex items-center justify-center mb-10 shadow-inner">
                      <LayoutDashboard size={40} className="text-neutral-gray opacity-20" />
                   </div>
                   <h3 className="text-3xl font-black text-neutral-black mb-4 tracking-tighter uppercase italic">{sidebarItems.find(i => i.id === activeTab)?.label} Experience</h3>
                   <p className="text-neutral-gray max-w-sm font-medium leading-relaxed">We&apos;re currently refining the {sidebarItems.find(i => i.id === activeTab)?.label.toLowerCase()} module to provide deeper influencer insights. Updates arrive <span className="text-primary italic font-black">May 2026.</span></p>
                </div>
              )}

            </div>
          </main>
        </div>
      </div>

      <AnimatePresence>
        {/* Simple notification overlay */}
        <div className="fixed bottom-10 right-10 z-50 flex flex-col gap-4 pointer-events-none">
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="p-6 bg-white rounded-[32px] shadow-2xl border border-emerald-50 pointer-events-auto flex items-center gap-4 max-w-sm"
           >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-100 shrink-0">
                 <Bell size={24} />
              </div>
              <div className="flex-grow">
                 <p className="text-xs font-black text-neutral-black">New Payout Received!</p>
                 <p className="text-[10px] font-bold text-neutral-gray uppercase tracking-widest mt-1">₹8,420 credited via UPI</p>
              </div>
              <button className="text-neutral-gray hover:text-neutral-black"><XCircle size={18} /></button>
           </motion.div>
        </div>
      </AnimatePresence>
    </DashboardLayout>
  );
}
