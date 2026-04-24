'use client';

import React, { useState } from 'react';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  Link as LinkIcon, 
  ExternalLink, 
  Copy, 
  TrendingUp, 
  MousePointerClick, 
  CheckCircle2,
  Trash2,
  Search,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const mockLinks = [
  {
    id: 1,
    productName: 'Premium Wireless Headphones',
    category: 'Tech',
    image: 'https://picsum.photos/seed/tech1/200/200',
    clicks: 1240,
    conversions: 42,
    earnings: '₹20,958',
    url: 'limelight.com/p/headphones?ref=rahul_s',
    createdAt: '2 days ago'
  },
  {
    id: 2,
    productName: 'Skincare Duo Set',
    category: 'Beauty',
    image: 'https://picsum.photos/seed/beauty4/200/200',
    clicks: 890,
    conversions: 28,
    earnings: '₹6,972',
    url: 'limelight.com/p/skincare?ref=rahul_s',
    createdAt: '1 week ago'
  },
  {
    id: 3,
    productName: 'Cotton Minimal Tee',
    category: 'Fashion',
    image: 'https://picsum.photos/seed/fashion2/200/200',
    clicks: 450,
    conversions: 15,
    earnings: '₹2,250',
    url: 'limelight.com/p/tee?ref=rahul_s',
    createdAt: '3 days ago'
  }
];

export default function InfluencerLinks() {
  const [searchQuery, setSearchQuery] = useState('');

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(`https://${url}`);
    alert('Link copied to clipboard!');
  };

  return (
    <DashboardLayout type="influencer">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
          <div>
            <h1 className="text-3xl font-black text-neutral-black tracking-tight font-display">Affiliate Links</h1>
            <p className="text-neutral-gray font-medium">Track performance for each shared product link.</p>
          </div>
          <Link href="/influencer/marketplace" className="flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all">
            <Plus size={20} />
            Generate New Link
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-grow flex items-center gap-4 bg-white px-6 py-4 rounded-3xl border border-gray-100 shadow-sm text-neutral-black">
            <Search size={20} className="text-neutral-gray" />
            <input 
              type="text" 
              placeholder="Search by product name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none w-full font-bold text-neutral-black"
            />
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockLinks.filter(l => l.productName.toLowerCase().includes(searchQuery.toLowerCase())).map((link) => (
            <div key={link.id} className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 group hover:border-primary/20 transition-all">
              <div className="flex items-center gap-4 mb-8">
                 <div className="relative w-16 h-16 rounded-[24px] overflow-hidden border border-gray-100 shrink-0">
                   <Image src={link.image} alt={link.productName} fill className="object-cover" />
                 </div>
                 <div className="flex-grow">
                   <div className="text-[10px] font-black tracking-wider text-secondary uppercase mb-0.5">{link.category}</div>
                   <h3 className="font-bold text-neutral-black leading-tight group-hover:text-primary transition-colors">{link.productName}</h3>
                 </div>
                 <button className="p-3 rounded-2xl bg-gray-50 text-neutral-gray hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100">
                    <Trash2 size={18} />
                 </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8 text-center p-5 rounded-3xl bg-neutral-light border border-gray-50">
                 <div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-neutral-gray mb-1">Clicks</div>
                   <div className="text-lg font-black text-neutral-black">{link.clicks.toLocaleString()}</div>
                 </div>
                 <div className="border-x border-gray-200">
                   <div className="text-[10px] font-black uppercase tracking-widest text-neutral-gray mb-1">Sales</div>
                   <div className="text-lg font-black text-neutral-black">{link.conversions}</div>
                 </div>
                 <div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-neutral-gray mb-1">Earned</div>
                   <div className="text-lg font-black text-primary">{link.earnings}</div>
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <LinkIcon size={16} className="text-neutral-gray shrink-0" />
                      <span className="text-xs font-mono font-medium truncate text-neutral-gray">{link.url}</span>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(link.url)}
                      className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors shrink-0"
                    >
                      <Copy size={16} />
                    </button>
                 </div>
                 
                 <div className="flex items-center gap-2">
                    <Link 
                      href={`/products/${link.productName.toLowerCase().replace(/ /g, '-')}`} 
                      className="flex-grow py-4 rounded-2xl bg-neutral-black text-white font-bold text-center text-sm hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                    >
                      View Product
                      <ExternalLink size={16} />
                    </Link>
                    <button className="p-4 rounded-2xl bg-accent/10 text-accent hover:bg-accent/20 transition-all" title="View Detailed Analytics">
                      <TrendingUp size={20} />
                    </button>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
