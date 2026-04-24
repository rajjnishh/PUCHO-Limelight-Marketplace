'use client';

import React from 'react';
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
  LayoutDashboard
} from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

const mockInfluencerStats = [
  { label: 'Net Earnings', value: '₹42,850', change: '+24%', isUp: true, icon: <IndianRupee size={24} className="text-white" />, color: 'bg-primary' },
  { label: 'Link Clicks', value: '8,240', change: '+12%', isUp: true, icon: <MousePointerClick size={24} className="text-white" />, color: 'bg-secondary' },
  { label: 'Conversion Rate', value: '2.2%', change: '+0.4%', isUp: true, icon: <TrendingUp size={24} className="text-white" />, color: 'bg-accent' },
  { label: 'Potential Payout', value: '₹12,400', change: 'Est.', isUp: true, icon: <LayoutDashboard size={24} className="text-white" />, color: 'bg-neutral-black' },
];

const topPerformers = [
  { id: 1, name: 'Premium Wireless Headphones', commission: '₹499', sales: 12, clicks: 450, image: 'https://picsum.photos/seed/tech1/200/200' },
  { id: 2, name: 'Skincare Duo Set', commission: '₹249', sales: 28, clicks: 890, image: 'https://picsum.photos/seed/beauty4/200/200' },
  { id: 3, name: 'Minimalist Wall Clock', commission: '₹120', sales: 45, clicks: 1200, image: 'https://picsum.photos/seed/home5/200/200' },
];

export default function InfluencerDashboard() {
  const handleCopyLink = (handle) => {
    // Mock logic
    const link = `https://limelight.com/product/1?ref=${handle}`;
    navigator.clipboard.writeText(link);
    alert('Affiliate link copied to clipboard!');
  };

  return (
    <DashboardLayout type="influencer">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-neutral-black tracking-tight font-display">Creator Hub</h1>
            <p className="text-neutral-gray font-medium text-lg">You&apos;ve earned <span className="text-primary font-bold">₹8,420</span> so far this week. Keep sharing!</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/influencer/marketplace" className="flex-grow sm:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all text-sm">
              Explore Marketplace
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mockInfluencerStats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm relative group overflow-hidden"
            >
              <div className={`p-4 rounded-3xl ${stat.color} inline-block mb-6 shadow-lg shadow-black/5`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-neutral-black mb-1 font-display tracking-tight">{stat.value}</div>
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-gray opacity-60 font-display">{stat.label}</div>
                <div className={`flex items-center gap-1 text-xs font-bold ${stat.isUp ? 'text-accent font-black' : 'text-primary'}`}>
                   {stat.change}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main: Active Links & Performance */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 sm:p-10 rounded-[48px] border border-gray-100 shadow-sm">
               <div className="flex items-center justify-between mb-10">
                 <h3 className="text-2xl font-black text-neutral-black tracking-tight font-display">Top Performing Links</h3>
                 <span className="text-xs font-bold text-primary px-3 py-1 bg-primary/5 rounded-lg">LIVE TRACKING</span>
               </div>

               <div className="space-y-6">
                 {topPerformers.map((item) => (
                   <div key={item.id} className="group p-6 rounded-[32px] border border-gray-50 hover:border-primary/20 transition-all flex flex-col sm:flex-row items-center gap-6">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-grow text-center sm:text-left">
                        <h4 className="font-bold text-neutral-black mb-1">{item.name}</h4>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-bold text-neutral-gray">
                          <span className="flex items-center gap-1"><MousePointerClick size={14} className="text-secondary" /> {item.clicks} Clicks</span>
                          <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-accent" /> {item.sales} Sales</span>
                          <span className="text-primary">Earning: {item.commission}/sale</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleCopyLink('rahul_s')}
                          className="p-4 rounded-2xl bg-gray-50 text-neutral-gray hover:bg-primary hover:text-white transition-all shadow-sm"
                          title="Copy Link"
                        >
                          <Copy size={20} />
                        </button>
                        <button className="p-4 rounded-2xl bg-gray-50 text-neutral-gray hover:bg-neutral-black hover:text-white transition-all shadow-sm">
                          <ExternalLink size={20} />
                        </button>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Sidebar: Goal Tracking */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-neutral-black p-10 rounded-[48px] text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary blur-[60px] opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
               <div className="relative z-10">
                 <h3 className="text-2xl font-black mb-2 font-display">Target: ₹50,000</h3>
                 <p className="text-white/50 text-xs mb-8 font-bold uppercase tracking-widest">Monthly Earnings Goal</p>
                 
                 <div className="space-y-6 mb-10">
                    <div className="space-y-3">
                       <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-white/70">Progress (86%)</span>
                          <span className="font-black text-primary">₹43,000</span>
                       </div>
                       <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: '86%' }}></div>
                       </div>
                    </div>
                 </div>

                 <p className="text-white/60 text-xs leading-relaxed mb-8">
                   You are just <strong>₹7,000</strong> away from hititing your monthly goal. Promote more <span className="text-white italic">Wireless Headphones</span> to reach it!
                 </p>

                 <button className="w-full py-4 rounded-[20px] bg-white text-neutral-black font-black flex items-center justify-center gap-2 hover:bg-neutral-light transition-all shadow-xl active:scale-95">
                   Find Top Earners
                   <TrendingUp size={18} className="text-primary" />
                 </button>
               </div>
            </div>

            <div className="bg-primary p-1 rounded-[48px] border border-gray-100 shadow-sm">
              <div className="bg-white p-10 rounded-[44px] h-full">
                <h4 className="font-black text-neutral-black mb-6 flex items-center gap-2 font-display uppercase tracking-widest text-xs">
                  <LinkIcon size={18} className="text-primary" />
                  Smart Analytics
                </h4>
                <div className="space-y-4">
                   <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                     <span className="text-xs font-bold text-neutral-gray">EPC (Earn per click)</span>
                     <span className="font-black text-neutral-black text-lg font-display tracking-tight">₹5.24</span>
                   </div>
                   <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                     <span className="text-xs font-bold text-neutral-gray">Avg Commission</span>
                     <span className="font-black text-neutral-black text-lg font-display tracking-tight">14.2%</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
