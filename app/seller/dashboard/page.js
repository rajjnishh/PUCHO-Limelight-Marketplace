'use client';

import React from 'react';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  MoreVertical,
  Filter,
  LayoutDashboard
} from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

const mockSellersStats = [
  { label: 'Total Sales', value: '₹12,45,000', change: '+12.5%', isUp: true, icon: <IndianRupee className="text-white" />, color: 'bg-primary' },
  { label: 'Influencer Payout', value: '₹1,86,750', change: '15% Avg', isUp: true, icon: <Users className="text-white" />, color: 'bg-secondary' },
  { label: 'Platform Fee', value: '₹62,250', change: '5% Fixed', isUp: true, icon: <LayoutDashboard className="text-white" />, color: 'bg-neutral-black' },
  { label: 'Net Revenue', value: '₹9,96,000', change: '+10.2%', isUp: true, icon: <TrendingUp className="text-white" />, color: 'bg-accent' },
];

const recentProducts = [
  { id: 1, name: 'Premium Wireless Headphones', price: 4999, sales: 124, revenue: '₹6.2L', status: 'Active', image: 'https://picsum.photos/seed/tech1/200/200' },
  { id: 2, name: 'Cotton Minimal Tee', price: 999, sales: 542, revenue: '₹5.4L', status: 'Active', image: 'https://picsum.photos/seed/fashion2/200/200' },
  { id: 3, name: 'Yoga Mat Pro', price: 1599, sales: 89, revenue: '₹1.4L', status: 'Out of Stock', image: 'https://picsum.photos/seed/sports3/200/200' },
  { id: 4, name: 'Skincare Duo Set', price: 2499, sales: 215, revenue: '₹5.3L', status: 'Active', image: 'https://picsum.photos/seed/beauty4/200/200' },
];

export default function SellerDashboard() {
  return (
    <DashboardLayout type="seller">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-neutral-black tracking-tight font-display">Dashboard</h1>
            <p className="text-neutral-gray font-medium">Detailed overview of your sales performance.</p>
          </div>
          <Link href="/seller/products" className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all">
            <Plus size={20} />
            Add New Product
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {mockSellersStats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.color} shadow-lg shadow-black/5`}>{React.cloneElement(stat.icon, { size: 20 })}</div>
                <div className={`flex items-center gap-1 text-xs font-bold ${stat.isUp ? 'text-accent' : 'text-red-500'}`}>
                  {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-black text-neutral-black mb-1">{stat.value}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-neutral-gray opacity-50">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main: Product Performance */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                <h3 className="text-xl font-bold text-neutral-black">Product Performance</h3>
                <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
                  <Filter size={18} className="text-neutral-gray" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-[10px] font-bold uppercase tracking-widest text-neutral-gray bg-gray-50/50">
                      <th className="px-8 py-5">Product</th>
                      <th className="px-6 py-5">Status</th>
                      <th className="px-6 py-5 text-right">Sales</th>
                      <th className="px-6 py-5 text-right">Revenue</th>
                      <th className="px-8 py-5 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recentProducts.map((product) => (
                      <tr key={product.id} className="group hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-gray-100 bg-gray-50">
                              <Image src={product.image} alt={product.name} fill className="object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <span className="font-bold text-neutral-black">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`
                            px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider
                            ${product.status === 'Active' ? 'bg-accent/10 text-accent' : 'bg-red-50 text-red-500'}
                          `}>
                            {product.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right font-bold text-neutral-black">{product.sales}</td>
                        <td className="px-6 py-5 text-right font-bold text-neutral-black">{product.revenue}</td>
                        <td className="px-8 py-5 text-right">
                          <button className="p-2 hover:bg-white rounded-lg text-neutral-gray hover:text-neutral-black transition-all">
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar: Analytics Mockup */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden">
               <h3 className="text-xl font-bold text-neutral-black mb-8">Sales by Channel</h3>
               
               <div className="space-y-6">
                 {[
                   { label: 'Instagram Influencers', value: '64%', color: 'bg-primary' },
                   { label: 'Direct Marketplace', value: '22%', color: 'bg-secondary' },
                   { label: 'Partner Brands', value: '14%', color: 'bg-accent' },
                 ].map((channel, idx) => (
                   <div key={idx} className="space-y-2">
                     <div className="flex justify-between items-center text-sm">
                       <span className="font-bold text-neutral-black">{channel.label}</span>
                       <span className="font-black text-primary">{channel.value}</span>
                     </div>
                     <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                       <div className={`h-full ${channel.color}`} style={{ width: channel.value }}></div>
                     </div>
                   </div>
                 ))}
               </div>

               <div className="mt-12 p-6 bg-primary/5 rounded-3xl border border-primary/10">
                 <h4 className="font-bold text-primary mb-2">Earning Potential</h4>
                 <p className="text-xs text-neutral-gray leading-relaxed mb-4">
                   Recruit more influencers to boost your conversion rate by an estimated 15% this month.
                 </p>
                 <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline">
                   View Influencer List →
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
