'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { TrendingUp, Users, ShoppingBag, IndianRupee } from 'lucide-react';

const analyticsData = [
  { name: 'Jan', sales: 4000, reach: 2400 },
  { name: 'Feb', sales: 3000, reach: 1398 },
  { name: 'Mar', sales: 2000, reach: 9800 },
  { name: 'Apr', sales: 2780, reach: 3908 },
  { name: 'May', sales: 1890, reach: 4800 },
  { name: 'Jun', sales: 2390, reach: 3800 },
];

export default function SellerAnalytics() {
  return (
    <DashboardLayout type="seller">
      <div className="max-w-6xl mx-auto pb-20">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-neutral-black tracking-tight font-display">Sales Analytics</h1>
          <p className="text-neutral-gray font-medium">Deep dive into your performance metrics.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold mb-8 text-neutral-black">Monthly Sales Volume</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="sales" fill="#FF3366" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold mb-8 text-neutral-black">Influencer Reach Trend</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                  <Line type="monotone" dataKey="reach" stroke="#33CC99" strokeWidth={4} dot={{ r: 6, fill: '#33CC99', strokeWidth: 3, stroke: '#fff' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
