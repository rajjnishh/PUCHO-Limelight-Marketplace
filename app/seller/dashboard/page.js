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
  LayoutDashboard,
  Calendar,
  Layers,
  Award
} from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';

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

const salesTrendData = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 5000 },
  { name: 'Thu', sales: 4500 },
  { name: 'Fri', sales: 6000 },
  { name: 'Sat', sales: 8000 },
  { name: 'Sun', sales: 7500 },
];

const influencerCollabData = [
  { name: 'Komal Pandey', value: 45, color: '#FF3366' },
  { name: 'MKBHD', value: 25, color: '#33CC99' },
  { name: 'Sid Batra', value: 20, color: '#FF9900' },
  { name: 'Others', value: 10, color: '#999999' },
];

const topPerformers = [
  { name: 'Headphones', value: 45000, fill: '#FF3366' },
  { name: 'Minimal Tee', value: 38000, fill: '#33CC99' },
  { name: 'Skincare Set', value: 32000, fill: '#FF9900' },
  { name: 'Yoga Mat', value: 28000, fill: '#6666FF' },
];

export default function SellerDashboard() {
  return (
    <DashboardLayout type="seller">
      <div className="max-w-6xl mx-auto pb-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-neutral-black tracking-tight font-display">Dashboard</h1>
            <p className="text-neutral-gray font-medium">Detailed overview of your sales performance.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-neutral-gray hover:text-neutral-black hover:border-gray-200 transition-all">
              <Calendar size={18} />
              Last 30 Days
            </button>
            <Link href="/seller/products" className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all">
              <Plus size={20} />
              Add Product
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {mockSellersStats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm group hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all"
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

        {/* Main Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Sales Trend Chart */}
          <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <TrendingUp size={20} />
                </div>
                <h3 className="text-xl font-bold text-neutral-black">Sales Trend</h3>
              </div>
              <select className="bg-neutral-light border-none rounded-xl px-4 py-2 text-xs font-bold font-sans outline-none cursor-pointer">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesTrendData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF3366" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#FF3366" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fontWeight: 600, fill: '#999999' }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fontWeight: 600, fill: '#999999' }}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontWeight: 700 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#FF3366" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorSales)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Influencer Breakdown */}
          <div className="lg:col-span-1 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                <Users size={20} />
              </div>
              <h3 className="text-xl font-bold text-neutral-black">Collaboration Impact</h3>
            </div>
            
            <div className="h-[250px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={influencerCollabData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {influencerCollabData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-2xl font-black text-neutral-black">85%</div>
                <div className="text-[10px] font-bold text-neutral-gray uppercase tracking-widest leading-none">Collab Share</div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {influencerCollabData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-bold text-neutral-black">{item.name}</span>
                  </div>
                  <span className="text-sm font-black text-neutral-gray">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Detailed Performance Table */}
          <div className="lg:col-span-2 bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <Layers size={20} />
                </div>
                <h3 className="text-xl font-bold text-neutral-black">Top Products</h3>
              </div>
              <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
                <Filter size={18} className="text-neutral-gray" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-[10px] font-bold uppercase tracking-widest text-neutral-gray bg-gray-50/50">
                    <th className="px-8 py-5">Product Details</th>
                    <th className="px-6 py-5">Status</th>
                    <th className="px-6 py-5 text-right">Unit Sales</th>
                    <th className="px-6 py-5 text-right">Revenue</th>
                    <th className="px-8 py-5 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentProducts.map((product) => (
                    <tr key={product.id} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-gray-100 bg-gray-50 shadow-sm">
                            <Image src={product.image} alt={product.name} fill className="object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <div className="font-bold text-neutral-black">{product.name}</div>
                            <div className="text-[10px] font-medium text-neutral-gray">ID: PRD-{product.id}00X</div>
                          </div>
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

          {/* Top Categories / Small Stats Bar Chart */}
          <div className="lg:col-span-1 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-neutral-black/10 flex items-center justify-center text-neutral-black">
                <Award size={20} />
              </div>
              <h3 className="text-xl font-bold text-neutral-black">Top Categories</h3>
            </div>
            
            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topPerformers} layout="vertical" margin={{ left: -20, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F0F0F0" />
                  <XAxis type="number" hide />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#000' }}
                  />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', shadow: '0 4px 20px rgba(0,0,0,0.05)' }} />
                  <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-8 p-6 bg-secondary/5 rounded-3xl border border-secondary/10">
              <div className="flex items-center gap-3 mb-2">
                <ShoppingBag size={16} className="text-secondary" />
                <h4 className="font-bold text-secondary">Inventory Alert</h4>
              </div>
              <p className="text-xs text-neutral-gray leading-relaxed">
                <span className="font-bold text-neutral-black">Yoga Mat Pro</span> is running low on stock. Restock soon to maintain your sales ranking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

